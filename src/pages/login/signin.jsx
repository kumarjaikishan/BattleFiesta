import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { setloader, setlogin, setadmin } from '../../store/login';
import { useSelector, useDispatch } from 'react-redux';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { alltourna } from '../../store/api'
import { profilefetch } from '../../store/profile'
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { memshipentry, contactusform, voucher, membership, Users } from '../../store/admin';

const Signin = ({showmsg,setshowmsg}) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const tournacenter = useSelector((state) => state.tournacenter);
    const init = {
        email: "",
        password: ""
    }
    useEffect(() => {
        dispatch(setloader(false));
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
                console.log("login data",data);
                toast.success(data.message, { autoClose: 1300 });
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
                toast.warn("Verify Email", { autoClose: 3300 });
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
            toast.warn(error.message, { autoClose: 1500 });
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
                        size="small"
                        className='filled'
                        onChange={signhandle}
                        name="email"
                        type='email'
                        required
                        value={signinp.email}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>,

                        }}
                    />
                    {!forget && <TextField
                        label="Password"
                        className='filled'
                        size="small"
                        required
                        type={loginpass ? "password" : null}
                        onChange={signhandle}
                        name="password"
                        value={signinp.password}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <VpnKeyIcon />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end" style={{ cursor: "pointer" }} onClick={() => loginpass ? setloginpass(false) : setloginpass(true)}>
                                {loginpass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                            </InputAdornment>
                        }}

                    />}
                    {!forget && <div className='forget'>
                        <span onClick={() => setforget(true)}>Forget Password?</span>
                    </div>}

                    {forget && <div className='forget'>
                        <span onClick={() => setforget(false)}>SignIn?</span>
                    </div>}

                    {!forget && <LoadingButton
                        loading={btnclick}
                        type='submit'
                        startIcon={<VpnKeyIcon />}
                        loadingPosition="start"
                        variant="contained"
                    >
                        Login
                    </LoadingButton>}
                    {forget && <LoadingButton
                        loading={btnclick}
                        onClick={emailset}
                        startIcon={<VpnKeyIcon />}
                        loadingPosition="start"
                        variant="contained"
                    >
                        Email sent
                    </LoadingButton>}
                  {showmsg && <p>*Note-Email sent successfully, If you can't find the email in your inbox, please check the spam or junk mail section. </p>}  
                </form>
            </div>
        </>
    )
}

export default Signin;