import './contactinfo.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { IoArrowDownOutline } from "react-icons/io5";
import { IoArrowUpOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useParams } from "react-router-dom";
import { classicfetch } from '../../../../store/classic';

const Contactinfo = ({ all }) => {
    const dispatch = useDispatch();
    const init = {
        link: Array(1).fill({
            linkName: "",
            linkType: "",
            link: ""
        }),
    }
    const { tid } = useParams();
    const [isloading, setisloading] = useState(false)
    const [links, setlinks] = useState(init.link)
    const [publicpost, setpublicpost] = useState(all.publicpost);
    useEffect(() => {
        // console.log(all);
        bfbbgb();
    }, [])
    const bfbbgb = () => {
        if (all.links.length > 0) {
            let temp = []
            all.links.map((val) => {
                let fvfv = {
                    linkName: val.linkName,
                    linkType: val.linkType,
                    link: val.link
                }
                temp.push(fvfv)
            })
            setlinks(temp);
        }
    }
    const addsection = () => {
        setlinks([...links, {
            linkName: "",
            linkType: "",
            link: ""
        }])
    }
    const removesection = (index) => {
        // console.log(index);
        let ghh = links.filter((val, ind) => {
            return index != ind
        })
        setlinks(ghh);
    }
    const handlee = (e, indexe, field) => {
        let fcuk = [...links]
        fcuk[indexe] = {
            ...fcuk[indexe],
            [field]: e.target.value
        }
        setlinks(fcuk)
    }
    const submite = async (e) => {
        e.preventDefault();
        setisloading(true);
        const token = localStorage.getItem("token");
        try {
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}updatetournamentformcontacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ tid: all.tournament_id, links, publicpost })
            })
            const data = await rese.json();
            if (!rese.ok) {
                toast.warn(data.message, { autoClose: 1300 });
                setisloading(false)
                return;
            }
            dispatch(classicfetch(tid))
            setisloading(false)
            toast.success(data.message, { autoClose: 1800 });

        } catch (error) {
            toast.warn(error.message, { autoClose: 1800 });
            console.log(error);
        }
    }
    const positiondown = (index, kya) => {
        let kyakarna = kya == "dec" ? index + 1 : index - 1;
        // Create a shallow copy of the links array
        const updatedLinks = [...links];

        // Remove the element at the specified index and store it in thisobj
        const removedElement = updatedLinks.splice(index, 1)[0];

        // Insert the removed element at the new position
        updatedLinks.splice(kyakarna, 0, removedElement);

        // Update the state with the modified array
        setlinks(updatedLinks);
    }
    let helpere = {
        whatsapp: "Provide Whatsapp No.",
        instagram: "Provide only Instagram userId (not full Link)",
        phone: "Provide phone no.",
        link: "Provide Website Link",
        email: "Provide Email"
    }

    return (
        <>
            <div className="contactinfo">
                <div className="form">
                    <form onSubmit={submite}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Public Post"
                            multiline
                            inputProps={{ style: { fontSize: 11, lineHeight: "12px" } }}
                            value={publicpost}
                            onChange={(e) => setpublicpost(e.target.value)}
                            sx={{ width: "98%", mt: 1, mb: 1 }}
                            rows={10}
                        />
                        <h2>Contact Links</h2>
                        {links.map((val, ind) => {
                            return <section key={ind}>
                                <Stack direction="row" spacing={2}>
                                    <FormControl sx={{ width: "50%" }} size='small' >
                                        <InputLabel id="demo-simple-select-label">Link Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={links[ind].linkType}
                                            label="Link Type"
                                            required
                                            onChange={(e) => handlee(e, ind, 'linkType')}
                                        >
                                            <MenuItem value="whatsapp"> Whatsapp No.</MenuItem>
                                            <MenuItem value="instagram">Instagram</MenuItem>
                                            <MenuItem value="phone">Phone</MenuItem>
                                            <MenuItem value="link"> Link</MenuItem>
                                            <MenuItem value="email">Email</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField size='small' required value={val.linkName} onChange={(e) => handlee(e, ind, "linkName")} sx={{ width: "50%" }} id="outlined-basic" label="Link Name" variant="outlined" />
                                </Stack>
                                <Stack direction="row" sx={{ mt: 2 }} spacing={2}>
                                    <TextField required
                                        value={val.link}
                                        onChange={(e) => handlee(e, ind, "link")}
                                        fullWidth id="outlined-basic"
                                        onKeyPress={(event) => {
                                            if ((links[ind].linkType === "whatsapp" || links[ind].linkType === "phone") && !/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        inputProps={{
                                            maxLength: links[ind].linkType === "whatsapp" || links[ind].linkType === "phone" ? 10 : undefined,
                                        }}
                                        type={(links[ind].linkType === "whatsapp" || links[ind].linkType === "phone") ? "tel" : "text"}
                                        label={helpere[links[ind].linkType]}
                                        helperText={val.link ? `Just ${helpere[links[ind].linkType]}` : ""}
                                        FormHelperTextProps={{
                                            style: {
                                                color: links[ind].linkType === 'phone' && links[ind].link.length !== 10 ? 'red' : '#0abde3',
                                            },
                                        }}
                                        size='small'
                                        color={links[ind].linkType == 'phone' && links[ind].link.length != 10 ? "error" : 'primary'}
                                        variant="outlined"
                                    />
                                </Stack>
                                <Stack direction="row" sx={{ mt: 1 }} spacing={2}>
                                    <MdDelete title='Delete Field' className='options' onClick={() => removesection(ind)} />
                                    <IoArrowDownOutline title='Move Down' className='options' onClick={() => positiondown(ind, "dec")} />
                                    <IoArrowUpOutline title='Move Up' className='options' onClick={() => positiondown(ind, "inc")} />
                                </Stack>
                            </section>
                        })}


                        <Stack direction="row" sx={{ mt: 1 }} spacing={2}>
                            <Button size='small' startIcon={<FaPlus />} onClick={addsection} variant="outlined" >
                                ADD
                            </Button>
                        </Stack>
                        <Stack direction="row" sx={{ mt: 1 }} spacing={2}>
                            <LoadingButton
                                type='submit'
                                loading={isloading}
                                loadingPosition="start"
                                startIcon={<MdDescription />}
                                variant="contained"
                            >
                                SUBMIT
                            </LoadingButton>
                        </Stack>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Contactinfo;