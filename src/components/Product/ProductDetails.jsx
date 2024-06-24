import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./product.css";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();

  if (!product) {
    return <div>Loading...</div>;
  }

  const smallImages = [
    product.thumbnail,
    product.thumbnail,
    product.thumbnail,
    product.thumbnail,
  ];

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handlePaymentClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      return;
    }
    const amount = product.price * quantity ;
    const bankCode = 'NCB'; 
    const url = `http://localhost:8080/v1/api/payment/vn-pay?amount=${amount}&bankCode=${bankCode}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.code === 200 && data.data && data.data.paymentUrl) {
        const paymentUrl = new URL(data.data.paymentUrl);
        const vnpOrderInfo = paymentUrl.searchParams.get('vnp_OrderInfo');
        const vnpAmount = paymentUrl.searchParams.get("vnp_Amount")

        window.open(data.data.paymentUrl, '_blank');
        history.push(`/waiting-screen?vnpOrderInfo=${vnpOrderInfo}&vnpAmount=${vnpAmount}`);

      } else {
        console.error('Payment API error:', data.message);
      }
    } catch (error) {
      console.error('Error calling payment API:', error);
    }
  };

  return (
    <section id="prodetails" className="section-p1">
      <div className="single-product-image">
        <img src={product.thumbnail} width="100%" id="MainImg" alt={product.name} />
        <div className="small-img-group">
          {smallImages.map((imgSrc, index) => (
            <div className="small-img-col" key={index}>
              <img src={imgSrc} width="100%" alt={`Product ${index}`} className="small-img" />
            </div>
          ))}
        </div>
      </div>
      <div className="single-product-details">
        <h6>{product.category_id}</h6>
        <h4>{product.name}</h4>
        <h2>{product.price} VND</h2>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button className="normal">Add To Cart</button>
        <button className="normal" onClick={handlePaymentClick}>Payment</button>
        <h4>Product Details</h4>
        <span>{product.description}</span>
      </div>
    </section>
  );
}

export default ProductDetails;