import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route ,MemoryRouter  } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Register from "./components/Login/Register";
import LoginForm from "./components/Login/login";
import Stores from "./pages/Store"
import Profile from "./pages/Profile"
import History from "./pages/HistoryOrder"
import Product from "./pages/DProduct";
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Waiting from "./components/Payment/Waiting"
import Failure from "./components/Payment/Failure"
import Success from "./components/Payment/Succes"

function App() {
  const [productItems, setProductItems] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [CartItem, setCartItem] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //lấy dữ liệu sản phẩm
    fetch('http://localhost:8080/v1/api/products?page=0&limit=6')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.products)) {
          setProductItems(data.products);
        } else {
          console.error('Error: Product data is not an array');
        }
      })
      .catch(error => console.error('Error fetching products:', error));

    //lấy dữ liệu cửa hàng
    fetch('http://localhost:8080/v1/api/products?page=0&limit=21')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.products)) {
          setShopItems(data.products);
        } else {
          console.error('Error: Shop items data is not an array');
        }
      })
      .catch(error => console.error('Error fetching shop items:', error));
  }, []);

  const addToCart = (event, product) => {
    event.stopPropagation();
  
    const productExist = CartItem.find((item) => item.productId === product.productId);
  
    if (productExist) {
      setCartItem(
        CartItem.map((item) =>
          item.productId === product.productId
            ? { ...productExist, qty: productExist.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item
        )
      );
    }
  };

  return (
    <Router>
    
      <Header CartItem={CartItem} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route path="/" exact>
          <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/store">
          <Stores addToCart={addToCart} /> 
        </Route>
        <Route path="/product/:id">
          <Product/>
        </Route>
        <Route path="/waiting-screen">
          <Waiting/>
        </Route>
        <Route path="/failure">
          <Failure/>
        </Route>
        <Route path="/success">
          <Success/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/history">
          <History/>
        </Route>
        <Route path="/admin">
            <Dashboard />
          </Route>
          <Route path="/adminProducts">
            <Products/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>

        <Route path="/cart" exact>
          <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
        </Route>
        <Route path="/login" exact>
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>
      <Footer />

    </Router>
  
  );
}

export default App;
