import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import "./Waiting.css";
import axios from 'axios';

const WaitingScreen = () => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const vnpOrderInfo = params.get('vnpOrderInfo');
  const vnpAmount = params.get("vnpAmount");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/login');
      return;
    }

    fetch('http://localhost:8080/v1/api/users/details', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Lưu thông tin người dùng vào state
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        // Xử lý lỗi nếu cần
      });
  }, [history]);

  useEffect(() => {
    const checkPaymentResult = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:8080/v1/api/payment/check-result?name=${vnpOrderInfo}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = response.data;
        if (data.code === 200) {
          if (data.data.message === 'Success') {
            if (user) { // Chỉ tiếp tục nếu user đã được load
              const orderData = {
                user_id: user.id,
                fullname: user.fullname,
                phone_number: '1234567890',
                total_money: vnpAmount,
                payment_method: 'VN PAY'
              };
              const orderResponse = await axios.post('http://localhost:8080/v1/api/orders', orderData, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              console.log('Order created successfully:', orderResponse.data);
              history.push('/success');
            }
          } else if (data.data.message === 'Failed') {
            history.push('/failure');
          }
        }
      } catch (error) {
        console.error('Error checking payment result:', error);
        // Xử lý lỗi nếu cần
      }
    };

    if (user) { // Chỉ bắt đầu check payment result nếu user đã được load
      const interval = setInterval(checkPaymentResult, 3000); // Check every 3 seconds
      return () => clearInterval(interval);
    }
  }, [vnpOrderInfo, vnpAmount, user, history]);

  return (
    <div className="waiting-screen">
      <h2>Please wait while we process your payment...</h2>
      {vnpOrderInfo && <p>Order Info: {vnpOrderInfo}</p>}
      <div className="loading-container">
        <img src="./images/gif/hourglass.gif" alt="Loading" className="loading-gif" />
      </div>
    </div>
  );
};

export default WaitingScreen;
