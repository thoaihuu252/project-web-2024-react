import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/dashboard/Sidebar';
import Navbar from '../components/dashboard/Navbar';
import Table from '../components/dashboard/Table';
import './Dashboard.css';

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        history.push('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/v1/api/users/details', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const user = response.data;

        if (user.role.name !== 'ADMIN') {
          history.push('/');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        history.push('/');
      }
    };

    fetchUserDetails();
  }, [history]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
