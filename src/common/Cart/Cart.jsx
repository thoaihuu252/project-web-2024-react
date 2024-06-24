import React from "react";
import { useHistory } from 'react-router-dom';
import "./style.css";

const Cart = ({ CartItem, addToCart, decreaseQty }) => {

  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0);
  const history = useHistory();

  const handlePaymentClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      return;
    }

    const bankCode = 'NCB'; 
    const url = `http://localhost:8080/v1/api/payment/vn-pay?amount=${totalPrice}&bankCode=${bankCode}`;


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
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are added in Cart</h1>
            )}

            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.productId}>
                  <div className="img">
                    <img src={item.thumbnail} alt={item.name} />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                       {item.price} VND * {item.qty} 
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart" onClick={() => decreaseQty(item)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button className="incCart" onClick={() => addToCart(item)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button className="desCart" onClick={() => decreaseQty(item)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className="d_flex">
              <h4>Total Price :</h4>
              <h3>{totalPrice} VND</h3>
            </div>
            <div>
            <button className="normal" onClick={handlePaymentClick}>Payment</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
