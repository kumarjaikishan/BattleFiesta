import React from 'react'
import './login.css';
import { useState } from 'react';
import { MdOutlineGrass } from "react-icons/md";
import Signin from './signin';
import Signup from './signup';

const Login = () => {
    const [log, setlog] = useState(true);
    const fun = (val) => {
        setlog(val);
    }
    const [showmsg,setshowmsg]= useState(false);

    return (
        <>
            <div className="login">
                <div className="box">
                    <div className="logo">
                        <MdOutlineGrass className='company' />
                    </div>
                    <div className="want">
                        <span className={log ? "active" : null} onClick={() => fun(true)}>Login</span>
                        <span className={log ? null : "active"} onClick={() => fun(false)}>Register</span>
                    </div>
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