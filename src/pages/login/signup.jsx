import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { MdOutlineMail, MdLocalPhone } from "react-icons/md";
import { IoKeyOutline, IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash, FaUserAstronaut } from "react-icons/fa";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { setloader, setlogin } from '../../store/login';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import swal from 'sweetalert';

const Signup = ({ setlog, setshowmsg }) => {
    const dispatch = useDispatch();
    const tournacenter = useSelector((state) => state.tournacenter);
    const init = {
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        ledger: ["general", "other"]
    }
    const [btnclick, setbtnclick] = useState(false);
    const [signinp, setsigninp] = useState(init);
    const [signuppass, setsignuppass] = useState(true);
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

        const { name, email, phone, password, cpassword } = signinp;
        if (!name || !email || !phone || !password) {
            toast.warn("All Fields are Required", { autoClose: 1300 })
            setbtnclick(false);
            return;
        }
        if (password != cpassword) {
            toast.warn("Password does not match", { autoClose: 1300 })
            setbtnclick(false);
            return;
        }
        if (phone.length < 10) {
            toast.warn("Mobile Should be 10 Digits", { autoClose: 1300 })
            setbtnclick(false);
            return;
        }

        try {
            setshowmsg(false)
            dispatch(setloader(true));
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, phone, password
                })
            })
            const datae = await res.json();
            console.log(res);
            if (res.ok && res.status == 200) {
                setshowmsg(true)
                setsigninp(init);
                setbtnclick(false);
                setlog(true)
                dispatch(setloader(false));
            } else if (res.ok && res.status == 201) {
               dispatch(setloader(false));
                setbtnclick(false);
                setshowmsg(true);
                setsigninp(init);
                swal({
                    title: 'Email Sent',
                    text: 'Please check your inbox to verify your email address. If you don’t see the message, check your spam or junk folder.',
                    icon: 'success',
                })
                setlog(true)
            } else {
                setshowmsg(false)
                dispatch(setloader(false));
                setbtnclick(false);
                toast.warn(datae.message, { autoClose: 3600 })
            }

            // console.log(datae);
        } catch (error) {
            setshowmsg(false)
            dispatch(setloader(false));
            setbtnclick(false);
            toast.warn(error.message, { autoClose: 3600 })
            console.log(error);
        }
    }

    return (
        <>
            <div className="singup">
                <form onSubmit={submite}>
                    <TextField
                        label="Name"
                        size="small"
                        autoComplete='off'
                        className='filled'
                        onChange={signhandle}
                        name="name"
                        required
                        value={signinp.name}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <FaUserAstronaut />
                            </InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Email"
                        size="small"
                        autoComplete='off'
                        className='filled'
                        onChange={signhandle}
                        name="email"
                        type='email'
                        required
                        value={signinp.email}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <MdOutlineMail />
                            </InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Phone"
                        size="small"
                        autoComplete='off'
                        color={signinp.phone.length == 10 ? "primary" : "warning"}
                        className='filled'
                        onChange={signhandle}
                        name="phone"
                        required
                        type='tel'
                        inputProps={{ minLength: 10, maxLength: 10 }}
                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                        value={signinp.phone}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <MdLocalPhone />
                            </InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Password"
                        className='filled'
                        size="small"
                        autoComplete="off"
                        onChange={signhandle}
                        name="password"
                        required
                        type={signuppass ? "password" : null}
                        value={signinp.password}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <IoKeyOutline />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end" style={{ cursor: "pointer" }} onClick={() => signuppass ? setsignuppass(false) : setsignuppass(true)}>
                                {signuppass ? <IoEyeOutline /> : <FaRegEyeSlash />}
                            </InputAdornment>
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        className='filled'
                        autoComplete='off'
                        color={signinp.password == signinp.cpassword ? "primary" : "warning"}
                        size="small"
                        onChange={signhandle}
                        name="cpassword"
                        required
                        value={signinp.cpassword}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <IoKeyOutline />
                            </InputAdornment>,
                        }}
                    />
                    <LoadingButton
                        fullWidth
                        loading={btnclick}
                        type='submit'
                        loadingPosition="start"
                        variant="contained"
                        startIcon={<FaHandsHoldingCircle />}
                    >
                        Signup
                    </LoadingButton>
                </form>
            </div>
        </>
    )
}

export default Signup