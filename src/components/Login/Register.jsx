import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; // Import CSS file
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        avatar_user: 'https://png.pngtree.com/png-clipart/20210310/original/pngtree-flat-default-avatar-png-image_5927630.jpg',
        fullname: '',
        password: '',
        retype_password: '',
        phone_number: '',
        role_id: 1
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const { avatar_user, fullname, password, retype_password, phone_number, role_id } = formData;

        if ( !fullname || !password || !retype_password || !phone_number) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== retype_password) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/v1/api/users/register', formData);
            console.log('Registration successful!', response.data);
           
            history.push('/login'); 
        } catch (error) {
            console.error('Registration failed!', error);
            setError('Failed to register. Please try again later.');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="register-form-container">
            <form className="custom-register-form" onSubmit={handleSubmit}>
                <h2 className="custom-form-title">Register</h2>
           
                <div className="custom-form-group">
                    <label className="custom-label" htmlFor="fullname">Fullname</label>
                    <input
                        className="custom-input"
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your fullname"
                        required
                    />
                    <div className="custom-icon">
                        <AiOutlineUser size={20} />
                    </div>
                </div>
                <div className="custom-form-group">
                    <label className="custom-label" htmlFor="password">Password</label>
                    <input
                        className="custom-input"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    <div className="custom-icon">
                        <AiOutlineLock size={20} />
                    </div>
                </div>
                <div className="custom-form-group">
                    <label className="custom-label" htmlFor="retype_password">Retype Password</label>
                    <input
                        className="custom-input"
                        type="password"
                        id="retype_password"
                        name="retype_password"
                        value={formData.retype_password}
                        onChange={handleChange}
                        placeholder="Retype your password"
                        required
                    />
                    <div className="custom-icon">
                        <AiOutlineLock size={20} />
                    </div>
                </div>
                <div className="custom-form-group">
                    <label className="custom-label" htmlFor="phone_number">Phone Number</label>
                    <input
                        className="custom-input"
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />
                    <div className="custom-icon">
                        <AiOutlineUser size={20} />
                    </div>
                </div>
                {error && <p className="custom-error">{error}</p>}
                <button className="custom-submit-button" type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
