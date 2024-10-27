import './contact.css'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import InputAdornment from '@mui/material/InputAdornment';
import { CiMail } from "react-icons/ci";
import { MdPerson4 } from "react-icons/md";


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
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}contact`, {
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
                toast.success(data.message, { autoClose: 1300 });
            }
        } catch (error) {
            setisloading(false)
            toast.error(error.message, { autoClose: 1300 });
            console.log(error);
        }
    }

    return (
        <div className='contact'>
            <div className="img">
                <img src="https://res.cloudinary.com/dusxlxlvm/image/upload/v1720771216/battlefiesta/assets/contact_nbvdng.svg" alt="" />
            </div>
            <div className="box">
                <form onSubmit={register}>
                    <h2>Contact Us</h2>
                    <TextField required
                        fullWidth id="outlined-basic"
                        label="Name"
                        name='name'
                        className='inp'
                        onChange={handlechange}
                        value={inp.name}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <MdPerson4 />
                            </InputAdornment>,
                        }}
                    />
                    <TextField required
                        fullWidth id="outlined-basic"
                        label="Email"
                        type='email'
                        name='email'
                        className='inp'
                        onChange={handlechange}
                        value={inp.email}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <CiMail />
                            </InputAdornment>,
                        }}
                    />
                    <TextField required
                        fullWidth id="outlined-basic"
                        label="Your Query"
                        multiline
                        name='message'
                        className='inp'
                        onChange={handlechange}
                        value={inp.message}
                        variant="outlined"
                        rows={10}
                    />
                    <LoadingButton
                        type='submit'
                        className='inp'
                        loading={isloading}
                        loadingPosition="start"
                        startIcon={<FaSave />}
                        variant="contained"
                        sx={{width:"100%"}}
                    >
                        SUBMIT
                    </LoadingButton>
                </form>
            </div>
        </div>
    )
}
export default Contact;