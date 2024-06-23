
import React from 'react';
import "./product.css";

const RelatedProducts = () => {
  const products = [
    { imgSrc: "http://localhost:3000/images/product/product-1.png", category: "adidas", name: "Cartoon Astronaut T-Shirts", rating: 4.7, price: "$78" },
    { imgSrc: "http://localhost:3000/images/product/product-1.png", category: "adidas", name: "Cartoon Astronaut T-Shirts", rating: 4.7, price: "$78" },
    { imgSrc: "http://localhost:3000/images/product/product-1.png", category: "adidas", name: "Cartoon Astronaut T-Shirts", rating: 4.7, price: "$78" },
    { imgSrc: "http://localhost:3000/images/product/product-1.png", category: "adidas", name: "Cartoon Astronaut T-Shirts", rating: 4.7, price: "$78" }
  ];

  return (
    <section id="product1" className="section-p1">
      <h2>Featured Products</h2>
      <p>Summer Collection New Modern Design</p>
      <div className="pro-container">
        {products.map((product, index) => (
          <div className="pro" key={index}>
            <img src={product.imgSrc} alt="" />
            <div className="des">
              <span>{product.category}</span>
              <h5>{product.name}</h5>
              <div className="star">
                {Array(Math.floor(product.rating)).fill().map((_, i) => (
                  <i className="fas fa-star" key={i}></i>
                ))}
                {product.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
              </div>
              <h4>{product.price}</h4>
            </div>
            <a href="#"><i className="fal fa-shopping-cart"></i></a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
