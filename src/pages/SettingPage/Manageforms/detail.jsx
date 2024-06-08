import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useSelector, useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import "./detail.css";
import useImageUpload from '../../utils/imageresizer';
import { toast } from "react-toastify";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from 'react';
import { classicfetch } from '../../../store/classic';

const Detail = () => {
    const classic = useSelector((state) => state.classic);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // console.log(classic.classicdetail);
    }, [])
    const init = {
        tid: classic.classicdetail._id,
        title: classic.classicdetail.title,
        organiser: classic.classicdetail.organiser,
        slots: classic.classicdetail.slots,
        type: classic.classicdetail.type,
        banner: classic.classicdetail.tournment_banner,
        logo: classic.classicdetail.tournment_logo,
        status: classic.classicdetail.status,
        visibility: classic.classicdetail.visibility,
        label: classic.classicdetail.label
    }
    const [inp, setinp] = useState(init);
    const { handleImage } = useImageUpload();

    const handleChange = (e) => {
        let naam = e.target.name;
        let value = e.target.value;
        setinp({
            ...inp, [naam]: value
        })
    }
    const upload = async (id) => {
        setLoading(true);
        let konsa = 0;
        let oldimage = "";
        id == "tournbanner" ? konsa = 1 : konsa = 2;
        let newimage = document.querySelector(`#${id}`).files[0];

        if (konsa == 2) {
            newimage = await handleImage(200, newimage);
        }else{
            newimage = await handleImage(700, newimage);
        }

        if (konsa == 1) {
            oldimage = inp.banner;
        } else {
            oldimage = inp.logo
        }
        let data = new FormData();

        data.append('tid', inp.tid)
        data.append('filed', id)
        data.append('image', newimage)
        data.append('oldimage', oldimage)
        // console.log("sseing",data.tid);

        const token = localStorage.getItem("token");
        const ide = toast.loading("Please wait while Uploading...")
        try {
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}settournamentlogos`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: data
            })
            const resuke = await rese.json();
            console.log(resuke);
            if (rese.ok) {
                konsa == 1 ? setinp({ ...inp, banner: resuke.url }) : setinp({ ...inp, logo: resuke.url });
                toast.update(ide, { render: "Uploaded Successfully", type: "success", isLoading: false, autoClose: 1600 });
                setLoading(false);
                dispatch(classicfetch(classic.classicdetail._id));
            } else {
                toast.update(ide, { render: resuke.message, type: "warning", isLoading: false, autoClose: 1600 });
            }
        } catch (error) {
            console.log(error);
            toast.update(ide, { render: error.message, type: "warning", isLoading: false, autoClose: 1600 });
        }
    }
    const submit = async () => {
        setLoading(true);
        try {
            const ide = toast.loading("Please wait...")
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}settournament`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inp)
            });
            const data = await responsee.json();
            // console.log(data);  

            if (responsee.ok) {
                toast.update(ide, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
                setLoading(false);
                dispatch(classicfetch(classic.classicdetail._id));
            } else {
                toast.update(ide, { render: data.message, type: "warning", isLoading: false, autoClose: 1600 });
            }
            setLoading(false);
        } catch (error) {
            toast.update(ide, { render: data.message, type: "warning", isLoading: false, autoClose: 1600 });
            setLoading(false);
            console.log(error);
        }
    }
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
    return (
        <>
            <div className="tournawrapper">
                <div className="tournainfo">
                    <h2>Tournament Info</h2>

                    <TextField
                        helperText="Name of your tournament"
                        id="demo-helper-text-misaligned"
                        label="Tournament Name*"
                        sx={{ m: 1, mt: 2 }}
                        size='small'
                        value={inp.title}
                        name='title'
                        onChange={handleChange}
                    />
                    <TextField
                        helperText="Organiser Name of your tournament"
                        id="demo-helper-text-misaligned"
                        label="Organiser*"
                        sx={{ m: 1 }}
                        size='small'
                        name='organiser'
                        value={inp.organiser}
                        onChange={handleChange}
                    />
                    <TextField
                        helperText="Max. Slots for your tournament"
                        id="demo-helper-text-misaligned"
                        label="Slots*"
                        sx={{ m: 1 }}
                        size='small'
                        type='tel'
                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                        name='slots'
                        value={inp.slots}
                        onChange={handleChange}
                    />


                    <FormControl size='small' sx={{ m: 1, mb: 1.5, Width: "98%" }}>
                        <InputLabel id="demo-simple-select-helper-label">Type*</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={inp.type}
                            label="type "
                            name='type'
                            onChange={handleChange}
                        >
                            <MenuItem value='classic'>Classic</MenuItem>
                            <MenuItem value='tdm'>TDM</MenuItem>
                        </Select>
                        <FormHelperText>The type: Classic or TDM</FormHelperText>
                    </FormControl>
                    <FormControl size='small' sx={{ m: 1,mb:1.5, Width: "96%" }}>
                        <InputLabel id="demo-simple-select-helper-label">Status*</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={inp.status}
                            label="Status"
                            name='status'
                            onChange={handleChange}
                        >
                            <MenuItem value={"upcoming"}>UPCOMING</MenuItem>
                            <MenuItem value={"ongoing"}>ONGOING</MenuItem>
                            <MenuItem value={"completed"}>COMPLETED</MenuItem>
                        </Select>
                        <FormHelperText>Status of your tournament</FormHelperText>
                    </FormControl>
                    <FormControl size='small' sx={{ m: 1, mb:1.5, Width: "96%" }}>
                        <InputLabel id="demo-simple-select-helper-label">Visibility*</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={inp.visibility}
                            label="Visibility"
                            name='visibility'
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>PUBLISHED</MenuItem>
                            <MenuItem value={false}>HIDDEN</MenuItem>
                        </Select>
                        <FormHelperText>Tournament visible to Public in 'Find Tournament' Section?</FormHelperText>
                    </FormControl>
                    <TextField
                        helperText="Add labels to your tournament, keep it short"
                        id="demo-helper-text-misaligned"
                        label="Label"
                        sx={{ m: 1 }}
                        size='small'
                        name='label'
                        value={inp.label}
                        onChange={handleChange}
                    />

                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<CloudUploadIcon />}
                        variant="contained"
                        onClick={submit}
                    >
                        UPDATE
                    </LoadingButton>
                </div>
                <div className="right">
                    <div className="logos">
                        <div className="tourn_banner">
                            <h2>Tournament Banner</h2>
                            {inp.banner ? <img src={inp.banner} alt="" /> : <h3>No Banner has been uploaded for the tournament</h3>}
                            <Button disabled={loading} component="label" size='small' variant="contained"
                                startIcon={<CloudUploadIcon />}>
                                Upload
                                <VisuallyHiddenInput accept="image/*" type="file" id='tournbanner' onChange={() => upload("tournbanner")} />
                            </Button>
                            <p>A cover image for the tournament.</p>
                        </div>
                        <div className="tourna_logo"><h2>Tournament Logo</h2>
                            {inp.logo ? <img src={inp.logo} alt="" /> : <h3>No Logo has been uploaded for the tournament</h3>}
                            <Button disabled={loading} component="label" size='small' variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload
                                <VisuallyHiddenInput accept="image/*" type="file" id='tournlogo' onChange={() => upload("tournlogo")} />
                            </Button>
                            <p>Tips: The Image should be in Square</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detail