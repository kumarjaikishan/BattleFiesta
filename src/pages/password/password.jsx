import './password.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { toast } from "react-toastify";

const PasswordReset = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [inp, setinp] = useState({
        pass: '',
        cpass: ''
    })
    const handlechange = (e) => {
        let naam = e.target.name;
        let value = e.target.value;
        // console.log(naam,value);
        setinp({
            ...inp, [naam]: value
        })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(inp);
        try {
            setloading(true)
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}setpassword?token=${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: inp.pass })
            })
            const resuke = await rese.json();
            console.log(resuke);
            setloading(false)
            if (!rese.ok) {
                return toast.warn(resuke.message, { autoClose: 2100 })
            }
            toast.success(resuke.message, { autoClose: 1600 })
            navigate('/login')     
        } catch (error) {
            toast.warn(error.message, { autoClose: 2100 })
            console.log(error);
            setloading(false)
        }
    }
    const [isloading, setloading] = useState(false)
    return <>
        <div className="passwordpage">
            <div className="box">
                <h2>Reset Password</h2>
                <form onSubmit={handlesubmit}>
                    <TextField required name='pass' onChange={handlechange} value={inp.pass} sx={{ width: '90%', mt: 2, mb: 2 }} id="outlined-basic" label="Password" variant="outlined" />
                   <TextField required
                        onChange={handlechange}
                        error={inp.cpass.length ? inp.pass != inp.cpass : false}
                        helperText="Password must be same" name='cpass' value={inp.cpass} sx={{ width: '90%', mt: 2, mb: 2 }} id="outlined-basic" label="Confirm Password" variant="outlined" />
                    <LoadingButton
                        loading={isloading}
                        disabled={inp.pass != inp.cpass || !inp.pass.length}
                        // onClick={() => dispatch(alltourna())}
                        loadingPosition="start"
                        sx={{ width: '75%', mt: 2, mb: 2 }}
                        startIcon={<SaveIcon />}
                        variant="outlined"
                        type="submit"

                    >  Change Password
                    </LoadingButton>
                </form>
            </div>
        </div>
    </>
}
export default PasswordReset;