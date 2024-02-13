import React from 'react';
import './footbar.css';
import logo from '../../assets/home/logo.webp'
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { NavLink } from 'react-router-dom';

const Footbar = () => {

    return (
        <>
            <footer className='footer'>
                <section className="section1">
                    <div className="img">
                        <img src={logo} alt="" />
                    </div>
                    <h3>
                        BattleFiesta
                    </h3>
                    <p>Tournament management services for esport</p>
                    <h3>Follow Us</h3>
                    <span><InstagramIcon /></span>
                    <span><YouTubeIcon /></span>
                </section>
                <section className="section2">
                    <h3>Information</h3>
                    <ul>
                        <a href="">  <li>About</li>  </a>
                        <a href="">  <li>Plan and Pricing</li>  </a>
                        <a href="">  <li>Privacy</li>  </a>
                        <a href="">  <li>Term of use</li> </a>
                    </ul>
                </section>
                <section className="section3">
                    <h3>Quick Links</h3>
                    <ul>
                        <NavLink className="navlink" to='/dashboard'><li>Dashboard</li></NavLink>
                        <NavLink className="navlink" to='/tournaments'><li>Find Tournament</li></NavLink>
                        <NavLink className="navlink" to='/contact'><li>Contact</li></NavLink>
                        <a href="#">    <li>FAQ</li>   </a>
                    </ul>
                </section>
                <section className="section3">
                    <h3>Reach Us</h3>
                    <p>battlefiesta07@gmail.com</p>
                    <p>7845148758</p>
                </section>
            </footer>
        </>
    );
};

export default Footbar;
