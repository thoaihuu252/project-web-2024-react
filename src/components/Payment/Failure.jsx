import React from 'react';
import "./Waiting.css";
const Failure = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Payment Failed</h2>
      <p>The payment process took too long and has timed out. Please try again.</p>
      <div className="loading-container">
        <img src="./images/gif/letter-x.gif" alt="Loading" className="loading-gif" />
      </div>
    </div>
  );
};

export default Failure;
