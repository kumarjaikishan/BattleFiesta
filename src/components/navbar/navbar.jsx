import React from 'react'
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setnarrow } from '../../store/login';
import logo from '../../assets/home/logo.webp'
import { setcreatenewmodal } from '../../store/api';

const Navbar = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);
  const hjjj = ()=>{
    
  }
  const fun = () => {
    if (log.narrow) {
      dispatch(setnarrow(false))
    } else {
      dispatch(setnarrow(true))
    }
  }

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
                <NavLink className="navlink" to='/tournaments'><li>Find Tournament</li></NavLink>
                <button onClick={()=> dispatch(setcreatenewmodal(true))}>Create Tournament</button>
              </ul>
            </nav>
          </header>
        </div>
    </>
  )
}

export default Navbar;