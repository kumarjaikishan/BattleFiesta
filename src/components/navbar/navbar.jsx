import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import logo from '../../assets/logopng250.webp';

const Navbar = () => {
  const log = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [menu, setmenu] = useState(false);
  const navRef = useRef(null); // Reference to the <nav> element

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setmenu(false);
      }
    };

    // Add the event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
   
    // Cleanup the event listener
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    swal({
      title: 'You really want to log out?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        navigate('/logout');
      }
    });
  };

  const closeMenu = () => setmenu(false);

  return (
    <>
      <div className='nav'>
        <header>
          <div className="logo">
            <NavLink className="navlink" to='/' onClick={closeMenu}>
              <img src={logo} alt="" /> <h2>BattleFiesta</h2>
            </NavLink>
          </div>
          <nav  className={menu ? "open" : null}>
            <ul ref={navRef}>
              {log.islogin && (
                <>
                  <NavLink className="navlink" to='/dashboard' onClick={closeMenu}><li>Dashboard</li></NavLink>
                  <NavLink className="navlink" to='/profile' onClick={closeMenu}><li>Profile</li></NavLink>
                </>
              )}
              {log.islogin && log.isadmin && (
                <NavLink className="navlink" to='/admin' onClick={closeMenu}><li>Admin</li></NavLink>
              )}
              <NavLink className="navlink" to='/tournaments' onClick={closeMenu}><li>Find Tournament</li></NavLink>
              {!log.islogin && (
                <NavLink className="navlink" to='/login' onClick={closeMenu}><li>Login</li></NavLink>
              )}
              {log.islogin && (
                <a href="/" className="navlink" onClick={(e) => { handleLogout(e); closeMenu(); }}>
                  <li>Logout</li>
                </a>
              )}
            </ul>
          </nav>
          {menu ? (
            <RxCross2 onClick={() => setmenu(false)} />
          ) : (
            <FiMenu onClick={() => setmenu(true)} />
          )}
        </header>
      </div>
    </>
  );
};

export default Navbar;
