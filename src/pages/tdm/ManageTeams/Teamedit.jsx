import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { styled, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import useImageUpload from "../../utils/imageresizer";

const Teamedit = ({ teamdetail, setcalledit }) => {

    const tdmrtk = useSelector((state) => state.tdm);
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
    const [setting, setsetting] = useState(tdmrtk.tdmsetting);
    const [tdmdetail, settdmdetail] = useState(tdmrtk.tdmdetail);
    const [inp, setinp] = useState({
        userid: teamdetail.userid || "",
        tournament_id: teamdetail.tournament_id || "",
        name: teamdetail.name || "",
        InGameId: teamdetail.InGameId || "",
        mobile: teamdetail.mobile || "",
        email: teamdetail.email || "",
        os: teamdetail.os || "",
        discord: teamdetail.discord || "",
        utrno: teamdetail.utrno || "",
        fps: teamdetail.fps || "",
        device: teamdetail.device || "",
        paymentss: teamdetail.paymentss || "",
        logo: teamdetail.logo || "",
    })
    const { tid } = useParams();
    const [disable, setdisable] = useState(false);
    useEffect(() => {
        // fetche(inp);
        console.log(inp);
        // console.log(tdmrtk.tdmsetting);
    }, [])

    const [all, setall] = useState(tdmrtk.tdmsetting);


    const editTeam = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", teamdetail._id);
        formData.append("name", inp.name);
        formData.append("InGameId", inp.InGameId);
        formData.append("email", inp.email);
        formData.append("mobile", inp.mobile);
        formData.append("discord", inp.discord);
        formData.append("device", inp.device);
        formData.append("os", inp.os);
        formData.append("fps", inp.fps);
        formData.append("utrno", inp.utrno);
        // formData.append("logo", inp.logo);
        // formData.append("paymentss", inp.paymentss);

        //   console.log(inp)
        try {
            const id = toast.loading("Please wait...")
            setdisable(true);
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}playerupdate`, {
                method: "POST",
                body: formData
            });

            const responseData = await response.json();
            // console.log(responseData);
            if (response.ok) {
                toast.update(id, { render: "Updated Successfully", type: "success", isLoading: false, autoClose: 1600 });
                setdisable(false);
            } else {
                toast.error(responseData.error, { autoClose: 1300 });
            }
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again.", { autoClose: 1300 });
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

    return (
        <>
            <div className="registartionform">
                <div className="form">
                    <h2>Team Edit : {tdmdetail.title}</h2>
                    <h4>Organised by : {tdmdetail.organiser}</h4>

                    <form onSubmit={editTeam}>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}

                            autoComplete="off"
                        >
                            <TextField size="small" required id="outlined-basic" label="In Game Name" value={inp.name} name="name" onChange={realhandlechange} variant="outlined" />
                            <TextField required value={inp.InGameId}
                                type='tel'
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                size="small" id="outlined-basic" name="InGameId" label="In Game ID" onChange={realhandlechange} variant="outlined" />
                        </Box>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch', mb: 2 },
                            }}
                            autoComplete="off"
                        >
                            {setting.ask_phone && <TextField required={setting.ask_phone}
                                size="small" id="outlined-basic" name="mobile"
                                value={inp.mobile}
                                type='tel'
                                inputProps={{ minLength: 10, maxLength: 10 }}
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                onChange={realhandlechange} label="Mobile" variant="outlined"
                            // color={inp.teammobile.length == 10 ? "primary" : "warning"}
                            />}
                            {setting.ask_email && <TextField size="small" id="outlined-basic" value={inp.email} name="email" type="email" onChange={realhandlechange} label="Email ID" variant="outlined" />}

                        </Box>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch', mb: 2 },
                            }}
                        >
                            {setting.ask_os && <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Choose OS</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inp.os}
                                    name="os"
                                    label="Choose OS"
                                    onChange={realhandlechange}
                                >
                                    <MenuItem value={'android'}>Android</MenuItem>
                                    <MenuItem value={'ios'}>Ios</MenuItem>
                                </Select>
                            </FormControl>}
                            {setting.ask_discord && <TextField required size="small" id="outlined-basic" value={inp.discord} name="discord" onChange={realhandlechange} label="Discord ID" variant="outlined" />}

                        </Box>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch', mb: 2 },
                            }}
                        >
                            {setting.ask_fps && <TextField required size="small"
                                type='tel'
                                inputProps={{ minLength: 2, maxLength: 3 }}
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                id="outlined-basic" name="fps" value={inp.fps} onChange={realhandlechange} label="FPS" variant="outlined" />}
                            {setting.ask_devicename && <TextField required size="small" id="outlined-basic" name="device" value={inp.device} onChange={realhandlechange} label="Device Name" variant="outlined" />}

                        </Box>
                        <Divider variant="middle" />
                        {
                            setting.ask_playerlogo && <>
                                <h4>Set a PlayerLogo*</h4>
                                <div id="logo">
                                    {
                                        inp.logo && <img src={inp.logo} alt="" />
                                    }
                                </div>
                                <Button disabled size="small" sx={{ mb: 3 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
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
                            <div id="paymentss">
                                {
                                    inp.paymentss && <img src={inp.paymentss} alt="" />
                                }
                            </div>
                            <Button disabled size="small" sx={{ mb: 0.5, mt: 0.5 }} component="label" variant="contained" startIcon={<PhotoIcon />}>
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
