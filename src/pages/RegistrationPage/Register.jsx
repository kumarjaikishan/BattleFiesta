import React, { useEffect, useState } from "react";
import "./Register.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setloader, header } from '../../store/login';
import { toast } from "react-toastify";
import { styled, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { GrOverview } from "react-icons/gr";
import LoadingButton from '@mui/lab/LoadingButton';
import Teams from "./teams";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoMdCloudUpload } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { MdInsertPhoto } from "react-icons/md";
import { MdPanTool } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdFileCopy } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { TbMoodSad } from "react-icons/tb";
import { FaRegSmileWink } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import QRCode from "react-qr-code";
import useImageUpload from "../utils/imageresizer";
import { Helmet } from "react-helmet-async";

const Register = () => {
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
        teamname: "",
        teamemail: "",
        teammobile: "",
        teamdiscord: "",
        selectedTeamLogo: "",
        paymentss: "",
        players: Array(1).fill({
            inGameName: "",
            inGameID: "",
            playerLogo: "",
        }),
    }
    const [inp, setinp] = useState(inpinit)
    const init = {
        tid: "",
        userid: "",
        title: "",
        organiser: "",
        status: "",
        tourna_banner: "",
        tourna_logo: "",
        id: "",
        isopen: "",
        description: "",
        success_msg: "",
        links: '',
        ask_email: "",
        ask_phone: "",
        ask_discord: "",
        ask_team_logo: "",
        ask_player_logo: "",
        ask_payment_ss: "",
        show_payment: "",
        amount: "",
        upi_id: "",
        slots: '',
        min_player: 2,
        max_player: 5,
    };
    const [all, setall] = useState(init);
    const [entry, setentry] = useState([]);
    const [filteredentry, setfilteredentry] = useState([]);
    const [errore, seterrore] = useState(false);

    function generateRandomString() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';

        for (let i = 0; i < 18; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        // console.log('randomstring',randomString);
        return randomString;
    }

    const fetche = async (id) => {
        setdisable(true);
        try {
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}gettournamentform`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tid: id })
            })
            const resuke = await rese.json();
            // console.log(resuke);
            if (rese.ok) {
                // toast.success(resuke.message, { autoClose: 1300 });
                setdisable(false);
                const actualdata = resuke.data;
                const actualdata2 = resuke.data2;
                let enteries = resuke.enteries;
                let filtenteries = enteries.filter((val) => {
                    return val.status != "rejected"
                })
                setfilteredentry(filtenteries);
                setentry(enteries);
                setall({
                    ...all,
                    tid: actualdata.tournament_id,
                    userid: actualdata.userid,
                    id: actualdata._id,
                    isopen: actualdata.isopen,
                    description: actualdata.description,
                    success_msg: actualdata.success_message,
                    links: actualdata.links,
                    ask_email: actualdata.ask_email,
                    ask_phone: actualdata.ask_phone,
                    ask_discord: actualdata.ask_discord,
                    ask_team_logo: actualdata.ask_teamlogo,
                    ask_player_logo: actualdata.ask_playerlogo,
                    ask_payment_ss: actualdata.ask_payment_ss,
                    show_payment: actualdata.show_payment,
                    amount: actualdata.amount,
                    upi_id: actualdata.upi_id,
                    min_player: actualdata.minimum_players,
                    max_player: actualdata.maximum_players,
                    title: actualdata2.title,
                    organiser: actualdata2.organiser,
                    status: actualdata2.status,
                    tourna_banner: actualdata2.tournment_banner,
                    tourna_logo: actualdata2.tournment_logo,
                    slots: actualdata2.slots,
                    channel: actualdata2.userid.username
                })
                setinp({
                    ...inp,
                    userid: actualdata.userid,
                    tournament_id: actualdata.tournament_id,
                    players: Array(actualdata.minimum_players).fill({
                        inGameName: "",
                        inGameID: "",
                        playerLogo: "",
                    }),
                })
                dispatch(setloader(false));
            } else {
                seterrore(true);
                dispatch(setloader(false));
            }
        } catch (error) {
            toast.warn(error.message, { autoClose: 2300 });
            dispatch(setloader(false));
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!inp.teamname?.trim()) {
            return toast.warn("Team Name is Required.", { autoClose: 2300 });
        }
        if (!inp.teamname || inp.teamname.trim().length < 3) {
            return toast.warn("Minimum 3 letters required for Team name", { autoClose: 2300 });
        }

        if (all.ask_email && !inp.teamemail?.trim()) {
            return toast.warn("Email is Required", { autoClose: 2300 });
        }
        if (all.ask_phone && !inp.teammobile?.trim()) {
            return toast.warn("Phone is Required", { autoClose: 2300 });
        }
        if (all.ask_phone && inp.teammobile.trim().length !== 10) {
            return toast.warn("Phone must be 10 digits", { autoClose: 2300 });
        }
        if (all.ask_discord && !inp.teamdiscord?.trim()) {
            return toast.warn("Discord is Required", { autoClose: 2300 });
        }
        if (all.ask_team_logo && !inp.selectedTeamLogo) {
            return toast.warn("Select Team Logo", { autoClose: 2300 });
        }
        if (all.ask_payment_ss && !inp.paymentss) {
            return toast.warn("Select Payment Screenshot", { autoClose: 2300 });
        }

        let playernameerror = false;
        let playerlogoerror = false;
        inp.players.forEach((player) => {
            if (!player.inGameName?.trim() || player.inGameName.trim().length < 3) {
                playernameerror = true;
            }
            if (all.ask_player_logo && !player.playerLogo) {
                playerlogoerror = true;
            }
        });

        if (playernameerror) {
            return toast.warn("Each player name must have at least 3 characters", { autoClose: 2300 });
        }

        if (playerlogoerror) {
            return toast.warn("Select a logo for each player", { autoClose: 2300 });
        }


        const formData = new FormData();
        formData.append("tid", inp.tournament_id);
        formData.append("userid", inp.userid);
        formData.append("teamName", inp.teamname.trim());
        formData.append("email", inp.teamemail.trim());
        formData.append("mobile", inp.teammobile.trim());
        formData.append("discordID", inp.teamdiscord.trim());
        formData.append("teamLogo", inp.selectedTeamLogo);
        formData.append("paymentScreenshot", inp.paymentss);


        try {
            setisloading(true);
            const id = toast.loading("Please wait...")
            setdisable(true);
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}Teamregister`, {
                method: "POST",
                body: formData
            });

            const responseData = await response.json();
            const teamId = responseData.teamid;
            // console.log(responseData);
            if (response.ok) {
                inp.players.forEach(async (player, index) => {
                    let uniqueId = generateRandomString();
                    const formData = new FormData();
                    formData.append("teamid", teamId);
                    formData.append(`inGameName`, player.inGameName);
                    formData.append(`inGameID`, player.inGameID);
                    formData.append(`playerLogo`, player.playerLogo);
                    formData.append(`playerId`, uniqueId);

                    try {
                        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}playerregister`, {
                            method: "POST",
                            body: formData
                        });
                        const vfdvdf = await responsee.json();
                        if (responsee.ok) {
                            // toast.success(vfdvdf.message, { autoClose: 3300 });
                        }
                    } catch (error) {
                        toast.error(error.message, { autoClose: 1300 });
                    }
                });
                toast.update(id, { render: all.success_msg ? all.success_msg : "Registered Successful", type: "success", isLoading: false, autoClose: 1600 });
                setdisable(false);
                setinp(inpinit)
                fetche(registerId);
                setnewfresh(true);
            } else {
                toast.update(id, { render: responseData.message, type: "warning", isLoading: false, autoClose: 1600 });
            }
            setisloading(false);
        } catch (error) {
            console.error(error);
            toast.update(id, { render: error.message, type: "error", isLoading: false, autoClose: 1600 });
            setisloading(false);
        }
    };

    const common = async (event, id) => {
        let WIDTH = 150;
        if (id == "paymentss") {
            WIDTH = 680;
        }
        let image_file = event.target.files[0];

        let resizedfile = await handleImage(WIDTH, image_file);

        let new_image = document.createElement("img");
        const resizedImageSrc = URL.createObjectURL(resizedfile);
        new_image.src = resizedImageSrc
        document.querySelector(`#${id}`).innerHTML = "";
        document.querySelector(`#${id}`).appendChild(new_image);
        id == "teamlogo" && setinp({ ...inp, selectedTeamLogo: resizedfile });
        id == "paymentss" && setinp({ ...inp, paymentss: resizedfile });
    }
    const common2 = async (event, id, index) => {
        let image_file = event.target.files[0];

        let resizedfile = await handleImage(200, image_file);

        let new_image = document.createElement("img");
        const resizedImageSrc = URL.createObjectURL(resizedfile);
        new_image.src = resizedImageSrc
        document.querySelector(`#${id}`).innerHTML = "";
        document.querySelector(`#${id}`).appendChild(new_image);
        realplayerchange2(index, resizedfile)
    }

    const realhandlechange = (e) => {
        let naam = e.target.name;
        let value = e.target.value;
        setinp({
            ...inp, [naam]: value
        })
    }
    const realplayerchange = (event, index, field) => {
        const { value } = event.target;
        setinp((prev) => {
            const updatedPlayers = [...prev.players];
            updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
            return { ...prev, players: updatedPlayers };
        });
    };
    const realplayerchange2 = (index, value) => {
        setinp((prev) => {
            const updatedPlayers = [...prev.players];
            updatedPlayers[index] = { ...updatedPlayers[index], playerLogo: value };
            return { ...prev, players: updatedPlayers };
        });
    };
    const addnewplayer = () => {
        // console.log(inp.players.length, ":", all.max_player);
        let playerlen = inp.players.length;
        if (playerlen < all.max_player) {
            const newPlayer = {
                inGameName: "",
                inGameID: "",
                playerLogo: "",
            };

            // Use the spread operator to create a new object with an updated players array
            setinp(prevState => ({
                ...prevState,
                players: [...prevState.players, newPlayer],
            }));
        } else {
            toast.warn(`Max of ${all.max_player} Palyers are Allowed`, { autoClose: 3100 })
        }
    }

    const deleteplayer = (index) => {
        let playerlen = inp.players.length;
        if (playerlen > all.min_player) {
            let afterdeleteplayerlist = inp.players.filter((val, ind) => {
                return ind != index;
            })
            //    console.log(dfdf);
            setinp(prevState => ({
                ...prevState,
                players: afterdeleteplayerlist,
            }));
        } else {
            toast.warn(`Min of ${all.min_player} Palyers are Required`, { autoClose: 3100 })
        }
    }

    const [teamlist, setteamlist] = useState(false);

    return (
        <>
            <div className="registartionform">
                <Helmet>
                    <title>Registration || BattleFiesta</title>
                </Helmet>
                {errore && <div className="notfound">
                    <div>
                        <TbMoodSad className="sad" />
                        <h1>Ops! Something is Wrong</h1>
                        <p>Registration form does not exits!</p>
                    </div>
                </div>}
                {!errore && <><div className="controler">
                    <Button onClick={() => setteamlist(false)} startIcon={<MdFileCopy />} variant="contained" color="primary">Registration Form</Button>
                    {/* <Button onClick={() => setteamlist(true)} startIcon={<MdGroup />} variant="outlined" color="secondary">Team List {entry.length}</Button> */}
                    <Badge min={1} badgeContent={entry.length} color="success">
                        <Button onClick={() => setteamlist(true)} startIcon={<MdGroup />} variant="outlined" color="secondary">Team List</Button>
                    </Badge>
                </div>
                    {!teamlist &&
                        <div className="form">
                            <h2>Registration : {all.title}</h2>
                            <h4>Organised by : {all.organiser}
                                <Button variant="outlined"
                                    startIcon={<GrOverview />}
                                    onClick={() => window.open(`/channel/@${all.channel}`, '_blank')}
                                > View Channel
                                </Button>
                            </h4>
                            <div className="slots">
                                <span>Total Slots : {all.slots}</span>
                                <span>Registered : {filteredentry.length}</span>
                                <span>Available : {all.slots - filteredentry.length}</span>
                            </div>
                            <Divider variant="middle" />

                            {!newfresh && all.description != "" && <>
                                <p className="desc">
                                    {all.description.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </p>
                                <Divider variant="middle" />
                            </>}
                            {!newfresh && all.isopen && all.slots > filteredentry.length &&
                                <form onSubmit={handleRegister}>
                                    <div className="compart">
                                        <TextField className="cominp"
                                            size="small" required id="outlined-basic"
                                            label="Team Name"
                                            inputProps={{ minLength: 3 }}
                                            value={inp.teamname} name="teamname"
                                            helperText={inp.teamname.length < 3 ? "Minimum length is 3 characters" : ""}
                                            onChange={realhandlechange}
                                            variant="outlined"
                                        />
                                        {all.ask_email && <TextField className="cominp" type="email"
                                            required={all.ask_email} value={inp.teamemail}
                                            size="small" id="outlined-basic" name="teamemail"
                                            label="Email ID" onChange={realhandlechange}
                                            variant="outlined"
                                        />}

                                        {all.ask_phone && <TextField className="cominp" required={all.ask_phone}
                                            size="small" id="outlined-basic" name="teammobile"
                                            value={inp.teammobile}
                                            type='tel'
                                            inputProps={{ minLength: 10, maxLength: 10 }}
                                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                            onChange={realhandlechange} label="Mobile" variant="outlined"
                                            color={inp.teammobile.length == 10 ? "primary" : "warning"}
                                        />}
                                        {all.ask_discord && <TextField
                                            inputProps={{ minLength: 15, maxLength: 20 }}
                                            className="cominp" required={all.ask_discord} size="small"
                                            id="outlined-basic" name="teamdiscord"
                                            onChange={realhandlechange} label="Discord ID"
                                            variant="outlined"
                                        />}
                                    </div>
                                    <Divider variant="middle" />
                                    {
                                        all.ask_team_logo && <>
                                            <h4>Set a logo for the Team*</h4>
                                            <div id="teamlogo"></div>
                                            <Button sx={{ mb: 3, mt: 0.5 }} component="label" variant="contained" startIcon={<IoMdCloudUpload />}>
                                                Upload Logo
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => common(event, "teamlogo")}
                                                />
                                            </Button>
                                            <br />
                                        </>
                                    }
                                    <Divider variant="middle" />
                                    {
                                        all.ask_payment_ss && <>
                                            <h4>Set Payment Screenshot*</h4>
                                            <div id="paymentss"></div>
                                            <Button size="small" sx={{ mb: 0.5, mt: 0.5 }} component="label" variant="contained" startIcon={<MdInsertPhoto />}>
                                                Upload S.S
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => common(event, "paymentss")}
                                                />
                                            </Button>
                                            <p style={{ color: 'green', fontSize: '12px' }}>*Note- UTR/Txn No. must be visible in Screenshot</p>
                                            <br />
                                        </>
                                    }

                                    <h3>Player List</h3>
                                    {inp.players.map((player, index) => (
                                        <div className="player" key={index}>
                                            <h4>Player {index + 1} <MdDelete className="DeleteIcon" onClick={() => deleteplayer(index)} /></h4>
                                            <Box
                                                sx={{
                                                    '& > :not(style)': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField size="small" id={`in-game-name-${index}`}
                                                    value={inp.players[index].inGameName}
                                                    onChange={(e) => realplayerchange(e, index, 'inGameName')}
                                                    label="In Game Name*"
                                                    inputProps={{ minLength: 3 }}
                                                    variant="outlined"
                                                // helperText={inp.players[index].inGameName.length < 3 ? "Minimum length is 3 characters" : ""}
                                                />
                                                <TextField size="small" id={`in-game-id-${index}`}
                                                    value={inp.players[index].inGameID}
                                                    inputProps={{ minLength: 8, maxLength: 13 }}
                                                    type='tel'
                                                    onPaste={(event) => {
                                                        const pasteData = event.clipboardData.getData('Text');
                                                        if (!/^[0-9]*$/.test(pasteData)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                    onChange={(e) => realplayerchange(e, index, 'inGameID')} label="In Game ID" variant="outlined"
                                                />
                                                {all.ask_player_logo && <>
                                                    <h4>Set a logo for the player</h4>
                                                    <div id={`playerLogo${index}`}></div>
                                                    <Button component="label" variant="contained" startIcon={<IoMdCloudUpload />}>
                                                        Upload Logo
                                                        <VisuallyHiddenInput
                                                            type="file"
                                                            accept="image/*"
                                                            // onChange={(event) => handlePlayerLogoChange(event, index)}
                                                            onChange={(event) => common2(event, `playerLogo${index}`, index)}
                                                        />
                                                    </Button>
                                                </>
                                                }
                                            </Box>
                                        </div>
                                    ))}
                                    <div>
                                        <Button title="Add New Player" sx={{ mb: 2 }} onClick={addnewplayer} startIcon={<MdAdd />} disabled={disable} variant="outlined" color="primary">
                                            Add player
                                        </Button>
                                    </div>

                                    <LoadingButton
                                        loading={isloading}
                                        loadingPosition="start"
                                        startIcon={<IoMdCloudUpload />}
                                        variant="contained"
                                        type="submit"
                                        className="registerbtn"
                                    >
                                        Register
                                    </LoadingButton>

                                </form>}

                            {!all.isopen && <div className="closed">
                                <div> <MdPanTool className="stop" /></div>
                                <h1>REGISTRATION CLOSED</h1>
                                <p>The Registration for this tournament has been closed by the Admin</p>
                            </div>}
                            {all.slots <= filteredentry.length && all.isopen && <div className="closed">
                                <div> <TbMoodSad className="stop" /></div>
                                <h1>Oops! Slot is Full</h1>
                                <p>The Registration for this tournament has been Full. It Excludes Teams Rejected</p>
                            </div>}

                            {/* after registration completed show registered team */}

                            {newfresh && <div className="closed">
                                <div> <FaRegSmileWink className="stop" /></div>
                                <h1>Registration Done 👍</h1>
                                <p>You can now check your registration status on TeamList at any time, whether it is Pending, Approved, or Rejected</p>
                            </div>}
                            {/* {all.isopen && all.show_payment && all.slots > filteredentry.length && <div className="showpayment"> */}
                            {all.show_payment && <div className="showpayment">
                                <div className="img">
                                    <QRCode
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={`upi://pay?pa=${all.upi_id}&am=${all.amount}&tn=battleFiesta&cu=INR`}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <div className="remain">
                                    <div>
                                        {all.upi_id}
                                    </div>
                                    <div>
                                        <b>Entry Fee:</b> ₹{all.amount}
                                    </div>
                                    <Button
                                        sx={{ mt: 1 }}
                                        title="PAY NOW"
                                        onClick={() => { window.location.href = `upi://pay?pa=${all.upi_id}&am=${all.amount}&tn=battleFiesta&cu=INR`; }}
                                        startIcon={<MdOutlineCurrencyRupee />}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Pay Now
                                    </Button>
                                </div>
                            </div>}

                            <div className="contacts">
                                <h2>Contact Details</h2>
                                {all.links.length > 0 ? <>
                                    <div className="links">
                                        {all.links.map((val, ind) => {
                                            if (val.linkType == "whatsapp") {
                                                return <a key={ind} href={`https://wa.me/+91${val.link}`} target="_blank"><span><FaWhatsapp className='ico' /></span> <span>{val.linkName}</span> </a>
                                            }
                                            if (val.linkType == "instagram") {
                                                return <a key={ind} href={`https://www.instagram.com/${val.link}`} target="_blank"><span> <FaInstagram className='ico' /></span><span>{val.linkName}</span> </a>
                                            }
                                            if (val.linkType == "phone") {
                                                return <a key={ind} href={`tel:${parseInt(val.link)}`} target="_blank"><span> <FaPhoneAlt className='ico' /></span><span> {val.linkName}</span></a>
                                            }
                                            if (val.linkType == "email") {
                                                return <a key={ind} href={`mailto:${val.link}`} target="_blank"><span><IoMailOutline className='ico' /></span><span> {val.linkName}</span></a>
                                            }
                                            if (val.linkType == "link") {
                                                return <a key={ind} href={val.link} target="_blank"><span><IoLinkSharp className='ico' /></span><span>{val.linkName}</span> </a>
                                            }
                                        })}
                                    </div>
                                </> : <>
                                    <p>The organiser has not provided any contact
                                        details for the tournament.</p>
                                    <p>If you are the organiser, check "Contact info" section in the tournament dashboard.</p>
                                </>}

                            </div>
                        </div>
                    }
                    {teamlist && <Teams entry={entry} />} </>}
            </div>
        </>
    );
};

export default Register;
