import React, { useEffect } from 'react';
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/logopng250.webp';

const Navbar = () => {
  const log = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(log);
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
    })
  };

  return (
    <>
      <div className='nav'>
        <header>
          <div className="logo">
            <NavLink className="navlink" to='/'>
              <img src={logo} alt="" /> <h2>BattleFiesta</h2>
            </NavLink>
          </div>
          <nav>
            <ul>
              {log.islogin && (
                <>
                  <NavLink className="navlink" to='/dashboard'><li>Dashboard</li></NavLink>
                  <NavLink className="navlink" to='/profile'><li>Profile</li></NavLink>
                </>
              )}
              {log.islogin && log.isadmin && (
                <NavLink className="navlink" to='/admin'><li>Admin</li></NavLink>
              )}
              <NavLink className="navlink" to='/tournaments'><li>Find Tournament</li></NavLink>
              {!log.islogin && (
                <NavLink className="navlink" to='/login'><li>Login</li></NavLink>
              )}
              {log.islogin && (
                <a href="/" className="navlink" onClick={handleLogout}>
                  <li>Logout</li>
                </a>
              )}
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
