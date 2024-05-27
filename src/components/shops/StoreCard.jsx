import React, { useState } from "react";
import { Link, useHistory  } from "react-router-dom";

const StoreCard = ({ shopItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const history = useHistory();

  const increment = () => {
    setCount(count + 1)
  }
  const handleProductClick = (id) => {
    // history.push(`/product/${id}`);
    window.scrollTo(0, 0)
    history.push('/login');
  };

  return (
    <>
      {shopItems.map((shopItems, index) => {
        return (
          <div className='box'>
            <div className='product mtop'>
              <div className='img'>
                <span className='discount'>% Off</span>
                <div className='product-like'>
                  <label>{count}</label> <br />
                  <i className='fa-regular fa-heart' onClick={increment}></i>
                </div>
                <img src={shopItems.thumbnail} alt=''/> 
              </div>
              <div key={shopItems.productId} className='product-details' onClick={() => handleProductClick(shopItems.productId)} style={{ cursor: 'pointer' }} >
                <h3>{shopItems.name}</h3>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                </div>
                <div className='price'>
                  <h4>${shopItems.price}.00 </h4>
              
                  <button onClick={(event) => addToCart(event,shopItems)}>
                    <i className='fa fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default StoreCard
