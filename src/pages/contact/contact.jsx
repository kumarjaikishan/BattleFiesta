import './contact.css'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const Contact = () => {
    const init = {
        name: '',
        email: "",
        message: ''
    }

    const tournacenter = useSelector((state) => state.tournacenter);
    const [inp, setinp] = useState(init);
    const handlechange = (e) => {
        let naam = e.target.name;
        let value = e.target.value;
        setinp({ ...inp, [naam]: value });
    }
    const [isloading, setisloading] = useState(false)
    const register = async (e) => {
        e.preventDefault();
        try {
            setisloading(true)
            const responsee = await fetch(`${tournacenter.apiadress}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inp)
            });

            const data = await responsee.json();
            if (responsee) {
                setisloading(false)
                setinp(init);
                toast.success(data.msg, { autoClose: 1300 });
            }
        } catch (error) {
            setisloading(false)
            toast.error("Something wrong", { autoClose: 1300 });
            console.log(error);
        }
    }

    return (
        <div className='contact'>
            <div className="box">
                <form onSubmit={register}>
                    <h2>Contact Us</h2>
                    <TextField required
                        fullWidth id="outlined-basic"
                        label="Name"
                        name='name'
                        onChange={handlechange}
                        value={inp.name}
                        variant="outlined"
                    />
                    <TextField required
                        fullWidth id="outlined-basic"
                        label="Email"
                        type='email'
                        name='email'
                        onChange={handlechange}
                        value={inp.email}
                        variant="outlined"
                    />
                    <TextField required
                        fullWidth id="outlined-basic"
                        label="Your Query"
                        multiline
                        name='message'
                        onChange={handlechange}
                        value={inp.message}
                        variant="outlined"
                        rows={12}
                    />
                    <LoadingButton
                        type='submit'
                        loading={isloading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                    >
                        SUBMIT
                    </LoadingButton>
                </form>
            </div>
        </div>
    )
}
export default Contact;