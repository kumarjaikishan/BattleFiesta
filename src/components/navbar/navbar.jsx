import React from 'react'
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setnarrow } from '../../store/login';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { setcreatenewmodal } from '../../store/api';
import Button from '@mui/material/Button';
import GrassIcon from '@mui/icons-material/Grass';

const Navbar = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);
  const fun = () => {
    if (log.narrow) {
      dispatch(setnarrow(false))
    } else {
      dispatch(setnarrow(true))
    }
  }

  return (
    <>
      <div className={log.narrow ? "nav narrow" : "nav"}>
        <div className='nav'>
          <header>
            <div className="logo">
              <GrassIcon className="company" />
              <NavLink className="navlink" to='/' > <h2>BattleFiesta</h2>
              </NavLink>
            </div>
            <nav>
              <ul>
                <NavLink className="navlink" to='/dashboard'><li>Dashboard</li></NavLink>
                <NavLink className="navlink" to='/tournaments'><li>Find Tournament</li></NavLink>
              </ul>
            </nav>
          </header>
        </div>
      </div>
    </>
  )
}

export default Navbar;