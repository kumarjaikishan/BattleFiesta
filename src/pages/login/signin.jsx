import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { MdOutlineMail } from "react-icons/md";
import { IoKeyOutline, IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { setloader, setlogin, setadmin } from '../../store/login';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { alltourna } from '../../store/api'
import { profilefetch } from '../../store/profile'
import { toast } from 'react-toastify';
import {  Button} from "@mui/material";
import { memshipentry, contactusform, voucher, membership, Users } from '../../store/admin';
import GoogleLoginBtn from './GoogleLoginBtn';

const Signin = ({ showmsg, setshowmsg }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let location = useLocation();

    const tournacenter = useSelector((state) => state.tournacenter);
    const init = {
        email: "",
        password: ""
    }
    // const from = location.state?.from || "/dashboard";

    useEffect(() => {
        dispatch(setloader(false));
        // console.log(location.state)
        // console.log("api call:",import.meta.env.VITE_API_ADDRESS);
    }, [])

    const [signinp, setsigninp] = useState(init);
    const [loginpass, setloginpass] = useState(true);
    const [btnclick, setbtnclick] = useState(false);

    const signhandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setsigninp({
            ...signinp, [name]: value
        })
    }

    const submite = async (e) => {
        e.preventDefault();
        setbtnclick(true);
        const { email, password } = signinp;

        try {
            setshowmsg(false)
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const data = await res.json();
            // console.log(data);
            if (res.ok && res.status == 200) {
                dispatch(setlogin(true));
                // console.log("login data",data);
                toast.success(data.message, { autoClose: 1000 });
                setbtnclick(false);
                dispatch(setloader(true));
                dispatch(setadmin(data.isadmin));
                localStorage.setItem("token", data.token);
                dispatch(alltourna());
                dispatch(profilefetch());

                if (data.isadmin) {
                    dispatch(memshipentry());
                    dispatch(contactusform());
                    dispatch(voucher());
                    dispatch(membership());
                    dispatch(Users());
                }
                return navigate('/dashboard');
            }
            else if (res.ok && res.status == 201) {
                dispatch(setloader(false));
                setbtnclick(false);
                setshowmsg(true)
                // toast.warn("Verify Email", { autoClose: 3700 });
                swal({
                    title: 'Email Sent',
                    text: 'Please check your inbox to verify your email address. If you don’t see the message, check your spam or junk folder.',
                    icon: 'success',
                })
            }
            else {
                setshowmsg(false)
                // console.log(data);
                toast.warn(data.message ? data.message : "Error Occured", { autoClose: 1500 });
                setbtnclick(false);
                dispatch(setloader(false));
            }

        } catch (error) {
            setshowmsg(false)
            console.log(error);
            toast.warn(error.message, { autoClose: 2500 });
            setbtnclick(false);
            dispatch(setloader(false));
        }
    }

    const [forget, setforget] = useState(false);
    const emailset = async () => {
        const email = signinp.email;
        if (email == "") {
            return toast.warn("Email can't be empty", { autoClose: 2100 })
        }
        try {
            setbtnclick(true)
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}checkmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })
            const data = await res.json();
            // console.log(data);
            setbtnclick(false)

            if (!res.ok) {
                return toast.warn(data.message, { autoClose: 2100 });
            }
            setforget(false);
            toast.success(data.message, { autoClose: 2100 })
        } catch (error) {
            toast.warn(error.message, { autoClose: 2100 });
            setbtnclick(false)
            console.log(error);
        }
    }

    return (
        <>
            <div className="logine" id='forme'>
                <form onSubmit={submite}>
                    <TextField
                        label="Email"
                        fullWidth
                        size="small"
                        variant='standard'
                        className='filled'
                        onChange={signhandle}
                        name="email"
                        type='email'
                        required
                        value={signinp.email}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <MdOutlineMail size={20} />
                            </InputAdornment>,

                        }}
                    />
                    {!forget && <TextField
                        label="Password"
                        className='filled'
                        size="small"
                        variant='standard'
                        required
                        type={loginpass ? "password" : null}
                        onChange={signhandle}
                        name="password"
                        value={signinp.password}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <IoKeyOutline size={20} />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end" style={{ cursor: "pointer" }} onClick={() => loginpass ? setloginpass(false) : setloginpass(true)}>
                                {loginpass ? <IoEyeOutline size={20} /> : <FaRegEyeSlash size={20} />}
                            </InputAdornment>
                        }}

                    />}
                    <div
                        style={{
                            textAlign: "right",
                            marginTop: "5px",
                            fontSize: "0.9rem",
                            width: '100%'
                        }}
                        className='forget'
                    >
                        {!forget ? (
                            <div
                                className=''
                            >
                                <span
                                    onClick={() => setforget(true)}
                                    className=' text-gray-800 cursor-pointer underline'
                                >  Forgot Password?</span>

                            </div>
                        ) : (
                            <div
                                onClick={() => setforget(false)}
                                style={{
                                    // color: "#3b82f6",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                }}
                            >
                                ← Back to Sign In
                            </div>
                        )}
                    </div>
                    {!forget && <Button
                        loading={btnclick}
                        fullWidth
                        type='submit'
                        startIcon={<IoKeyOutline />}
                        loadingPosition="start"
                        variant="contained"
                    >
                        Login
                    </Button>}
                    {forget && <Button
                        fullWidth
                        loading={btnclick}
                        onClick={emailset}
                        startIcon={<IoKeyOutline />}
                        loadingPosition="start"
                        variant="contained"
                    >
                        Send Email
                    </Button>}


                    <div
                        style={{
                            textAlign: "center",
                            color: "#60636a",
                            fontSize: "0.9rem",
                            margin: "0.5rem 0",
                        }}
                    >
                        — OR —
                    </div>


                    <GoogleLoginBtn text="Sign in or Sign up with Google" />
                    {/* <GoogleLoginBtn text="Continue with Google" /> */}



                    {/* {showmsg && <p>*Note: Email sent successfully. If not in your inbox, check spam/junk mail. </p>} */}
                </form>

            </div>
        </>
    )
}

export default Signin;