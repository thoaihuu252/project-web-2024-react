import React, { useState, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper"
import ShopStore from "../components/shops/ShopStore";

const Pages = ({addToCart}) => {
    const [shopItems, setshopItems] = useState([]);

    useEffect(() => {
        //lấy dữ liệu sản phẩm
        fetch('http://localhost:8080/v1/api/products?page=0&limit=20')
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data.products)) {
                setshopItems(data.products);
            } else {
              console.error('Error: Product data is not an array');
            }
          })
          .catch(error => console.error('Error fetching products:', error));
});

  return (
    <>
      <ShopStore  addToCart={addToCart} shopItems={shopItems} />
      <Wrapper />
    </>
  )
}

export default Pages
