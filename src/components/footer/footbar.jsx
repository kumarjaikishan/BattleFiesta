import React from 'react';
import './footbar.css';
import logo from '../../assets/logopng250.webp'
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
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
                    <p>Tournament Management services for Esport.</p>
                    <section>
                        <h3>Follow Us</h3>
                        <a target="_blank" href="https://www.instagram.com/battlefiesta"><FaInstagram /></a>
                        <a target="_blank" href="https://www.youtube.com/@Battle_Fiesta"><FaYoutube /></a>
                    </section>
                </section>
                <section className="section2">
                    <h3>Information</h3>
                    <ul>
                        <a className="navlink" target="_blank" href="https://www.youtube.com/watch?v=a4zVxjXq8Ic">Watch Tutorial</a>
                        <NavLink className="navlink" to='/about'><li>About Us</li></NavLink>
                        <NavLink className="navlink" to='/privacy'><li>Privacy Policy</li></NavLink>
                        <NavLink className="navlink" to='/terms'><li>Terms and Conditions</li></NavLink>
                        <NavLink className="navlink" to='/refund'><li>Refund and Cancellations</li></NavLink>
                        <NavLink className="navlink" to='/plan'><li>Plan and Pricing</li></NavLink>
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
                <section className="section3">
                    <h3>Reach Us</h3>
                    <p>battlefiesta07@gmail.com</p>
                </section>
            </footer>
        </>
    );
};

export default Footbar;
