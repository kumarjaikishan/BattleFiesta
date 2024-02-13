import { useEffect, useState } from "react";
import "./Register.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setloader, header } from '../../store/login';
import { toast } from "react-toastify";
import { styled, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import PhotoIcon from '@mui/icons-material/Photo';
import DeleteIcon from '@mui/icons-material/Delete';
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
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Register = () => {
    const dispatch = useDispatch();
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
    const tournacenter = useSelector((state) => state.tournacenter);
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
    const getenteries = async () => {
        try {
            const rese = await fetch(`${tournacenter.apiadress}/getenteries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tid: registerId })
            })
            const resuke = await rese.json();
            if (rese.ok) {
                let enteries = resuke.enteries;
                let filtenteries = enteries.filter((val) => {
                    return val.status != "rejected"
                })
                setfilteredentry(filtenteries);
                setentry(enteries);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetche = async (id) => {
        setdisable(true);
        try {
            const rese = await fetch(`${tournacenter.apiadress}/gettournamentform`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tid: id })
            })
            const resuke = await rese.json();
            console.log(resuke);
            if (rese.ok) {
                // toast.success(resuke.msg, { autoClose: 1300 });
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
                    min_player: actualdata.minimum_players,
                    max_player: actualdata.maximum_players,
                    title: actualdata2.title,
                    organiser: actualdata2.organiser,
                    status: actualdata2.status,
                    tourna_banner: actualdata2.tournment_banner,
                    tourna_logo: actualdata2.tournment_logo,
                    slots: actualdata2.slots
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
            toast.warn("Tournament Id not Valid", { autoClose: 2300 });
            dispatch(setloader(false));
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!inp.teamname) {
            return toast.warn("Team Name is Required.", { autoClose: 2300 });
        }
        if (all.ask_email && !inp.teamemail) {
            return toast.warn("Email is Required", { autoClose: 2300 });
        }
        if (all.ask_phone && !inp.teammobile) {
            return toast.warn("Phone is Required", { autoClose: 2300 });
        }
        if (all.ask_phone && inp.teammobile.length != 10) {
            return toast.warn("Phone must be 10 digits", { autoClose: 2300 });
        }
        if (all.ask_discord && !inp.teamdiscord) {
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
            if (!player.inGameName) {
                playernameerror = true;
            }
            if (all.ask_player_logo && !player.playerLogo) {
                playerlogoerror = true
            }
        });
        if (playernameerror) {
            return toast.warn("All Player Name is Required", { autoClose: 2300 });
        }
        if (playerlogoerror) {
            return toast.warn("Select All Player Logo", { autoClose: 2300 });
        }

        const formData = new FormData();
        formData.append("tid", inp.tournament_id);
        formData.append("userid", inp.userid);
        formData.append("teamName", inp.teamname);
        formData.append("email", inp.teamemail);
        formData.append("mobile", inp.teammobile);
        formData.append("discordID", inp.teamdiscord);
        formData.append("teamLogo", inp.selectedTeamLogo);
        formData.append("paymentScreenshot", inp.paymentss);


        try {
            setisloading(true);
            const id = toast.loading("Please wait...")
            setdisable(true);
            const response = await fetch(`${tournacenter.apiadress}/Teamregister`, {
                method: "POST",
                body: formData
            });

            const responseData = await response.json();
            const teamId = responseData.teamid;
            console.log(responseData);
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
                        const responsee = await fetch(`${tournacenter.apiadress}/playerregister`, {
                            method: "POST",
                            body: formData
                        });
                        const vfdvdf = await responsee.json();
                        if (responsee.ok) {
                            // toast.success(vfdvdf.msg, { autoClose: 3300 });
                        }
                    } catch (error) {
                        toast.error(responseData.error, { autoClose: 1300 });
                    }
                });
                toast.update(id, { render: all.success_msg ? all.success_msg : "Registered Successful", type: "success", isLoading: false, autoClose: 1600 });
                setdisable(false);
                setinp(inpinit)
                fetche(registerId);
                setnewfresh(true);
                getenteries();
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

    const common = (event, id) => {
        let WIDTH = 250;
        if (id == "paymentss") {
            WIDTH = 600;
        }
        let image_file = event.target.files[0] || event;
        let newimage = "";
        let name = Date.now() + image_file.name;
        // console.log(name);
        let reader = new FileReader
        reader.readAsDataURL(image_file)
        reader.onload = async (event) => {
            let image_url = event.target.result
            let image = document.createElement('img');
            image.src = image_url;
            // document.querySelector("#wrapper").appendChild(image)
            image.onload = async (e) => {
                let canvas = document.createElement("canvas")
                let ratio = WIDTH / e.target.width
                canvas.width = WIDTH
                canvas.height = e.target.height * ratio
                //    console.log(canvas.height)
                const context = canvas.getContext("2d")
                context.drawImage(image, 0, 0, canvas.width, canvas.height)

                let new_image_url = context.canvas.toDataURL("image/jpeg", 100)

                let new_image = document.createElement("img");

                newimage = urlToFile(new_image_url, name);
                new_image.src = new_image_url
                document.querySelector(`#${id}`).innerHTML = "";
                document.querySelector(`#${id}`).appendChild(new_image);
                id == "teamlogo" && setinp({ ...inp, selectedTeamLogo: newimage });
                id == "paymentss" && setinp({ ...inp, paymentss: newimage });
                // return newimage;
            }
        }
    }
    const common2 = (event, id, index) => {
        let WIDTH = 200;
        let image_file = event.target.files[0] || event;
        let newimage = "";
        let name = Date.now() + image_file.name;
        // console.log(name);
        let reader = new FileReader
        reader.readAsDataURL(image_file)
        reader.onload = async (event) => {
            let image_url = event.target.result
            let image = document.createElement('img');
            image.src = image_url;
            // document.querySelector("#wrapper").appendChild(image)
            image.onload = async (e) => {
                let canvas = document.createElement("canvas")
                let ratio = WIDTH / e.target.width
                canvas.width = WIDTH
                canvas.height = e.target.height * ratio
                //    console.log(canvas.height)
                const context = canvas.getContext("2d")
                context.drawImage(image, 0, 0, canvas.width, canvas.height)

                let new_image_url = context.canvas.toDataURL("image/jpeg", 100)

                let new_image = document.createElement("img");

                newimage = urlToFile(new_image_url, name);
                new_image.src = new_image_url
                document.querySelector(`#${id}`).innerHTML = "";
                document.querySelector(`#${id}`).appendChild(new_image);
                realplayerchange2(index, newimage)
                // return newimage;
            }
        }
    }
    const urlToFile = (url, naam) => {
        let arr = url.split(",");
        let mime = arr[0].match(/:(.*?);/)[1]
        let data = arr[1]
        let dataStr = atob(data)
        let n = dataStr.length
        let dataArr = new Uint8Array(n)

        while (n--) {
            dataArr[n] = dataStr.charCodeAt(n)
        }
        let file = new File([dataArr], naam, { type: mime })
        // console.log(file);
        return file;
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
            toast.warn(`Max of ${all.max_player} Palyers are Allowed`, { autoClose: 2100 })
        }
    }

    const deleteplayer = (index) => {
        let afterdeleteplayerlist = inp.players.filter((val, ind) => {
            return ind != index;
        })
        //    console.log(dfdf);
        setinp(prevState => ({
            ...prevState,
            players: afterdeleteplayerlist,
        }));
    }
    const [teamlist, setteamlist] = useState(false);
    return (
        <>
            <div className="registartionform">
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
                        <Button onClick={() => setteamlist(true)} startIcon={<GroupIcon />} variant="outlined" color="secondary">Team List</Button>
                    </Badge>
                </div>
                    {!teamlist && <div className="form">
                        <h2>Registration : {all.title}</h2>
                        <h4>Organised by : {all.organiser}</h4>
                        <div className="slots">
                            <span>Total Slots : {all.slots}</span>
                            <span>Registered : {filteredentry.length}</span>
                            <span>Available : {all.slots - filteredentry.length}</span>
                        </div>
                        <Divider variant="middle" />

                        {!newfresh && all.description != "" && <>
                            <p className="desc">{all.description}</p>
                            <Divider variant="middle" />
                        </>}
                        {!newfresh && all.isopen && all.slots > filteredentry.length && <form onSubmit={handleRegister}>
                            <Box
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}

                                autoComplete="off"
                            >
                                <TextField size="small" required id="outlined-basic" label="Team Name" value={inp.teamname} name="teamname" onChange={realhandlechange} variant="outlined" />
                                {all.ask_email && <TextField type="email" required={all.ask_email} value={inp.teamemail} size="small" id="outlined-basic" name="teamemail" label="Email ID" onChange={realhandlechange} variant="outlined" />}
                            </Box>
                            <Box
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch', mb: 2 },
                                }}

                                autoComplete="off"
                            >
                                {all.ask_phone && <TextField required={all.ask_phone}
                                    size="small" id="outlined-basic" name="teammobile"
                                    type='tel'
                                    value={inp.teammobile}
                                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                    onChange={realhandlechange} label="Mobile" variant="outlined"
                                    color={inp.teammobile.length == 10 ? "primary" : "warning"}
                                />}
                                {all.ask_discord && <TextField required={all.ask_discord} size="small" id="outlined-basic" name="teamdiscord" onChange={realhandlechange} label="Discord ID" variant="outlined" />}
                            </Box>
                            <Divider variant="middle" />
                            {
                                all.ask_team_logo && <>
                                    <h4>Set a logo for the Team*</h4>
                                    <div id="teamlogo"></div>
                                    <Button sx={{ mb: 3 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Logo
                                        <VisuallyHiddenInput
                                            type="file"
                                            accept="image/*"

                                            // onChange={handleTeamLogoChange}
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
                                    <Button sx={{ mb: 3 }} component="label" variant="contained" startIcon={<PhotoIcon />}>
                                        Upload S.S
                                        <VisuallyHiddenInput
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => common(event, "paymentss")}
                                        />
                                    </Button>
                                    <br />
                                </>
                            }

                            <h3>Player List</h3>
                            {inp.players.map((player, index) => (
                                <div className="player" key={index}>
                                    <h4>Player {index + 1} <DeleteIcon className="DeleteIcon" onClick={() => deleteplayer(index)} /></h4>
                                    <Box
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField size="small" id={`in-game-name-${index}`} value={inp.players[index].inGameName} onChange={(e) => realplayerchange(e, index, 'inGameName')} label="In Game Name*" variant="outlined" />
                                        <TextField size="small" id={`in-game-id-${index}`}
                                            value={inp.players[index].inGameID}
                                            type='tel'
                                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                            onChange={(e) => realplayerchange(e, index, 'inGameID')} label="In Game ID" variant="outlined"
                                        />
                                        {all.ask_player_logo && <>
                                            <h4>Set a logo for the player</h4>
                                            <div id={`playerLogo${index}`}></div>
                                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
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
                                <Button title="Add New Player" sx={{ mb: 2 }} onClick={addnewplayer} startIcon={<AddIcon />} disabled={disable} variant="outlined" color="primary">
                                    Add player
                                </Button></div>

                            <LoadingButton
                                loading={isloading}
                                loadingPosition="start"
                                startIcon={<CloudUploadIcon />}
                                variant="contained"
                                type="submit"
                            >
                                Register
                            </LoadingButton>

                        </form>}

                        {!all.isopen && <div className="closed">
                            <div> <PanToolIcon className="stop" /></div>
                            <h1>REGISTRATION CLOSED</h1>
                            <p>The Registration for this tournament has been closed by the Admin</p>
                        </div>}
                        {all.slots <= filteredentry.length && <div className="closed">
                            <div> <SentimentVeryDissatisfiedIcon className="stop" /></div>
                            <h1>Oops! Slot is Full</h1>
                            <p>The Registration for this tournament has been Full. It Excludes Teams Rejected</p>
                        </div>}

                        {/* after registration completed show registered team */}

                        {newfresh && <div className="closed">
                            <div> <TagFacesIcon className="stop" /></div>
                            <h1>Registration Done 👍</h1>
                            <p>You can now check your registration status on TeamList at any time, whether it is Pending, Approved, or Rejected</p>
                        </div>}

                        <div className="contacts">
                            <h2>Contact Details</h2>
                            {all.links.length > 0 ? <>
                                <div className="links">
                                    {all.links.map((val, ind) => {
                                        if (val.linkType == "whatsapp") {
                                            return <a key={ind} href={`https://wa.me/${val.link}`} target="_blank"><span><WhatsAppIcon className='ico' /></span> <span>{val.linkName}</span> </a>
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

export default Register;
