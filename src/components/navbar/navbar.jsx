import React from 'react'
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setnarrow } from '../../store/login';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { setcreatenewmodal } from '../../store/api';
import Button from '@mui/material/Button';

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
        <div className="cont">
          <span onClick={fun}><MenuIcon /></span>
          <span>{log.head}</span>
        </div>
       {log.head =="Dashboard" && <div className="info">
          <Button sx={{ minWidth: 250 }} title='Create New Tournament' size='large' onClick={() => dispatch(setcreatenewmodal(true))} variant="contained" startIcon={<AddBoxIcon className='plus' />}>
            New Tournament
          </Button>
        </div>}
      </div>
    </>
  )
}

export default Navbar;