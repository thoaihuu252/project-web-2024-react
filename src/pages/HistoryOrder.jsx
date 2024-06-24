// HistoryOrderScreen.js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './history.css';

const HistoryOrder = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDetailClick = (orderId) => {
    history.push(`/order/${orderId}`);
  };


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/login');
      return;
    }

    // Gọi API để lấy thông tin người dùng và lấy ID
    fetch('http://localhost:8080/v1/api/users/details', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const userId = data.id;

      // Gọi API để lấy lịch sử đơn hàng của người dùng theo ID
      fetch(`http://localhost:8080/v1/api/orders/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(orderData => {
        setOrders(Array.isArray(orderData) ? orderData : [orderData]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching order history:', error);
        setLoading(false);
      });
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
      setLoading(false);
    });
  }, [history]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="history-order-container">
      <h2>Order History</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4">No orders found</td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>${order.totalMoney.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <button 
                    className="detail-button"
                    onClick={() => handleDetailClick(order.id)}
                  >
                    Detail Order
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryOrder;
