import React, { useState,useEffect  } from "react"
import { Link ,useHistory } from "react-router-dom"


const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  // Toogle Menu
  const history = useHistory();
  const [MobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token != null) {
        setIsLoggedIn(true);
        return;
      }
    })

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    history.push('/login');
  };

  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className='catgrories d_flex'>
            <span class='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div>

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/store'>Store</Link>
              </li>
              <li>
                <Link to='/profile'>Account</Link>
              </li>
              <li>
                <Link to='/history'>History Order</Link>
              </li>
              <li>
                <Link to='/contact'>contact</Link>
              </li>
               {isLoggedIn ? (
                  <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Logout
                </li>
              ) : (
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              )}
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
