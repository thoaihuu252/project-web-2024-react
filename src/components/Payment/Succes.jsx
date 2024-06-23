import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./Waiting.css";

const Success = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/'); // Chuyển hướng về trang chủ sau 5 giây
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Payment Successful</h2>
      <p>Your payment has been processed successfully. Thank you for your purchase!</p>
      <div className="loading-container">
        <img src="./images/gif/verified.gif" alt="Loading" className="loading-gif" />
      </div>
      <button onClick={() => history.push('/')}>Back to Home</button>
    </div>
  );
};

export default Success;
