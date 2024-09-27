import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Errorpage.css';
import { useSelector, useDispatch } from 'react-redux';
import { header } from '../../store/login';
import { Button } from '@mui/material';

export const Errorpage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const log = useSelector((state) => state.login);

    useEffect(() => {
        if (!log.islogin) {
            return navigate('/login');
        }
        dispatch(header("Not Found"))
    }, [])
    return (
        <div className="errore">
            <div className="container">
                <div className="img">
                    <img src="https://res.cloudinary.com/dusxlxlvm/image/upload/v1720767933/accusoft/assets/404_page_1_kjlifa.svg" alt="404 image" />
                </div>
                <p>Sorry, the page you are looking for does not exist. If you believe there's an issue, feel free to report it, and we'll look into it</p>
                <div className="btns">
                    <Button variant='contained' title='Home' onClick={() => navigate('/')}>Go Home</Button>
                    <Button variant='outlined' title='Contact Us' onClick={() => navigate('/contact')}>Report Problem</Button>
                    <Button variant='contained' title='Back' onClick={() => navigate(-1)}> Return Back</Button>
                </div>
            </div>
        </div>
    );
};
