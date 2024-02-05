import React from 'react'
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setnarrow } from '../../store/login';
import GrassIcon from '@mui/icons-material/Grass';
import logo from '../../assets/home/logo.webp'

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
              <NavLink className="navlink" to='/' >
              <img src={logo} alt="" /> <h2>BattleFiesta</h2>
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