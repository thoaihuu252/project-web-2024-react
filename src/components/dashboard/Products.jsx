import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';

const Table = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility for adding product
  const [editProductId, setEditProductId] = useState(null); // State to store the product ID being edited
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState(0);
  const [editProductThumbnail, setEditProductThumbnail] = useState('');
  const [editProductDescription, setEditProductDescription] = useState('');
  const [editProductCategoryId, setEditProductCategoryId] = useState(0);

  // Function to fetch products from API
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const page = 0;
    const limit = 10;

    try {
      const response = await axios.get(`http://localhost:8080/v1/api/products?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const { products } = response.data;

      const simplifiedProducts = products.map(product => ({
        id: product.productId,
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
        createdAt: new Date(
          product.created_at[0],
          product.created_at[1] - 1, // JavaScript months are 0-indexed
          product.created_at[2],
          product.created_at[3],
          product.created_at[4],
          product.created_at[5]
        ).toLocaleDateString(), // Format date as needed
      }));

      setProducts(simplifiedProducts);
      setFilteredProducts(simplifiedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleOpenAddDialog = () => {
    setOpenDialog(true);
    setEditProductId(null); // Reset edit product ID when opening add dialog
    setEditProductName('');
    setEditProductPrice(0);
    setEditProductThumbnail('');
    setEditProductDescription('');
    setEditProductCategoryId(0);
  };

  const handleOpenEditDialog = async (productId) => {
    setEditProductId(productId);

    // Fetch product details from API
    const token = localStorage.getItem('token');
    const apiUrl = `http://localhost:8080/v1/api/products/${productId}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const { name, price, thumbnail, description, category_id } = response.data;

      setEditProductName(name);
      setEditProductPrice(price);
      setEditProductThumbnail(thumbnail);
      setEditProductDescription(description);
      setEditProductCategoryId(category_id);

      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Handle error as needed
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    let apiUrl = 'http://localhost:8080/v1/api/products';

    // Determine if it's an add or edit operation
    if (editProductId) {
      apiUrl += `/${editProductId}`;
    }

    try {
      const method = editProductId ? 'put' : 'post';
      const response = await axios[method](apiUrl, {
        name: editProductName,
        price: editProductPrice,
        thumbnail: editProductThumbnail,
        description: editProductDescription,
        category_id: editProductCategoryId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Product saved successfully:', response.data);

      // Refresh product list
      fetchData();

      // Close dialog
      setOpenDialog(false);
      
      // Clear form inputs
      setEditProductId(null);
      setEditProductName('');
      setEditProductPrice(0);
      setEditProductThumbnail('');
      setEditProductDescription('');
      setEditProductCategoryId(0);
    } catch (error) {
      console.error('Error saving product:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="table-container">
      <h3>Products table</h3>
      <div className="navbar">
        <input
          type="text"
          placeholder="Type here..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button onClick={handleOpenAddDialog}>Add Product</button>
      </div>

      {/* Dialog form for adding or editing a product */}
      {openDialog && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editProductId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={editProductName}
                onChange={(e) => setEditProductName(e.target.value)}
                required
              />
              <label>Price:</label>
              <input
                type="number"
                value={editProductPrice}
                onChange={(e) => setEditProductPrice(e.target.value)}
                step="0.01"
                required
              />
              <label>Thumbnail URL:</label>
              <input
                type="text"
                value={editProductThumbnail}
                onChange={(e) => setEditProductThumbnail(e.target.value)}
                required
              />
              <label>Description:</label>
              <textarea
                value={editProductDescription}
                onChange={(e) => setEditProductDescription(e.target.value)}
              />
              <label>Category ID:</label>
              <input
                type="number"
                value={editProductCategoryId}
                onChange={(e) => setEditProductCategoryId(e.target.value)}
                required
              />
              <div>
                <button type="submit">{editProductId ? 'Save Changes' : 'Add Product'}</button>
                <button type="button" onClick={handleCloseDialog}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price} VND</td>
              <td><img src={product.thumbnail} alt="Thumbnail" style={{ width: '50px', height: '50px' }} /></td>
              <td>{product.createdAt}</td>
              <td>
                <button className='editbutton' onClick={() => handleOpenEditDialog(product.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
