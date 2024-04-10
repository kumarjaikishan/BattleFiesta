import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { styled, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useImageUpload from "../../utils/imageresizer";
import { classicfetch } from "../../../store/classic";

const Teamedit = ({ teamdetail, setcalledit }) => {

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

    const [inp, setinp] = useState({
        userid: "",
        tournament_id: "",
        teamname: "",
        teamemail: "",
        teammobile: "",
        teamdiscord: "",
        selectedTeamLogo: "",
        players: Array(1).fill({
            inGameName: "",
            inGameID: "",
            playerLogo: "",
        }),
    })
    const [disable, setdisable] = useState(false);
    useEffect(() => {
        // fetche(registerId);
        // console.log(teamdetail);
        setinp({
            userid: teamdetail.userid,
            tournament_id: teamdetail.tournament_id,
            teamname: teamdetail.teamName,
            teamemail: teamdetail.email,
            teammobile: teamdetail.mobile,
            teamdiscord: teamdetail.discordID,
            selectedTeamLogo: teamdetail.teamLogo,
            players: teamdetail.player.map((each, ind) => {
                return each;
            })
        })
    }, [])
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
        ask_email: "",
        ask_phone: "",
        ask_discord: "",
        ask_team_logo: "",
        ask_player_logo: "",
        ask_payment_ss: "",
        min_player: 2,
        max_player: 5,
    };
    const [all, setall] = useState(init);


    const editTeam = async (e) => {
        e.preventDefault();
        let tid = inp.tournament_id;
        //    return  console.log(tid);
        if (!inp.teamname) {
            return toast.warn("Team Name is Required.", { autoClose: 2300 });
        }
        if (all.ask_email && !inp.teamemail) {
            return toast.warn("Email is Required", { autoClose: 2300 });
        }
        if (all.ask_phone && !inp.teammobile) {
            return toast.warn("Phone is Required", { autoClose: 2300 });
        }
        if (all.ask_discord && !inp.teamdiscord) {
            return toast.warn("Discord is Required", { autoClose: 2300 });
        }
        if (all.ask_team_logo && !inp.selectedTeamLogo) {
            return toast.warn("Select Team Logo", { autoClose: 2300 });
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
        formData.append("id", teamdetail._id);
        formData.append("teamName", inp.teamname);
        formData.append("email", inp.teamemail);
        formData.append("mobile", inp.teammobile);
        formData.append("discordID", inp.teamdiscord);
        formData.append("teamLogo", inp.selectedTeamLogo);


        try {
            const id = toast.loading("Please wait...")
            setdisable(true);
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}Teamupdate`, {
                method: "POST",
                body: formData
            });

            const responseData = await response.json();
            // console.log(responseData);
            setdisable(false);
            if (response.ok) {
                // toast.success(responseData.message, { autoClose: 3300 });
                inp.players.forEach(async (player, index) => {
                    const formData = new FormData();
                    formData.append("id", teamdetail._id);
                    formData.append("index", index);
                    formData.append(`inGameName`, player.inGameName);
                    formData.append(`inGameID`, player.inGameID);
                    formData.append(`playerLogo`, player.playerLogo);

                    try {
                        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}playerupdate`, {
                            method: "POST",
                            body: formData
                        });
                        const vfdvdf = await responsee.json();
                        if (responsee.ok) {
                            // toast.success(vfdvdf.message, { autoClose: 3300 });
                        }
                    } catch (error) {
                        toast.error(responseData.error, { autoClose: 1300 });
                    }
                });
                dispatch(classicfetch(tid));
                toast.update(id, { render: "Updated Successfully", type: "success", isLoading: false, autoClose: 1600 });
            } else {
                toast.update(id, { render: responseData.message, type: "warning", isLoading: false, autoClose: 2300 });
            }
        } catch (error) {
            console.error(error);
            toast.update(id, { render: error.message, type: "warning", isLoading: false, autoClose: 2300 });
        }
    };

    const common = async (event, id) => {
        let WIDTH = 180;

        let image_file = event.target.files[0];

        let resizedfile = await handleImage(WIDTH, image_file);

        let new_image = document.createElement("img");
        const resizedImageSrc = URL.createObjectURL(resizedfile);
        new_image.src = resizedImageSrc
        document.querySelector(`#${id}`).innerHTML = "";
        document.querySelector(`#${id}`).appendChild(new_image);
        setinp({ ...inp, selectedTeamLogo: resizedfile });
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

    return (
        <>
            <div className="registartionform">
                <div className="form">
                    <h2>Team Edit : {all.title}</h2>
                    <h4>Organised by : {all.organiser}</h4>

                    <form onSubmit={editTeam}>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}

                            autoComplete="off"
                        >
                            <TextField size="small" required id="outlined-basic" label="Team Name" name="teamname" value={inp.teamname} onChange={realhandlechange} variant="outlined" />
                            <TextField type="email" size="small" id="outlined-basic" name="teamemail" value={inp.teamemail} label="Email ID" onChange={realhandlechange} variant="outlined" />
                        </Box>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch', mb: 2 },
                            }}

                            autoComplete="off"
                        > <TextField size="small" id="outlined-basic" name="teammobile" type='tel'
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} value={inp.teammobile} onChange={realhandlechange} label="Mobile" variant="outlined" />
                            <TextField size="small" id="outlined-basic" name="teamdiscord" value={inp.teamdiscord} onChange={realhandlechange} label="Discord ID" variant="outlined" />
                        </Box>

                        <h4>Set a logo for the Team* </h4>
                        <div id="teamlogo"><img src={inp.selectedTeamLogo} alt="" /></div>
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
                        <h3>Player List</h3>
                        {inp.players.map((player, index) => (
                            <div className="player" key={index}>
                                <h4>Player {index + 1} <DeleteIcon onClick={() => deleteplayer(index)} /> </h4>
                                <Box
                                    sx={{
                                        '& > :not(style)': { m: 1, mt: 2, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField size="small" id={`in-game-name-${index}`} value={inp.players[index].inGameName} onChange={(e) => realplayerchange(e, index, 'inGameName')} label="In Game Name*" variant="outlined" />
                                    <TextField size="small" id={`in-game-id-${index}`} value={inp.players[index].inGameID} onChange={(e) => realplayerchange(e, index, 'inGameID')} label="In Game ID" variant="outlined" />

                                    <h4>Set a logo for the player</h4>
                                    <div id={`playerLogo${index}`}> <img src={inp.players[index].playerLogo} alt="" /></div>
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Logo
                                        <VisuallyHiddenInput
                                            type="file"
                                            accept="image/*"
                                            // onChange={(event) => handlePlayerLogoChange(event, index)}
                                            onChange={(event) => common2(event, `playerLogo${index}`, index)}
                                        />
                                    </Button>
                                    {/* {inp.players[index].playerLogo} */}
                                </Box>
                            </div>
                        ))}
                        <div>
                            <Button sx={{ mb: 2 }} onClick={addnewplayer} startIcon={<AddIcon />} disabled={disable} variant="outlined" color="primary">
                                Add player
                            </Button></div>
                        <Button sx={{ mr: 2 }} type="submit" startIcon={<CloudUploadIcon />} disabled={disable} variant="contained" color="primary">
                            Save Team
                        </Button>
                        <Button onClick={() => setcalledit(false)} startIcon={<CloseIcon />} disabled={disable} variant="outlined" color="secondary">
                            close
                        </Button>
                    </form>
                    <div className="contacts">
                        <h2>Contact Details</h2>
                        <p>The organiser has not provided any contact
                            details for the tournament.</p>
                        <p>If you are the organiser, check "Contact info" section in the tournament dashboard.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Teamedit;
