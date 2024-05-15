import React, { useState, useEffect } from "react";
import axios from 'axios';

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/v1/api/products?page=0&limit=6')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);
  return (
    <>
      <div className='content grid product'>
        {products.map((product, index) => {
          return (
            <div className='box' key={index}>
              <div className='img'>
                <img src={product.thumbnail} alt='' />
              </div>
              <h4>{product.name}</h4>
              <span>${product.price}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Cart
