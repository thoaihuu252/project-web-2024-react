import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./profile.css"

const ProfileScreen = () => {
  const history = useHistory();
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


  const handleEditProfile = () => {
    history.push('/edit-profile');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="avatar">
        {user.avatar_user ? (
          <img src={user.avatar_user} alt="Avatar" />
        ) : (
          <div className="default-avatar">No Avatar</div>
        )}
      </div>
      <div className="profile-details">
        <p><strong>Full Name:</strong> {user.fullname}</p>
        <p><strong>Phone Number:</strong> {user.phone_number}</p>
        <p><strong>Role:</strong> {user.role.name}</p>
    
      </div>
      <div className="button-container">
        <button onClick={handleEditProfile}>Edit Profile</button>
   
      </div>
    </div>
  );
};

export default ProfileScreen;
