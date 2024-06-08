import TextField from '@mui/material/TextField';
import "./detail.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import useImageUpload from '../../utils/imageresizer';
import { toast } from "react-toastify";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from 'react';
import { tdmfetch } from '../../../store/tdm';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Detail = () => {
    const { handleImage } = useImageUpload();
    const dispatch = useDispatch();
    const tdmrtk = useSelector((state) => state.tdm);
    const [loading, setLoading] = useState(false);
    const init = {
        tid: tdmrtk.tdmdetail._id || "",
        title: tdmrtk.tdmdetail.title || "",
        organiser: tdmrtk.tdmdetail.organiser || "",
        slots: tdmrtk.tdmdetail.slots || "",
        type: tdmrtk.tdmdetail.type || "",
        banner: tdmrtk.tdmdetail.tournment_banner || "",
        logo: tdmrtk.tdmdetail.tournment_logo || "",
        status: tdmrtk.tdmdetail.status || "",
        visibility: tdmrtk.tdmdetail.visibility || false,
        label: tdmrtk.tdmdetail.label || "",
        slotCategory: tdmrtk.tdmdetail.slotCategory || [{
            category: "All",
            slots: tdmrtk.tdmdetail.slots
        }]
    }
    const [inp, setinp] = useState(init);
    const handleChange = (e) => {
        let naam = e.target.name;
        let value = e.target.value;
        setinp({
            ...inp, [naam]: value
        })
    }
    useEffect(() => {
        // console.log(inp);
        // console.log(tdmrtk);
    })
    const upload = async (id) => {
        setLoading(true);
        let konsa = 0;
        let oldimage = "";
        id == "tournbanner" ? konsa = 1 : konsa = 2;
        let newimage = document.querySelector(`#${id}`).files[0];

        if (konsa == 2) {
            newimage = await handleImage(250, newimage);
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
        // console.log("sseing",inp.tid);

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
            // console.log(resuke);
            setLoading(false);
            if (!rese.ok) {
                return toast.update(ide, { render: resuke.message, type: "warning", isLoading: false, autoClose: 1600 });
            }

            dispatch(tdmfetch(inp.tid));
            konsa == 1 ? setinp({ ...inp, banner: resuke.url }) : setinp({ ...inp, logo: resuke.url });
            toast.update(ide, { render: resuke.message, type: "success", isLoading: false, autoClose: 1600 });
        } catch (error) {
            console.log(error);
            toast.update(ide, { render: resuke.message, type: "warn", isLoading: false, autoClose: 1600 });
        }
    }

    const submit = async () => {
        let slotTaken = 0;
        inp.slotCategory.map((val) => {
            // console.log(val.slots);
            slotTaken += val.slots
        })
        if(slotTaken > inp.slots){
          return  toast.warn("Catergory slots can't be more than Total slots",{autoClose:2200})
        }
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
            //   console.log(data);
            setLoading(false);
            if (responsee.ok) {
                toast.update(ide, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
                dispatch(tdmfetch(inp.tid));
            } else {
                toast.update(ide, { render: data.message, type: "warn", isLoading: false, autoClose: 1600 });
            }

        } catch (error) {
            setLoading(false);
            toast.update(ide, { render: data.message, type: "warn", isLoading: false, autoClose: 1600 });
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


    const addnewcategory = () => {
        // console.log(inp.players.length, ":", all.max_player);
        // let playerlen = inp.players.length;
        let slotTaken = 0;
        inp.slotCategory.map((val) => {
            // console.log(val.slots);
            slotTaken += val.slots
        })
        let availableSlots = inp.slots;
        if (1 == 1) {
            const newcategory = {
                category: "",
                slots: parseInt(availableSlots - slotTaken)
            };

            setinp(prevState => ({
                ...prevState,
                slotCategory: [...prevState.slotCategory, newcategory],
            }));
        } else {
            toast.warn(`Max of ${all.max_player} Palyers are Allowed`, { autoClose: 2100 })
        }
    }
    const handleCaterogyChange = (event, index, field) => {
        let { value } = event.target;
        if(field =="slots" && value != ""){
            value = parseInt(value)
        }
        // console.log(value);
        const updatedInp = [...inp.slotCategory];
        updatedInp[index] = {
            ...updatedInp[index],
            [field]: value
        };
        setinp({
            ...inp, slotCategory: updatedInp
        });
    };
    const deletecategory=(index)=>{
         let vdf = inp.slotCategory.filter((val,ind)=>{
            return ind !=index;
         })
         setinp({...inp, slotCategory:vdf})
    }
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


                    <div className="category">
                        <h4>Choose Category</h4>
                        {
                            inp.slotCategory.map((val, index) => {
                                return <div className="child" key={index}>
                                    <TextField size="small" sx={{ width: "115px" }} value={val.category} onChange={(e) => handleCaterogyChange(e, index, 'category')} label="Category" variant="outlined" />
                                    <TextField size="small"
                                        value={val.slots}
                                        inputProps={{ minLength: 5, maxLength: 15 }}
                                        type='tel'
                                        sx={{ width: "85px" }}
                                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                        onChange={(e) => handleCaterogyChange(e, index, 'slots')} label="Max. slots" variant="outlined"
                                    />
                                    <DeleteIcon sx={{ width: "25px" }} className="DeleteIcon" onClick={() => deletecategory(index)} />
                                </div>
                            })
                        }
                        <Button title="Add New Category" size='small' onClick={addnewcategory} startIcon={<AddIcon />} variant="outlined" color="primary">
                            Add
                        </Button>
                    </div>



                    <FormControl size='small' sx={{ m: 1, Width: "98%" }}>
                        <InputLabel id="demo-simple-select-helper-label">Type*</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={inp.type}
                            label="type "
                            name='type'
                            disabled
                            onChange={handleChange}
                        >
                            <MenuItem value='classic'>Classic</MenuItem>
                            <MenuItem value='tdm'>TDM</MenuItem>
                        </Select>
                        <FormHelperText>The type: Classic or TDM</FormHelperText>
                    </FormControl>
                    <FormControl size='small' sx={{ m: 1, Width: "96%" }}>
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
                    <FormControl size='small' sx={{ m: 1, Width: "96%" }}>
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
                        <FormHelperText>Should your tournament be visible in website'stournament list?</FormHelperText>
                    </FormControl>
                    <TextField
                        helperText="Add labels to your tournament, keep it short"
                        id="demo-helper-text-misaligned"
                        label="Label"
                        sx={{ m: 1, width: '96%' }}
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