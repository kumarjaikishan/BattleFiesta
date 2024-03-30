import { useEffect, useState } from "react";
import "./Register.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setloader, header } from '../../store/login';
import { toast } from "react-toastify";
import { styled, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoIcon from '@mui/icons-material/Photo';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Divider from '@mui/material/Divider';
import PanToolIcon from '@mui/icons-material/PanTool';
import LoadingButton from '@mui/lab/LoadingButton';
import Teams from "./teams";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import GroupIcon from '@mui/icons-material/Group';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Badge from '@mui/material/Badge';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import QRCode from "react-qr-code";
import useImageUpload from "../utils/imageresizer";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const TdmRegister = () => {
    const dispatch = useDispatch();
    const { handleImage } = useImageUpload();
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
    const [newfresh, setnewfresh] = useState(false);
    const [isloading, setisloading] = useState(false)
    const { registerId } = useParams();
    const [disable, setdisable] = useState(false);
    useEffect(() => {
        dispatch(header("Registration"));
        dispatch(setloader(true));
        fetche(registerId);
    }, [])
    const inpinit = {
        userid: "",
        tournament_id: "",
        name: "",
        InGameId: "",
        mobile: "",
        email: "",
        os: "",
        discord: "",
        utrno: "",
        fps: "",
        device: "",
        paymentss: "",
        logo: "",
    }
    const [inp, setinp] = useState(inpinit)
    const [setting, setsetting] = useState({});
    const [about, setabout] = useState({});
    const [entry, setentry] = useState([]);
    const [filteredentry, setfilteredentry] = useState([]);
    const [errore, seterrore] = useState(false);

    const getenteries = async () => {
        try {
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}getplayerenteries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tid: registerId })
            })
            const resuke = await rese.json();
            console.log(resuke);
            // if (rese.ok) {
            //     let enteries = resuke.enteries;
            //     let filtenteries = enteries.filter((val) => {
            //         return val.status != "rejected"
            //     })
            //     setfilteredentry(filtenteries);
            //     setentry(enteries);
            // }
        } catch (error) {
            console.log(error);
        }
    }
    const fetche = async (id) => {
        setdisable(true);
        try {
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}gettdmtournamentform`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tid: id })
            })
            const resuke = await rese.json();
            console.log(resuke);
            if (rese.ok) {
                // toast.success(resuke.message, { autoClose: 1300 });
                setdisable(false);
                let enteries = resuke.enteries;
                let filtenteries = enteries.filter((val) => {
                    return val.status != "rejected"
                })
                setfilteredentry(filtenteries);
                setentry(enteries);
                setinp({
                    ...inp, userid: resuke.data.userid,
                    tournament_id: resuke.data.tournament_id,
                })
                setsetting(resuke.data)
                setabout(resuke.data2)
                dispatch(setloader(false));
            } else {
                seterrore(true);
                dispatch(setloader(false));
            }
        } catch (error) {
            toast.warn("Tournament Id not Valid", { autoClose: 2300 });
            dispatch(setloader(false));
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(inp);

        if (setting.ask_playerlogo && !inp.logo) {
            return toast.warn("Select Team Logo", { autoClose: 2300 });
        }
        if (setting.ask_payment_ss && !inp.paymentss) {
            return toast.warn("Select Payment Screenshot", { autoClose: 2300 });
        }

        const formData = new FormData();
        formData.append("tid", inp.tournament_id);
        formData.append("userid", inp.userid);
        formData.append("name", inp.name.trim());
        formData.append("InGameId", inp.InGameId);
        formData.append("mobile", inp.mobile);
        formData.append("email", inp.email);
        formData.append("os", inp.os);
        formData.append("discord", inp.discord);
        formData.append("utrno", inp.utrno);
        formData.append("fps", inp.fps);
        formData.append("device", inp.device);
        formData.append("paymentss", inp.paymentss);
        formData.append("logo", inp.logo);

        try {
            setisloading(true);
            const id = toast.loading("Please wait...")
            // setdisable(true);
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}TdmTeamregister`, {
                method: "POST",
                body: formData
            });

            const responseData = await response.json();
            // console.log(responseData);
            if (response.ok) {
                toast.update(id, { render: setting.success_msg ? setting.success_msg : "Registered Successful", type: "success", isLoading: false, autoClose: 1600 });
                setdisable(false);
                setinp(inpinit)
                fetche(registerId);
                setnewfresh(true);
                // getenteries();
            } else {
                toast.update(id, { render: "Something Went Wrong", type: "warn", isLoading: false, autoClose: 1600 });
            }
            setisloading(false);
        } catch (error) {
            console.error(error);
            toast.update(id, { render: "Registration failed. Please try again.", type: "error", isLoading: false, autoClose: 1600 });
            setisloading(false);
        }
    };

    const common = async (event, id) => {
        let WIDTH = 180;
        if (id == "paymentss") {
            WIDTH = 600;
        }
        let image_file = event.target.files[0];

        let resizedfile = await handleImage(WIDTH, image_file);

        let new_image = document.createElement("img");
        const resizedImageSrc = URL.createObjectURL(resizedfile);
        new_image.src = resizedImageSrc
        document.querySelector(`#${id}`).innerHTML = "";
        document.querySelector(`#${id}`).appendChild(new_image);
        id == "logo" && setinp({ ...inp, logo: resizedfile });
        id == "paymentss" && setinp({ ...inp, paymentss: resizedfile });
    }

    const realhandlechange = (e) => {
        let naam = e.target.name;
        let value = e.target.value;
        setinp({
            ...inp, [naam]: value
        })
    }

    const [teamlist, setteamlist] = useState(false);
    return (
        <>
            <div className="tdmregistartionform">
                {errore && <div className="notfound">
                    <div>
                        <SentimentVeryDissatisfiedIcon className="sad" />
                        <h1>Ops! Something is Wrong</h1>
                        <p>Registration form does not exits!</p>
                    </div>
                </div>}
                {!errore && <><div className="controler">
                    <Button onClick={() => setteamlist(false)} startIcon={<FileCopyIcon />} variant="contained" color="primary">Registration Form</Button>
                    {/* <Button onClick={() => setteamlist(true)} startIcon={<GroupIcon />} variant="outlined" color="secondary">Team List {entry.length}</Button> */}
                    <Badge min={1} badgeContent={entry.length} color="success">
                        <Button onClick={() => setteamlist(true)} startIcon={<GroupIcon />} variant="outlined" color="secondary">Player List</Button>
                    </Badge>
                </div>
                    {!teamlist && <div className="form">
                        <h2>Registration : {about.title}</h2>
                        <h4>Organised by : {about.organiser}</h4>
                        <div className="slots">
                            <span>Total Slots : {about.slots}</span>
                            <span>Registered : {filteredentry.length}</span>
                            <span>Available : {about.slots - filteredentry.length}</span>
                        </div>
                        <Divider variant="middle" />

                        {!newfresh && setting.description != "" && <>
                            <p className="desc">{setting.description}</p>
                            <Divider variant="middle" />
                        </>}
                        {!newfresh && <form onSubmit={handleRegister}>
                            <div className="compart">
                                <TextField className="cominp" size="small" required id="outlined-basic" label="In Game Name" value={inp.name} name="name" onChange={realhandlechange} variant="outlined" />
                                <TextField className="cominp" required value={inp.InGameId}
                                    type='tel'
                                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                    size="small" id="outlined-basic" name="InGameId" label="In Game ID" onChange={realhandlechange} variant="outlined" />

                                {setting.ask_phone && <TextField className="cominp" required={setting.ask_phone}
                                    size="small" id="outlined-basic" name="mobile"
                                    value={inp.mobile}
                                    type='tel'
                                    inputProps={{ minLength: 10, maxLength: 10 }}
                                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                    onChange={realhandlechange} label="Mobile" variant="outlined"
                                // color={inp.teammobile.length == 10 ? "primary" : "warning"}
                                />}
                                {setting.ask_email && <TextField className="cominp" size="small" id="outlined-basic" value={inp.email} name="email" type="email" onChange={realhandlechange} label="Email ID" variant="outlined" />}


                                {setting.ask_os && <FormControl className="cominp" size="small">
                                    <InputLabel id="demo-simple-select-label">Choose OS</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={inp.os}
                                        name="os"
                                        label="Choose OS"
                                        onChange={realhandlechange}
                                    >
                                        <MenuItem value={""} disabled>Select</MenuItem>
                                        <MenuItem value={'android'}>Android</MenuItem>
                                        <MenuItem value={'ios'}>Ios</MenuItem>
                                    </Select>
                                </FormControl>}
                                {setting.ask_discord && <TextField className="cominp" required size="small" id="outlined-basic" value={inp.discord} name="discord" onChange={realhandlechange} label="Discord ID" variant="outlined" />}


                                {setting.ask_fps && <TextField className="cominp" required
                                    type='tel'
                                    inputProps={{ minLength: 2, maxLength: 3 }}
                                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                    size="small" id="outlined-basic" name="fps" value={inp.fps} onChange={realhandlechange} label="FPS" variant="outlined" />}
                                {setting.ask_devicename && <TextField className="cominp" required size="small" id="outlined-basic" name="device" value={inp.device} onChange={realhandlechange} label="Device Name" variant="outlined" />}

                            </div>
                            <Divider variant="middle" />
                            {
                                setting.ask_playerlogo && <>
                                    <h4>Set a PlayerLogo*</h4>
                                    <div id="logo"></div>
                                    <Button size="small" sx={{ mb: 3,mt:0.5 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Logo
                                        <VisuallyHiddenInput
                                            type="file"
                                            accept="image/*"

                                            // onChange={handleTeamLogoChange}
                                            onChange={(event) => common(event, "logo")}
                                        />
                                    </Button>
                                    <br />
                                </>
                            }
                            <Divider variant="middle" />
                            {setting.ask_payment_ss && <>
                                <h4>Set Payment Screenshot*</h4>
                                <div id="paymentss"></div>
                                <Button size="small" sx={{ mb: 0.5, mt: 0.5 }} component="label" variant="contained" startIcon={<PhotoIcon />}>
                                    Upload S.S
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => common(event, "paymentss")}
                                    />
                                </Button>
                                <p style={{ color: 'green', fontSize: '12px' }}>*Note- UTR/Txn No. must be visible in Screenshot</p>
                                <TextField sx={{ mb: 1, mt: 1 }}
                                    type='tel'
                                    inputProps={{ minLength: 12, maxLength: 12 }}
                                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                    size="small" required id="outlined-basic" label="UTR NO." value={inp.utrno} name="utrno" onChange={realhandlechange} variant="outlined" />
                                <br />
                            </>}


                            <LoadingButton
                                loading={isloading}
                                loadingPosition="start"
                                startIcon={<CloudUploadIcon />}
                                variant="contained"
                                type="submit"
                                sx={{mt:1}}
                            >
                                Register
                            </LoadingButton>

                        </form>}

                        {!setting.isopen && <div className="closed">
                            <div> <PanToolIcon className="stop" /></div>
                            <h1>REGISTRATION CLOSED</h1>
                            <p>The Registration for this tournament has been closed by the Admin</p>
                        </div>}
                        {setting.slots <= filteredentry.length && <div className="closed">
                            <div> <SentimentVeryDissatisfiedIcon className="stop" /></div>
                            <h1>Oops! Slot is Full</h1>
                            <p>The Registration for this tournament has been Full. It Excludes Teams Rejected</p>
                        </div>}

                        {/* after registration completed show registered team */}

                        {newfresh && <div className="closed">
                            <div> <TagFacesIcon className="stop" /></div>
                            <h1>Registration Done 👍</h1>
                            <p>You can now check your registration status on PlayerList at any time, whether it is Pending, Approved, or Rejected</p>
                        </div>}
                        {!newfresh && setting.show_payment && <div className="showpayment">
                            <div className="img">
                                <QRCode
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={`upi://pay?pa=${setting.upi_id}&am=${setting.amount}&tn=battleFiesta&cu=INR`}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <div>
                                {setting.upi_id}
                            </div>
                            <div>
                            <b>Entry Fee:</b> ₹{setting.amount}
                            </div>
                            <Button
                                sx={{ mt: 1 }}
                                title="PAY NOW"
                                onClick={() => { window.location.href = `upi://pay?pa=${setting.upi_id}&am=${setting.amount}&tn=battleFiesta&cu=INR`; }}
                                startIcon={<CurrencyRupeeIcon />}
                                variant="outlined"
                                color="primary"
                            >
                                Pay Now
                            </Button>
                        </div>}

                        <div className="contacts">
                            <h2>Contact Details</h2>
                            {setting.links?.length > 0 ? <>
                                <div className="links">
                                    {setting.links.map((val, ind) => {
                                        if (val.linkType == "whatsapp") {
                                            return <a key={ind} href={`https://wa.me/+91${val.link}`} target="_blank"><span><WhatsAppIcon className='ico' /></span> <span>{val.linkName}</span> </a>
                                        }
                                        if (val.linkType == "instagram") {
                                            return <a key={ind} href={`instagram://user?username={${val.link}}`} target="_blank"><span> <InstagramIcon className='ico' /></span><span>{val.linkName}</span> </a>
                                        }
                                        if (val.linkType == "phone") {
                                            return <a key={ind} href={`tel:${parseInt(val.link)}`} target="_blank"><span> <LocalPhoneIcon className='ico' /></span><span> {val.linkName}</span></a>
                                        }
                                        if (val.linkType == "email") {
                                            return <a key={ind} href={`mailto:${val.link}`} target="_blank"><span><EmailIcon className='ico' /></span><span> {val.linkName}</span></a>
                                        }
                                        if (val.linkType == "link") {
                                            return <a key={ind} href={val.link} target="_blank"><span><InsertLinkIcon className='ico' /></span><span>{val.linkName}</span> </a>
                                        }
                                    })}
                                </div>
                            </> : <>
                                <p>The organiser has not provided any contact
                                    details for the tournament.</p>
                                <p>If you are the organiser, check "Contact info" section in the tournament dashboard.</p>
                            </>}

                        </div>
                    </div>}
                    {teamlist && <Teams entry={entry} />} </>}
            </div>
        </>
    );
};

export default TdmRegister
