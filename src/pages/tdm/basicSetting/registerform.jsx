import { useEffect, useState } from "react";
import "./registerform.css";
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setloader } from "../../../store/login";
import TournaFormSetting from "./formSetting/TournaFormSetting";
import PendingPage from "./pendinglist/Pending";
import Modalbox from "../../../components/custommodal/Modalbox";
import ApprovedPage from "./Approvedpage/ApprovedPage";
import RejectedPage from "./rejectedpage/rejectedpage";
import Contactinfo from "./contactinfo/contactinfo";
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { MdSettingsSuggest } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { MdPersonOff } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { tdmfetch } from "../../../store/tdm";
import { useParams } from "react-router-dom";

const Registerform = ({ showss }) => {
    const dispatch = useDispatch();
    const { tid } = useParams();
    const tdmrtk = useSelector((state) => state.tdm);

    const [all, setall] = useState(tdmrtk.tdmsetting);
    const [isloading, setisloading] = useState(false)

    useEffect(() => {
        dispatch(setloader(false));
        // console.log(tdmrtk);
    }, [])
    useEffect(() => {
        sortplayerdata(tdmrtk.tdmplayers)
    }, [tdmrtk.tdmplayers])
    useEffect(() => {
        setall(tdmrtk.tdmsetting)
    }, [tdmrtk.tdmsetting])

    const [active, setactive] = useState(0);
    const [pendingplayer, setpendingplayer] = useState([]);
    const [approvedPlayer, setapprovedPlayer] = useState([]);
    const [rejectedplayer, setrejectedplayer] = useState([]);


    const sortplayerdata = (data) => {
        // console.log(data);
        if (data == '') {
            return;
        }
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
        if (e.target.value == "true") {
            value = true;
        }
        if (e.target.value == "false") {
            value = false;
        }
        setall({
            ...all, [naam]: value
        })
    }
    const submit = async (e) => {
        e.preventDefault();
        // setisloading(true)
        const id = toast.loading("Please wait...")
        // console.log(all);
        const url = `${import.meta.env.VITE_API_ADDRESS}updatetdmtournamentform`;
        const method = 'POST';
        const body = all;

        const successAction = (data) => {
            // toast.success(data.message, { autoClose: 1300 });
            // dispatch(tdmfetch(tid))
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
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}updateplayerstatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ teamID: teamid, value, reasone })
            })
            const result = await rese.json();
            // console.log(rese);
            if (!rese.ok) {
                return toast.update(id, { render: result.message, type: "warning", isLoading: false, autoClose: 1600 });
            }

            dispatch(tdmfetch(tid))
            toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose: 1600 });

        } catch (error) {
            console.log(error);
            toast.update(id, { render: "Failed", type: "warning", isLoading: false, autoClose: 1600 });
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
        if (reason === "") return toast.warn('Enter Reason', {autoClose:1800})
        statuschange(id, "rejected", reason)
        setOpen(false);
    }
    return (
        <>
            <div className="form_setting">
                <div className="control">
                    <div className="active" onClick={() => handleactive(0)}>
                        <MdSettingsSuggest />
                        <h3>Setting</h3>
                    </div>
                    <div onClick={() => handleactive(1)}>
                        <MdLocalPhone />
                        <h3>Contact Info</h3>
                    </div>
                    <div onClick={() => handleactive(2)}>
                        <MdGroup />
                        <Badge min={1} badgeContent={pendingplayer.length} color="warning">
                            <h3>Pending &nbsp;</h3>
                        </Badge>
                    </div>
                    <div onClick={() => handleactive(3)}>
                        <FaUserCheck />
                        <Badge badgeContent={approvedPlayer.length} color="success">
                            <h3>Approved &nbsp;</h3>
                        </Badge>
                    </div>
                    <div onClick={() => handleactive(4)}>
                        <MdPersonOff />
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

                <Modalbox
                    shadow={false}
                    open={open}
                    onClose={handleClose}>
                    <div className="dashboardbox" style={{ background: 'white' }}>
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
                            <Button onClick={forward}>Submit</Button>
                        </DialogActions>
                    </div>
                </Modalbox>
            </div>
        </>
    )
}
export default Registerform;