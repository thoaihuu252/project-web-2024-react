import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Search.css";
import logo from "../../components/assets/images/logo.svg"; 

const Search = ({ CartItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const search = document.querySelector('.search');
      if (search) {
        search.classList.toggle('active', window.scrollY > 100);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(`http://localhost:8080/v1/api/products/search?page=0&limit=5&name=${query}`);
        setSuggestions(response.data.products);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src={logo} alt='Logo' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input
              type='text'
              placeholder='Search and hit enter...'
              value={searchTerm}
              onChange={handleInputChange}
            />
            <span>All Category</span>
            {suggestions.length > 0 && (
              <div className='suggestions'>
                {suggestions.map((product) => (
                  <Link to={`/product/${product.productId}`} key={product.productId} className='suggestion-item'>
                    <img src={product.thumbnail} alt={product.name} />
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className='icon f_flex width'>
            <Link to='/profile'>
              <i className='fa fa-user icon-circle'></i>
            </Link>

            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? '' : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
