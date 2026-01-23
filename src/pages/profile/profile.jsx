import './profile.css'
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { setloader } from '../../store/login';
import { useNavigate } from 'react-router-dom';
import { profilefetch } from '../../store/profile'
import useImageUpload from '../utils/imageresizer';
import { styled } from '@mui/material/styles';
import { IoMdSave } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube, FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { LuGamepad2 } from "react-icons/lu";
import { IoMdLink } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { cloudinaryUrl } from '../../utils/imageurlsetter';

const Profile = () => {
    const userprofile = useSelector((state) => state.userprofile);
    const dispatch = useDispatch();
    const { handleImage } = useImageUpload();
    const navigate = useNavigate();
    const photo = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'

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
        cover: '',
        sociallinks: []
    }
    const [inp, setinp] = useState(init);
    const [messagesent, setmessagesent] = useState('')
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
        // console.log(userprofile.userprofile)
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
        if (!userprofile.membership) {
            return;
        }
        let data = userprofile.userprofile;
        let membere = userprofile.membership
        // console.log(membere)
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
            profile: data.imgsrc,
            cover: data.coversrc
        })
        if (!userprofile.membership.planid.plan_name) {
            return;
        }
        setmembership({
            plan: membere.planid.plan_name,
            planprice: membere.planid.price,
            tournament: membere.planid.create_limit > 500 ? 'Unlimited' : membere.planid.create_limit,
            buydate: membere.buy_date,
            expirydate: membere.expire_date,
            expire_in: getTimeDifference(membere.expire_date),
            status: membere.isActive ? 'active' : 'expired'
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
            console.log(data)
            setisloadinge(false)
            if (!res.ok) {
                return toast.update(id, { render: data.message, type: "warning", isLoading: false, autoClose: 1600 });
            }
            dispatch(profilefetch());
            toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
            // console.log(data);
        } catch (error) {
            toast.update(id, { render: error.message, type: "warning", isLoading: false, autoClose: 1600 });
            console.log(error);
            setisloadinge(false)
        }
    }
    const handlefilechange = async (event, which) => {
        const imageFile = event.target.files[0];
        let resizedfile;
        let url;
        if (which == 'profile') {
            resizedfile = await handleImage(230, imageFile);
            url = `${import.meta.env.VITE_API_ADDRESS}updateprofilepic`
        } else {
            resizedfile = await handleImage(600, imageFile);
            url = `${import.meta.env.VITE_API_ADDRESS}updatecoverpic`
        }


        // console.log(resizedfile);

        if (resizedfile) {
            const id = toast.loading("Uploading Please wait...")
            setisloadinge(true)
            try {
                const token = localStorage.getItem("token");
                const formData = new FormData();
                formData.append(which === 'profile' ? 'profilepic' : 'coverpic', resizedfile);  // Dynamic key

                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData
                })
                const data = await res.json();
                setisloadinge(false)
                if (res.ok) {
                    // console.log(data);
                    toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
                    dispatch(profilefetch());
                    return;
                }
                toast.update(id, { render: data.message, type: "warning", isLoading: false, autoClose: 1600 });
            } catch (error) {
                toast.update(id, { render: error.message, type: "warning", isLoading: false, autoClose: 1600 });
                console.log(error);
                setisloadinge(false)
            }
        }
    }

    const resetpassword = async () => {
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
                return toast.update(id, { render: data.message, type: "warning", isLoading: false, autoClose: 2100 });
            }
            setmessagesent(data.extramessage)
            toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 2100 });
        } catch (error) {
            toast.update(id, { render: error.message, type: "warning", isLoading: false, autoClose: 2200 });
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
        // const currentDate = new Date('2024-04-04');
        // console.log(currentDate);

        const differenceInMilliseconds = givenDate - currentDate;
        const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        return days + 1;
    }
    const glass =
        "bg-gradient-to-br from-white/70 to-white/20 backdrop-blur-[12px] rounded-xl px-4 py-3";

    const SOCIAL_OPTIONS = [
        { value: "facebook", label: "Facebook", icon: <CiFacebook /> },
        { value: "youtube", label: "Youtube", icon: <FaYoutube /> },
        { value: "instagram", label: "Instagram", icon: <FaInstagram /> },
        { value: "discord", label: "Discord", icon: <LuGamepad2 /> },
        { value: "telegram", label: "Telegram", icon: <FaTelegramPlane /> },
        { value: "twitter", label: "Twitter", icon: <FaTwitter /> },
        { value: "website", label: "Website", icon: <IoMdLink /> },
    ];



    return (
        <div className="profilepage">
            <Helmet>
                <title>{inp.name} | Profile</title>
                <link rel="canonical" href={`${window.location.origin}/profile`} />
                <meta name="description"
                    content="Manage your BattleFiesta profile, update personal details, track tournament history, and customize settings for a better gaming experience." />
            </Helmet>

            <motion.div
                animate={{ scale: [1, 1.2, 1.2, 1], rotate: [0, 90, 90, 0], borderRadius: ["10%", "20%", "40%", "10%"] }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                className="
    absolute rounded-full
    w-[300px] h-[300px]
    bg-gradient-to-tr from-pink-200 to-orange-600
    top-[45%] left-[15%]
    max-[600px]:w-[250px] max-[600px]:h-[250px]
  "
            />

            <motion.div
                animate={{ scale: [1, 1.1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className=" absolute rounded-full
    w-[300px] h-[300px]
    bg-gradient-to-tr from-pink-400 to-blue-700
    top-[5%] right-[10%]
    max-[600px]:top-[10%] max-[600px]:right-[5%]
  "
            />


            <div className="materials">

                <div className={`profilepic  ${glass}`}>
                    <h2>Profile Picture</h2>
                    <div className="coverimg">
                        <img
                            src={cloudinaryUrl(inp?.cover, {
                                format: "webp",
                                //   width: 250,
                                //   height: 250,
                            }) || photo}
                            loading="lazy" alt="cover picture" />
                        <div className="img">
                            <img
                                src={cloudinaryUrl(inp?.profile, {
                                    format: "webp",
                                    width: 150,
                                    height: 150,
                                }) || photo}
                                loading="lazy" alt="profile picture" />
                        </div>
                    </div>

                    <Button
                        component="label"
                        sx={{ mt: 6 }}
                        disabled={isloadinge}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<IoMdCloudUpload />}
                        className='splbtn'
                    >
                        Change Cover
                        <VisuallyHiddenInput onChange={(e) => handlefilechange(e, 'cover')} type="file" accept="image/*" />
                    </Button>
                    <Button
                        component="label"
                        sx={{ mt: 1 }}
                        disabled={isloadinge}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<IoMdCloudUpload />}
                        className='splbtn'
                    >
                        Change Profile
                        <VisuallyHiddenInput onChange={(e) => handlefilechange(e, 'profile')} type="file" accept="image/*" />
                    </Button>
                </div>

                <div className={`profiledeatil  ${glass}`}>
                    <h2>Profile</h2>
                    <form onSubmit={submit}>
                        <div className="input">
                            <TextField size='small' onChange={handlechangee} name="name" value={inp.name || ''} className="half" label="Display Name" variant="outlined" />
                            <TextField size='small' onChange={handlechangee} name='username' value={inp.username || ''} className="half" label="UserName" variant="outlined" />
                            <TextField size='small' contentEditable={false} disabled name='email' value={inp.email || ''} className="half" label="Email" variant="outlined" />
                            <TextField size='small' onChange={handlechangee} name='phone'
                                value={inp.phone || ''} type='tel'
                                inputProps={{ minLength: 10, maxLength: 10 }}
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                className="half" label="Phone" variant="outlined" />
                            <TextField size='small' onChange={handlechangee} name='city' value={inp.city} className="half" label="City" variant="outlined" />
                            <TextField size='small' onChange={handlechangee} name='state' value={inp.state} className="half" label="State" variant="outlined" />
                            <TextField onChange={handlechangee} name='bio' value={inp.bio} multiline rows={2} className="full textarea" label="Bio/About" variant="outlined" />
                        </div>
                        {/* <button disabled={isloadinge} type='submit'>Save</button> */}
                        <Button
                            disabled={isloadinge}
                            variant="contained"
                            startIcon={<IoMdSave />}
                            className='splbtn'
                            type='submit'
                            size='small'
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<MdOutlineRemoveRedEye />}
                            className='splbtn'
                            size='small'
                            sx={{ marginLeft: 1 }}
                            onClick={() => navigate(`/channel/@${userprofile?.userprofile?.username}`)}
                        >
                            Public Profile
                        </Button>
                    </form>
                </div>

                <div className={`membership  ${glass}`}>
                    <h2>Membership</h2>
                    <div>
                        <p><span> Plan</span> <span>:</span> <span>{membership.plan} Plan</span> </p>
                        <p><span> Plan price</span> <span>:</span> <span>₹ {membership.planprice}.00</span> </p>
                        <p><span> Tournament</span> <span>:</span> <span>{membership.tournament}</span> </p>
                        <p><span> Buy Date</span> <span>:</span> <span>{formatDate(membership.buydate)}</span> </p>
                        <p><span> Expiry Date</span> <span>:</span> <span>{formatDate(membership.expirydate)} </span> </p>
                        <p><span> Expire In</span> <span>:</span> <span style={{ color: membership.expire_in < 6 && 'red' }}>{membership.expire_in} Days </span> </p>
                        <p><span> Status</span> <span>:</span> <span className={`status ${membership.status}`}>{membership.status}</span> </p>
                        <NavLink className="navlink" to='/subscription'>  <Button variant="contained" className='splbtn' startIcon={<MdOutlineAddShoppingCart />}>
                            Buy Membership
                        </Button></NavLink>
                    </div>
                </div>

                <div className={`passchange  ${glass}`}>
                    <h2>Change Password</h2>
                    <div>
                        <TextField required name='link'
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth size='small' value={inp.email}
                            className="half" label="Email Address" variant="outlined" />
                        {messagesent && <p style={{ color: 'green', fontSize: '14px' }}>{messagesent}</p>}
                        {!messagesent.length && <p style={{ fontSize: '14px' }}>A verification email will be sent to <b>{inp.email}</b>.</p>}
                        <Button disabled={isloadinge} onClick={resetpassword} title='Send Password Reset Link' variant="contained" className='splbtn' startIcon={<FaRegFaceSmile />}>
                            Send Password Reset Link
                        </Button>
                    </div>

                </div>

                <div className={`privacy  ${glass}`}>
                    <h2>Privacy</h2>
                    <div className="input">
                        <TextField onChange={handlechangee} name='publicemail' value={inp.publicemail || ''} className="full"
                            helperText="This emaill will be visible on your profile page"
                            label="Public Email" variant="outlined" />
                        <TextField onChange={handlechangee} type='tel'
                            inputProps={{ minLength: 10, maxLength: 10 }}
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                            name='publicphone' value={inp.publicphone || ''} className="full"
                            helperText="This phone number will be visible on your profile page"
                            label="Public Phone" variant="outlined" />
                    </div>
                    {/* <button disabled={isloadinge} onClick={submit}>Save</button> */}
                    <Button
                        disabled={isloadinge}
                        variant="contained"
                        startIcon={<IoMdSave />}
                        className='splbtn'
                        onClick={submit}
                        size='small'
                    >
                        Save
                    </Button>
                </div>

                <div className={`min-h-[340px] col-span-8 md:col-span-5 ${glass}`}>
                    <h2 className="mb-4 text-lg font-semibold">Social Links</h2>
                    <form onSubmit={submit}>
                        {inp.sociallinks &&
                            inp.sociallinks.map((val, ind) => (
                                <div
                                    key={ind}
                                    className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-2
                                            h-fit p-3 md:p-1  md:h-[55px] px-[2px] my-2  rounded-md
                                               lg:border-none border border-gray-400"
                                >
                                    {/* Platform select */}
                                    <span className="inline-block w-full  md:w-[28%]">
                                        <FormControl fullWidth size="small">
                                            <InputLabel id={`platform-label-${ind}`}>Name*</InputLabel>
                                            <Select
                                                labelId={`platform-label-${ind}`}
                                                value={val.name}
                                                required
                                                label="Name"
                                                name="name"
                                                onChange={(e) => handleChange(e, ind)}
                                            >
                                                {SOCIAL_OPTIONS.map(({ value, label, icon }) => (
                                                    <MenuItem key={value} value={value}>
                                                        <span className="flex items-center gap-2">
                                                            {icon}
                                                            {label}
                                                        </span>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </span>

                                    {/* URL input */}
                                    <span className="inline-block w-[85%] md:w-[65%]">
                                        <TextField
                                            required
                                            value={val.link}
                                            name="link"
                                            fullWidth
                                            size="small"
                                            onChange={(e) => handleChange(e, ind)}
                                            label="Url"
                                            variant="outlined"
                                        />
                                    </span>

                                    {/* Remove icon */}
                                    <span
                                        title="Remove This"
                                        onClick={() => deletelink(ind)}
                                        className="inline-flex items-center justify-center
                       w-[25px] h-[25px]
                       cursor-pointer
                       text-red-500
                       hover:bg-red-100
                       rounded-full
                       transition"
                                    >
                                        <IoCloseSharp />
                                    </span>
                                </div>
                            ))}

                        {/* Add button */}
                        <div className="my-3">
                            <Button variant="outlined" onClick={newlink} startIcon={<MdAdd />}>
                                Add
                            </Button>
                        </div>

                        {/* Save button */}
                        <Button
                            disabled={isloadinge}
                            variant="contained"
                            startIcon={<IoMdSave />}
                            type="submit"
                            size="small"
                            className="mt-2"
                        >
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Profile;