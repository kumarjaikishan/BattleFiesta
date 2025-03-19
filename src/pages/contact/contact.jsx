import './contact.css'
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import InputAdornment from '@mui/material/InputAdornment';
import { Helmet } from "react-helmet-async";
import { IoMdMail } from "react-icons/io";
import { MdPerson4 } from "react-icons/md";


const Contact = () => {
    const userprofile = useSelector((state) => state.userprofile);
    const log = useSelector((state) => state.login);
    const init = {
        name: '',
        email: "",
        message: ''
    }

    useEffect(() => {
        console.log(userprofile)
        console.log(log)
        log.islogin && setinp({
            name: userprofile.userprofile.name,
            email: userprofile.userprofile.email,
            message: ''
        })
    }, [])

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
                !log.islogin && setinp(init);
                log.islogin && setinp({ ...inp, message: '' });
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>Contact || BattleFiesta</title>
              <link rel="canonical" href={`${window.location.origin}/contact`} />
                <meta name="description"
                    content="Get in touch with BattleFiesta. Contact us for support, inquiries, or collaborations regarding PUBG, BGMI, and Free Fire tournaments. We're here to help!" />
            </Helmet>

            <div className="img">
                <img src="https://res.cloudinary.com/dusxlxlvm/image/upload/v1720771216/battlefiesta/assets/contact_nbvdng.svg" alt="contact svg" />
            </div>
            <div className="box">
                <form onSubmit={register}>
                    <h2>Contact Us</h2>
                    <TextField required
                        fullWidth id="outlined-basic"
                        label="Name"
                        name='name'
                        className='inp'
                        onChange={!log.islogin && handlechange}
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
                        onChange={!log.islogin && handlechange}
                        value={inp.email}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <IoMdMail />
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
                        sx={{ width: "100%" }}
                    >
                        SUBMIT
                    </LoadingButton>
                </form>
            </div>
        </div>
    )
}
export default Contact;