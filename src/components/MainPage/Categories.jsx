import React, { useState, useEffect } from "react";
import axios from 'axios';

const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch category data from API
    axios.get('http://localhost:8080/v1/api/categories')
      .then(response => {
        setCategoryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
  }, []);

  return (
    <div className='category'>
      {categoryData.map((category, index) => (
        <div className='box f_flex' key={index}>
          <img src="./images/category/cat2.png" alt='' />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Categories;
