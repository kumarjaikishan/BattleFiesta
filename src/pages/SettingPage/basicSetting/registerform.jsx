import { useEffect, useState } from "react";
import "./registerform.css";
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setloader } from "../../../store/login";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TournaFormSetting from "./formSetting/TournaFormSetting";
import PendingPage from "./pendinglist/Pending";
import ApprovedPage from "./Approvedpage/ApprovedPage";
import RejectedPage from "./rejectedpage/rejectedpage";
import Contactinfo from "./contactinfo/contactinfo";
import Badge from '@mui/material/Badge';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Button from '@mui/material/Button';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Registerform = ({ setting, showss }) => {
    const tid = setting._id;
    const dispatch = useDispatch();
    const tournacenter = useSelector((state) => state.tournacenter);
    const init = {
        tid: "",
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
        show_payment: "",
        amount: "",
        upi_id: "",
        min_player: "",
        max_player: "",
        links: '',
        publicpost: ''
    }
    const [all, setall] = useState(init);
    const [isloading, setisloading] = useState(false)

    useEffect(() => {
        dispatch(setloader(true));
        tid && fetche();
    }, [])

    const [active, setactive] = useState(0);
    const [playerList, setPlayerlist] = useState([]);
    const [pendingplayer, setpendingplayer] = useState([]);
    const [approvedPlayer, setapprovedPlayer] = useState([]);
    const [rejectedplayer, setrejectedplayer] = useState([]);

    const fetche = async () => {
        dispatch(setloader(true));
        const url = `${import.meta.env.VITE_API_ADDRESS}tournamentform`;
        const method = 'POST';
        const body = { tid };

        const successAction = (data) => {
            // toast.success(data.message, { autoClose: 1300 });
            const actualdata = data.data;
            // console.log("settingpage",data);
            setPlayerlist(data.entry)
            sortplayerdata(data.entry)
            setall({
                tid: actualdata.tournament_id,
                id: actualdata._id,
                isopen: actualdata.isopen,
                description: actualdata.description,
                success_msg: actualdata.success_message,
                ask_email: actualdata.ask_email,
                ask_phone: actualdata.ask_phone,
                ask_discord: actualdata.ask_discord,
                ask_team_logo: actualdata.ask_teamlogo,
                ask_player_logo: actualdata.ask_playerlogo,
                ask_payment_ss: actualdata.ask_payment_ss,
                min_player: actualdata.minimum_players,
                max_player: actualdata.maximum_players,
                show_payment:actualdata.show_payment,
                amount: actualdata.amount,
                upi_id: actualdata.upi_id,
                links: actualdata.links,
                publicpost: actualdata.publicpost
            })
            dispatch(setloader(false));
        };

        // const loaderAction = (isLoading) => dispatch(setloader(isLoading));

        await apiWrapper(url, method, body, successAction);
    }
    const sortplayerdata = (data) => {
        const pend = data.filter((val, ind) => {
            return val.status == "pending"
        })
        setpendingplayer(pend);

        const appro = data.filter((val, ind) => {
            return val.status == "approved"
        })
        setapprovedPlayer(appro);

        const rejec = data.filter((val, ind) => {
            return val.status == "rejected"
        })
        setrejectedplayer(rejec);
    }

    const handleChange = (e) => {
        let naam = e.target.name;
        let value = e.target.value;
        if(e.target.value == "true"){
            value = true;
        }
        if(e.target.value == "false"){
            value = false;
        }
        setall({
            ...all, [naam]: value
        })
    }
    const submit = async (e) => {
        e.preventDefault();
        setisloading(true)
        const id = toast.loading("Please wait...")
        // console.log(all);
        const url = `${import.meta.env.VITE_API_ADDRESS}updatetournamentform`;
        const method = 'POST';
        const body = all;

        const successAction = (data) => {
            // toast.success(data.message, { autoClose: 1300 });
            toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
            setisloading(false)
        };

        // const loaderAction = (isLoading) => dispatch(setloader(isLoading));

        await apiWrapper(url, method, body, successAction);
    }
    const handleactive = (index) => {
        let alldiv = document.querySelectorAll(".form_setting .control div");
        // console.log(all[0]);
        for (let i = 0; i < alldiv.length; i++) {
            alldiv[i].classList.remove('active');
        }
        setactive(index);
        alldiv[index].classList.add("active")
    }
    const statuschange = async (teamid, value, reason) => {
        // e.preventDefault();
        const reasone = reason || "";
        const token = localStorage.getItem("token");
        // console.log(teamid, value, reasone);

        const id = toast.loading("Please wait...")
        try {
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}updateteamstatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ teamID: teamid, value, reasone })
            })
            const result = await rese.json();
            // console.log(rese);
            if (rese.ok) {
                fetche();
                toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose: 1600 });
            }

        } catch (error) {
            console.log(error);
            toast.update(id, { render: "Failed", type: "warn", isLoading: false, autoClose: 1600 });
        }
    }

    // new errorHandle
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [id, setid] = useState("")
    const [reason, setreason] = useState("");
    const handlechange = (e) => {
        setreason(e.target.value);
    }
    const decline = (ide) => {
        setid(ide)
        setreason("");
        setOpen(true);
    }
    const forward = () => {
        // console.log(id, ":", reason);
        statuschange(id, "rejected", reason)
        setOpen(false);
    }
    return (
        <>
            <div className="form_setting">
                <div className="control">
                    <div className="active" onClick={() => handleactive(0)}>
                        <SettingsSuggestIcon />
                        <h3>Setting</h3>
                    </div>
                    <div onClick={() => handleactive(1)}>
                        <PhoneEnabledIcon />
                        <h3>Contact Info</h3>
                    </div>
                    <div onClick={() => handleactive(2)}>
                        <GroupIcon />
                        <Badge min={1} badgeContent={pendingplayer.length} color="warning">
                            <h3>Pending &nbsp;</h3>
                        </Badge>
                    </div>
                    <div onClick={() => handleactive(3)}>
                        <GroupAddIcon />
                        <Badge badgeContent={approvedPlayer.length} color="success">
                            <h3>Approved &nbsp;</h3>
                        </Badge>
                    </div>
                    <div onClick={() => handleactive(4)}>
                        <PersonOffIcon />
                        <Badge badgeContent={rejectedplayer.length} color="error">
                            <h3>Rejected &nbsp;</h3>
                        </Badge>
                    </div>
                </div>
                {active == 0 && <TournaFormSetting isloading={isloading} all={all} handleChange={handleChange} submit={submit} />}
                {active == 1 && <Contactinfo all={all} handleChange={handleChange} submit={submit} />}
                {active == 2 && <PendingPage decline={decline} showss={showss} statuschange={statuschange} pendingplayer={pendingplayer} />}
                {active == 3 && <ApprovedPage decline={decline} showss={showss} statuschange={statuschange} approvedPlayer={approvedPlayer} />}
                {active == 4 && <RejectedPage decline={decline} showss={showss} statuschange={statuschange} rejectedplayer={rejectedplayer} />}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            forward();
                        },
                    }}
                >
                    {/* <DialogTitle>Reason</DialogTitle> */}
                    <DialogContent>
                        <DialogContentText>
                            Kindly Submit reason , why you are decining or Rejecting the Team
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="reason"
                            label="Reason"
                            type="text"
                            fullWidth
                            value={reason}
                            variant="standard"
                            onChange={handlechange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}
export default Registerform;