import React, { useEffect } from 'react'
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logopng250.webp'

const Navbar = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);
  useEffect(() => {
    //  console.log(log);
  }, [])

  return (
    <>
      <div className='nav'>
        <header>
          <div className="logo">
            <NavLink className="navlink" to='/' >
              <img src={logo} alt="" /> <h2>BattleFiesta</h2>
            </NavLink>
          </div>
          <nav>
            <ul>
              <NavLink className="navlink" to='/dashboard'><li>Dashboard</li></NavLink>
              <NavLink className="navlink" to='/profile'><li>Profile</li></NavLink>
              {log.islogin && log.isadmin && <NavLink className="navlink" to='/admin'><li>Admin</li></NavLink>}
              <NavLink className="navlink" to='/tournaments'><li>Find Tournament</li></NavLink>
              <NavLink className="navlink" to='/logout'><li>Logout</li></NavLink>
            </ul>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Navbar;