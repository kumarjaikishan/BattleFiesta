import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setadmin, setloader, setlogin } from '../../store/login';
import { toast } from 'react-toastify';
import { alltourna } from '../../store/api';
import { profilefetch } from '../../store/profile';
import { contactusform, membership, memshipentry, Users, voucher } from '../../store/admin';

const GoogleLoginBtn = ({ text = 'signup_with' }) => {
    const dispatch = useDispatch();

    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        const userData = jwtDecode(token);
        console.log(userData)

        // send token to backend for verification
        // await fetch("http://localhost:5000/api/auth/google", {
        const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        const data = await res.json();
        // console.log(data);
        if (res.ok && res.status == 200) {
            dispatch(setlogin(true));
            // console.log("login data",data);
            toast.success(data.message, { autoClose: 1000 });
            // setbtnclick(false);
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
            // setbtnclick(false);
            // setshowmsg(true)
            // toast.warn("Verify Email", { autoClose: 3700 });

        }
        else {
            // setshowmsg(false)
            // console.log(data);
            toast.warn(data.message ? data.message : "Error Occured", { autoClose: 1500 });
            // setbtnclick(false);
            dispatch(setloader(false));
        }

    };

    return (
        <div
            style={{
                marginLeft: 'auto', marginRight: '10px', marginTop: '5px', width: '100%'
                
            }}
        >
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() =>  toast.warn("Login Failed",{autoClose:2500})}
                theme="filled_blue"
                // logo_alignment='center'
                size='large'
                shape="pill"
                text={text}
            />

            {/* <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Login Failed")}
                theme="filled_blue"
                size="large"
                text="signin_with"
                shape="pill"
                logo_alignment="left"
                width="260px"
                locale="en"
                type="standard"
                ux_mode="popup"
            /> */}

        </div>

    )
}

export default GoogleLoginBtn
