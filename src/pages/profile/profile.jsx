import './profile.css'
import TextField from '@mui/material/TextField';
import photo from '../../assets/user.webp'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { motion } from 'framer-motion';
import { setloader } from '../../store/login';
import { profilefetch } from '../../store/profile'
import useImageUpload from '../utils/imageresizer';
import { styled } from '@mui/material/styles';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Profile = () => {
    const userprofile = useSelector((state) => state.userprofile);
    const dispatch = useDispatch();
    const { handleImage } = useImageUpload();
    const init = {
        name: '',
        username: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        bio: '',
        publicemail: '',
        publicphone: '',
        profile: '',
        sociallinks: ''
    }
    const [inp, setinp] = useState(init);
    const [messagesent,setmessagesent]= useState('')
    const [membership, setmembership] = useState({
        plan: 'N/A',
        planprice: 'N/A',
        buydate: 'N/A',
        expirydate: 'N/A',
        expire_in: 'N/A',
        status: 'N/A',
        tournament: 'N/A'
    })
    useEffect(() => {
        userprofile.userprofile && fetche();
     }, [userprofile])


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const fetche = async () => {
        let data = userprofile.userprofile;
        let membere = userprofile.membership
        setinp({
            ...inp,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            city: data.city,
            state: data.state,
            bio: data.bio,
            publicemail: data.publicemail,
            publicphone: data.publicphone,
            sociallinks: data.sociallinks,
            profile: data.imgsrc
        })
        setmembership({
            plan: membere.planid.plan_name,
            planprice: membere.planid.price,
            tournament: membere.planid.create_limit > 500 ? 'Unlimited' : membere.planid.create_limit,
            buydate: membere.buy_date,
            expirydate: membere.expire_date,
            expire_in: getTimeDifference(membere.expire_date),
            status: getTimeDifference(membere.expire_date) < 0 ? 'expired':'active'
        })
    }
    const newlink = () => {
        let newe = {
            name: '',
            link: ''
        }
        setinp({
            ...inp, sociallinks: [...inp.sociallinks, newe]
        })
    }
    const deletelink = (index) => {
        let newsociallink = inp.sociallinks.filter((val, ind) => {
            return ind != index
        })
        setinp({
            ...inp,
            sociallinks: newsociallink
        })
    }

    const handleChange = (e, index) => {
        // setAge(event.target.value);
        const naam = e.target.name;
        const value = e.target.value;
        const updated = [...inp.sociallinks];
        updated[index] = { ...updated[index], [naam]: value };

        setinp({
            ...inp, sociallinks: updated
        })
    };
    const handlechangee = (e) => {
        const naam = e.target.name;
        const value = e.target.value;
        setinp({ ...inp, [naam]: value });
    }
    const [isloadinge, setisloadinge] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        setisloadinge(true)
        // console.log(inp);
        const id = toast.loading("Please wait...")
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}updateprofile`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inp)
            })
            const data = await res.json();
            if (res.ok) {

                dispatch(profilefetch());
                toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
                // console.log(data);
            }
            setisloadinge(false)
        } catch (error) {
            toast.update(id, { render: error, type: "warn", isLoading: false, autoClose: 1600 });
            console.log(error);
            setisloadinge(false)
        }
    }
    const handlefilechange = async (event) => {
        const imageFile = event.target.files[0];

        let resizedfile = await handleImage(200, imageFile);
        // console.log(resizedfile);

        if (resizedfile) {
            const id = toast.loading("Uploading Please wait...")
            try {
                const token = localStorage.getItem("token");
                const formData = new FormData();
                formData.append(`profilepic`, resizedfile);
                const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}updateprofilepic`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData
                })
                const data = await res.json();
                if (res.ok) {
                    toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
                    // console.log(data);
                    setinp({ ...inp, profile: data.url });
                }
            } catch (error) {
                toast.update(id, { render: error, type: "warn", isLoading: false, autoClose: 1600 });
                console.log(error);
            }
        }
    }
    const resetpassword=async()=>{
        try {
            setisloadinge(true)
            const id = toast.loading("Please wait...")
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}passreset`, {
                method: "Get",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            const data = await res.json();
            // console.log(data);
            setisloadinge(false)
            
            if (!res.ok) {
               return toast.update(id, { render: data.message, type: "warn", isLoading: false, autoClose: 2100 });
            }
            setmessagesent(data.extramessage)
            toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 2100 });
        } catch (error) {
            toast.update(id, { render: data.message, type: "warn", isLoading: false, autoClose: 2200 });
            setisloadinge(false)
            console.log(error);
        }
    }
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };
    function getTimeDifference(dateString) {
        const givenDate = new Date(dateString);
        const currentDate = new Date();
        // const currentDate = new Date('2024-03-27');
        // console.log(currentDate);
    
        const differenceInMilliseconds = givenDate - currentDate;
        const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    
        return days+1;
    }

    return (
        <div className="profile">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1.2, 1],
                    rotate: [0, 90, 90, 0],
                    borderRadius: ['10%', '20%', '40%', '10%']
                }}
                transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
                className="circle circle1"></motion.div>
            <motion.div
                animate={{
                    scale: [1, 1.1, 1.1, 1],
                    // rotate: [0, 180, 190, 0],
                    // borderRadius: ['10%', '20%', '40%', '10%']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="circle circle2"></motion.div>
            {/* <div className="menu">
                <div>
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>Profile</span>
                </div>
                <div className='active'>
                    <i className="fa fa-credit-card" aria-hidden="true"></i>
                    <span>Membership</span>
                </div>
            </div> */}
            <div className="materials">
                <div className="profilepic glass">
                    <h2>Profile Picture</h2>
                    <div className="img">
                        <img src={inp.profile ? inp.profile : photo}
                         loading="lazy"   alt="" />
                    </div>
                    <div> <h2>{inp.name}</h2></div>
                    <Button
                        component="label"
                        sx={{ mt: 2 }}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        className='splbtn'
                    >
                        Change Profile
                        <VisuallyHiddenInput onChange={handlefilechange} type="file" accept="image/*" />
                    </Button>
                </div>
                <div className="profiledeatil glass">
                    <h2>Profile</h2>
                    <form onSubmit={submit}>
                        <div className="input">
                            <TextField size='small' onChange={handlechangee} name="name" value={inp.name} className="half" id="outlined-basic" label="Display Name" variant="outlined" />
                            <TextField size='small' onChange={handlechangee} name='username' value={inp.username} className="half" id="outlined-basic" label="UserName" variant="outlined" />
                            <TextField size='small' contentEditable={false} name='email' value={inp.email} className="half" id="outlined-basic" label="Email" variant="outlined" />
                            <TextField size='small' onChange={handlechangee} name='phone'
                                value={inp.phone} type='tel'
                                inputProps={{ minLength: 10, maxLength: 10 }}
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                className="half" id="outlined-basic" label="Phone" variant="outlined" />
                            <TextField size='small' onChange={handlechangee} name='city' value={inp.city} className="half" id="outlined-basic" label="City" variant="outlined" />
                            <TextField size='small' onChange={handlechangee} name='state' value={inp.state} className="half" id="outlined-basic" label="State" variant="outlined" />
                            <TextField onChange={handlechangee} name='bio' value={inp.bio} multiline rows={2} className="full" id="outlined-basic" label="Bio" variant="outlined" />
                        </div>
                        <button disabled={isloadinge} type='submit'>Save</button>
                    </form>
                </div>
                <div className="membership glass">
                    <h2>Membership</h2>
                    <div>
                        <p><span> Plan</span> <span>:</span> <span>{membership.plan} Plan</span> </p>
                        <p><span> Plan price</span> <span>:</span> <span>₹ {membership.planprice}.00</span> </p>
                        <p><span> Tournament</span> <span>:</span> <span>{membership.tournament}</span> </p>
                        <p><span> Buy Date</span> <span>:</span> <span>{formatDate(membership.buydate)}</span> </p>
                        <p><span> Expiry Date</span> <span>:</span> <span>{formatDate(membership.expirydate)} </span> </p>
                        <p><span> Expire In</span> <span>:</span> <span style={{ color: membership.expire_in < 6 && 'red' }}>{membership.expire_in} Days </span> </p>
                        <p><span> Status</span> <span>:</span> <span className={`status ${membership.status}`}>{membership.status}</span> </p>
                        <NavLink className="navlink" to='/plan'>  <Button variant="contained" className='splbtn' startIcon={<ShoppingCartCheckoutIcon />}>
                            Buy Membership
                        </Button></NavLink>
                    </div>
                </div>
                <div className="passchange glass">
                    <h2>Change Password</h2>
                    <div>
                        <TextField required name='link' disabled fullWidth size='small' value={inp.email}
                            className="half" id="outlined-basic" label="Email Address" variant="outlined" />
                       {messagesent && <p style={{color:'green', fontSize:'14px'}}>{messagesent}</p>} 
                       {!messagesent.length && <p style={{ fontSize:'14px'}}>A verification email will be sent to <b>{inp.email}</b>.</p>}
                        <Button disabled={isloadinge} onClick={resetpassword} title='Feature coming soon' variant="contained" className='splbtn' startIcon={<SentimentDissatisfiedIcon />}>
                            Send Password Reset Link
                        </Button>
                    </div>

                </div>
                <div className="privacy glass">
                    <h2>Privacy</h2>
                    <div className="input">
                        <TextField onChange={handlechangee} name='publicemail' value={inp.publicemail} className="full" id="outlined-basic"
                            helperText="This emaill will be visible on your profile page"
                            label="Public Email" variant="outlined" />
                        <TextField onChange={handlechangee} type='tel'
                        inputProps={{ minLength: 10, maxLength: 10 }}
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                            name='publicphone' value={inp.publicphone} className="full" id="outlined-basic"
                            helperText="This phone number will be visible on your profile page"
                            label="Public Phone" variant="outlined" />
                    </div>
                    <button disabled={isloadinge} onClick={submit}>Save</button>
                </div>
                <div className="social glass">
                    <h2>Social Links</h2>
                    <form onSubmit={submit}>
                        {inp.sociallinks && inp.sociallinks.map((val, ind) => {
                            return <div key={ind} className='link'>
                                <span>
                                    <FormControl fullWidth size='small'>
                                        <InputLabel id="demo-simple-select-label">Name*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={val.name}
                                            required
                                            label="Name"
                                            name='name'
                                            onChange={(e) => handleChange(e, ind)}
                                        >
                                            <MenuItem value={'facebook'}><i className="fa fa-whatsapp" aria-hidden="true"> </i> &nbsp; Facebook</MenuItem>
                                            <MenuItem value={'youtube'}><i className="fa fa-youtube-play" aria-hidden="true"></i> &nbsp; Youtube</MenuItem>
                                            <MenuItem value={'instagram'}><i className="fa fa-instagram" aria-hidden="true"></i>&nbsp; Instagram</MenuItem>
                                            <MenuItem value={'discord'}><i className="fa fa-gamepad" aria-hidden="true"></i>&nbsp; Discord</MenuItem>
                                            <MenuItem value={'telegram'}><i className="fa fa-telegram" aria-hidden="true"></i>&nbsp; Telegram</MenuItem>
                                            <MenuItem value={'twitter'}><i className="fa fa-twitter" aria-hidden="true"></i>&nbsp; Twitter</MenuItem>
                                            <MenuItem value={'website'}><i className="fa fa-link" aria-hidden="true"></i>&nbsp; Website</MenuItem>
                                        </Select>
                                    </FormControl>
                                </span>
                                <span>
                                    <TextField required value={val.link} name='link' fullWidth size='small'
                                        onChange={(e) => handleChange(e, ind)}
                                        className="half" id="outlined-basic" label=" Url*.. " variant="outlined" />
                                </span>
                                <span title='Remove This' onClick={() => deletelink(ind)}> <CloseIcon /> </span>
                            </div>
                        })}

                        <div>
                            <Button variant="outlined" onClick={newlink} startIcon={<AddIcon />}>
                                Add
                            </Button>
                        </div>
                        <button disabled={isloadinge} type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Profile;