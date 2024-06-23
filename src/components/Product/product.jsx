import React from 'react';
import RelatedProducts from './RelatedProducts';
import ProductDetails from './ProductDetails';
import './product.css';

const Product = ({ product }) => {
  return (
    <>
      <section id="page-header" className="about-header">
        <h2>#StayHome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>
      <ProductDetails product={product} />
      <RelatedProducts />
    </>
  );
}

export default Product;