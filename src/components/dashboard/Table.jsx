import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios'; // Import Axios library
import { Button } from '@mui/material';

const Table = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:8080/v1/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = response.data;

        const simplifiedOrders = data.map(order => ({
          id: order.id,
          fullname: order.user.fullName,
          totalMoney: order.totalMoney,
          status: order.status,
          orderDate: new Date(order.orderDate).toLocaleDateString()
        }));

        setOrders(simplifiedOrders);
        setFilteredOrders(simplifiedOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (orderId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:8080/v1/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Xóa order khỏi danh sách sau khi xóa thành công
      setOrders(orders.filter(order => order.id !== orderId));
      setFilteredOrders(filteredOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="table-container">
      <h3>Orders table</h3>
      <div className="navbar">
        <input
          type="text"
          placeholder="Type here..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name User</th>
            <th>Total Money</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.fullname}</td>
              <td>{order.totalMoney} VND</td>
              <td>{order.status}</td>
              <td>{order.orderDate}</td>
              <td> <Button onClick={() => handleDelete(order.id)}>Delete </Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
