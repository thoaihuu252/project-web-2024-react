import React,{ useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import axios from 'axios';

const TopCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/v1/api/products?page=0&limit=9')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <>
      <Slider {...settings}>
        {products.map((product, index) => {
          return (
            <>
              <div className='box product' key={index}>
                <div className='nametop d_flex'>
                  <span className='tleft'>{product.name}</span>
                  <span className='tright'>{product.price}</span>
                </div>
                <div className='img'>
                  <img src={product.thumbnail} style={{width:"310px" ,height:"160px"}} alt='' />
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default TopCart
