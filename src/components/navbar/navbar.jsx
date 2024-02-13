import React, { useEffect } from 'react'
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/home/logo.webp'
import { setcreatenewmodal } from '../../store/api';
import Button from '@mui/material/Button';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Navbar = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);
  useEffect(()=>{
  //  console.log(log);
  },[])

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
              <NavLink className="navlink" to='/tournaments'><li>Find Tournament</li></NavLink>
              <NavLink className="navlink" to='/logout'><li>Logout</li></NavLink>
             {log.islogin && log.head=="Dashboard" && <Button className='btna' onClick={() => dispatch(setcreatenewmodal(true))} title='Create New Tournament' variant="contained" endIcon={<SportsEsportsIcon />}>
                New
              </Button>}
            </ul>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Navbar;