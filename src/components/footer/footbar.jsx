import React from 'react';
import './footbar.css';
import logo from '../../assets/logowebp_250.webp'
import { FaInstagram,FaYoutube } from "react-icons/fa";
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
                    <p>Esports Tournament Management Service</p>
                    <section>
                        <h3>Follow Us</h3>
                        <a target="_blank" title='BattleFiesta Instagram' href="https://www.instagram.com/battlefiesta"><FaInstagram /></a>
                        <a target="_blank" title='Battlefiesta Youtube channel' href="https://www.youtube.com/@Battle_Fiesta"><FaYoutube /></a>
                    </section>
                </section>
                <section className="section2">
                    <h3>Information</h3>
                    <ul>
                        <a className="navlink" target="_blank" href="https://www.youtube.com/watch?v=z5JE3HUX0qk"><li> Watch Tutorial</li></a>
                        <NavLink className="navlink" to='/about'><li>About Us</li></NavLink>
                        <NavLink className="navlink" to='/privacy'><li>Privacy Policy</li></NavLink>
                        <NavLink className="navlink" to='/terms'><li>Terms and Conditions</li></NavLink>
                        <NavLink className="navlink" to='/refund'><li>Refund and Cancellations</li></NavLink>
                        <NavLink className="navlink" to='/subscription'><li>Plan and Pricing</li></NavLink>
                    </ul>
                </section>
                <section className="section3">
                    <h3>Quick Links</h3>
                    <ul>
                        <NavLink className="navlink" to='/dashboard'><li>Dashboard</li></NavLink>
                        <NavLink className="navlink" to='/tournaments'><li>Find Tournament</li></NavLink>
                        <NavLink className="navlink" to='/contact'><li>Contact Us</li></NavLink>
                        <NavLink className="navlink" to='/faq'><li>FAQ</li></NavLink>
                    </ul>
                </section>
                <address className="section3">
                    <h3>Reach Us</h3>
                    {/* <p>contact@battlefiesta.in</p> */}
                     <a href="mailto:contact@battlefiesta.in" title='click here to send mail' target="_blank" >contact@battlefiesta.in</a>                                
                </address>
            </footer>
        </>
    );
};

export default Footbar;
