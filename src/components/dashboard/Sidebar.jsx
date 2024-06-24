
import React from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Soft UI Dashboard</h2>
      <ul>
        <li><Link to="/admin"> <img src="./images/arrivals/dashboard.png" style={{ width: '15px', height: '15px',marginRight:"8px" }} />Dashboard</Link></li>
        <li><Link to="/tables"><img src="./images/arrivals/user.png" style={{ width: '15px', height: '15px',marginRight:"8px" }} /> Users</Link></li>
        <li><Link to="/admin"><img src="./images/arrivals/clipboard.png" style={{ width: '15px', height: '15px',marginRight:"8px" }} />Orders</Link></li>
        <li><Link to="/adminProducts"><img src="./images/arrivals/product.png" style={{ width: '15px', height: '15px',marginRight:"8px" }} />Products</Link></li>
        <li><Link to="/profile"><img src="./images/arrivals/dashboard.png" style={{ width: '15px', height: '15px',marginRight:"8px" }} />Profile</Link></li>
      </ul>
      <div className="sidebar-footer">
        <button></button>
        <button></button>
      </div>
    </div>
  );
};

export default Sidebar;
