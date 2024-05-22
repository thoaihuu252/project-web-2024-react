import axios from 'axios';

export const login = async (phone_number, password) => {
  try {
    const response = await axios.post('http://localhost:8080/v1/api/users/login', {
      phone_number,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const token = response.data.token;
    return token;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};
export default login;
