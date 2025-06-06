import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { styled, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { MdCloudUpload } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useImageUpload from "../../utils/imageresizer";
import { classicfetch } from "../../../store/classic";

const Teamedit = ({ teamdetail, setcalledit }) => {

     const group1 = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group1_oxfqan.webp'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'
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
        console.log(teamdetail);
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

    const editTeam = async (e) => {
        e.preventDefault();
        let tid = inp.tournament_id;
        //    return  console.log(tid);
        if (!inp.teamname.trim()) {
            return toast.warn("Team Name is Required.", { autoClose: 2300 });
        }
        if (all.ask_email && !inp.teamemail.trim()) {
            return toast.warn("Email is Required", { autoClose: 2300 });
        }
        if (all.ask_phone && !inp.teammobile.trim()) {
            return toast.warn("Phone is Required", { autoClose: 2300 });
        }
        if (all.ask_discord && !inp.teamdiscord.trim()) {
            return toast.warn("Discord is Required", { autoClose: 2300 });
        }
        if (all.ask_team_logo && !inp.selectedTeamLogo) {
            return toast.warn("Select Team Logo", { autoClose: 2300 });
        }

        let playernameerror = false;
        let playerlogoerror = false;

        inp.players.forEach((player) => {
            if (!player.inGameName.trim()) {
                playernameerror = true;
            }
            if (all.ask_player_logo && !player.playerLogo) {
                playerlogoerror = true;
            }
        });

        if (playernameerror) {
            return toast.warn("All Player Name is Required", { autoClose: 2300 });
        }
        if (playerlogoerror) {
            return toast.warn("Select All Player Logo", { autoClose: 2300 });
        }


        // console.log(inp)
        const formData = new FormData();
        formData.append("id", teamdetail._id);
        formData.append("teamName", inp.teamname);
        formData.append("email", inp.teamemail);
        formData.append("mobile", inp.teammobile || null);
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
                    let uniqueId = generateRandomString();
                    const formData = new FormData();
                    formData.append("id", teamdetail._id);
                    formData.append("index", index);
                    formData.append(`inGameName`, player.inGameName);
                    formData.append(`inGameID`, player.inGameID);
                    formData.append(`playerLogo`, player.playerLogo);
                    formData.append(`playerId`, player.playerId);

                    try {
                        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}classicplayerupdate`, {
                            method: "POST",
                            body: formData
                        });
                        const vfdvdf = await responsee.json();
                        // console.log(vfdvdf)
                        if (responsee.ok) {
                            // toast.success(vfdvdf.message, { autoClose: 3300 });
                        }
                    } catch (error) {
                        toast.error(error.message, { autoClose: 1800 });
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
            playerId: generateRandomString()
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
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                            value={inp.teammobile} onChange={realhandlechange} label="Mobile" variant="outlined" />
                            <TextField size="small" id="outlined-basic" name="teamdiscord" value={inp.teamdiscord} onChange={realhandlechange} label="Discord ID" variant="outlined" />
                        </Box>

                        <h4>Set a logo for the Team* </h4>
                        <div id="teamlogo"><img src={inp.selectedTeamLogo || group1} alt="team logo" /></div>
                        <Button sx={{ mb: 3 }} component="label" variant="contained" startIcon={<MdCloudUpload />}>
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
                                <h4>Player {index + 1} <MdDelete title={'Delete This'} onClick={() => deleteplayer(index)} /> </h4>
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
                                    <div id={`playerLogo${index}`}> <img src={inp?.players[index]?.playerLogo || user} alt="playerLogo" /></div>
                                    <Button component="label" variant="contained" startIcon={<MdCloudUpload />}>
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
                            <Button sx={{ mb: 2 }} onClick={addnewplayer} startIcon={<IoMdAdd />} disabled={disable} variant="outlined" color="primary">
                                Add player
                            </Button></div>
                        <Button sx={{ mr: 2, mb: 1 }} type="submit" startIcon={<MdCloudUpload />} disabled={disable} variant="contained" color="primary">
                            Save Team
                        </Button>
                        <Button sx={{ mb: 1 }} onClick={() => setcalledit(false)} startIcon={<IoMdCloseCircle />} disabled={disable} variant="outlined" color="secondary">
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
