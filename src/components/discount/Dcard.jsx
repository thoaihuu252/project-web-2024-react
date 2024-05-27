import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from 'axios';
import './Dcard.css'; 

const Dcard = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/v1/api/products?page=0&limit=9')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className="Dcard">
      
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
              <img src={product.thumbnail} alt={product.name}/>         
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Dcard;
