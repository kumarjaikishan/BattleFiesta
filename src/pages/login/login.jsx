import React from 'react'
import './login.css';
import { useState } from 'react';
import { MdOutlineGrass } from "react-icons/md";
import Signin from './signin';
import Signup from './signup';
import { Helmet } from "react-helmet-async";

const Login = () => {
    const [log, setlog] = useState(true);
    const fun = (val) => {
        setlog(val);
    }
    const [showmsg, setshowmsg] = useState(false);

    return (
        <>
            <div className="login">
                <Helmet>
                    <title>Login/Signup || BattleFiesta</title>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href={`${window.location.origin}/login`} />
                    <meta name="description" content="Log in or sign up to BattleFiesta to join PUBG, BGMI, and Free Fire tournaments. Create your account, track your progress, and compete with top players." />
                </Helmet>
                <div className="box">
                    <div className="logo flex justify-center">
                        <MdOutlineGrass className='company' />
                    </div>
                    {/* <div className="want">
                        <span className={log ? "active" : null} onClick={() => fun(true)}>Login</span>
                        <span className={log ? null : "active"} onClick={() => fun(false)}>Register</span>
                    </div> */}
                    <div className="both" style={{ transform: log ? "translateX(0%)" : "translateX(-50%)" }}>
                        <Signin showmsg={showmsg} setshowmsg={setshowmsg} />
                        <Signup setshowmsg={setshowmsg} setlog={setlog} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login