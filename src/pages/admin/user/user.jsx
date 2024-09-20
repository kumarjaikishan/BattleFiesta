import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './user.css'
import swal from 'sweetalert';
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Users } from "../../../store/admin";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { motion } from 'framer-motion';
import Modalbox from "../../../components/custommodal/Modalbox";

const User = () => {
    const admin = useSelector((state) => state.admin);
    const userprofile = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const init = {
        id: '',
        name: '',
        phone: '',
        isverified: '',
        isadmin: ''
    }
    const [inp, setinp] = useState(init)

    useEffect(() => {
        // console.log(admin);
    }, [])
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };
    const Deletee = async (userid) => {
        // console.log(userid);
        swal({
            title: 'Are you sure?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const toaste = toast.loading("Please wait...")
                try {
                    const token = localStorage.getItem("token");
                    const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}deleteuser`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ userid })
                    });
                    const data = await responsee.json();
                    // console.log(data);
                    if (responsee.ok) {
                        dispatch(Users())
                        toast.update(toaste, { render: data.message, type: "success", isLoading: false, autoClose: 2100 });
                    } else {
                        return toast.update(toaste, { render: data.message, type: "warn", isLoading: false, autoClose: 2100 });
                    }
                } catch (error) {
                    toast.update(toaste, { render: data.message, type: "warn", isLoading: false, autoClose: 5200 });
                    console.log(error);
                }
            } else {
                // swal('Your data is safe!');
            }
        });

        if (!userid) {
            return toast.warn('UserId cannot be blank')
        }

    }

    const [modal, setmodal] = useState(false);

    const handlee = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}editUser`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inp)
            });
            const data = await responsee.json();
            // console.log(data);
            setmodal(false);
            if (responsee.status == 200) {
                dispatch(Users());
                setinp(init);
                toast.success(data.message, { autoClose: 1300 });
            } else {
                toast.warn(data.message, { autoClose: 1500 });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const actione = (val) => {
        console.log(val);
        setinp({
            id: val._id,
            name: val.name,
            phone: val.phone,
            isverified: val.isverified,
            isadmin: val.isadmin
        })
        setmodal(true);
    }
    const handleChange = (e, field) => {
        setinp({
            ...inp, [field]: e.target.value
        })
    }
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: .2, //this is overall delay for whole children
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { x: -80, y: 80, opacity: 0, scale: 0 },
        visible: { y: 0, x: 0, scale: 1, opacity: 1 }
    };
    return <>
        <motion.div className="adminusers">
            <div className="controler">
                <h2 style={{ textAlign: 'center' }}>Users</h2>
                <LoadingButton
                    loading={userprofile.loading}
                    onClick={() => dispatch(Users())}
                    loadingPosition="end"
                    endIcon={<RefreshIcon />}
                    variant="outlined"
                    type="submit"
                    size="small"
                    className="refreshe"
                >
                    REFRESH
                </LoadingButton>
            </div>
            <div className="header">
                <span>#</span>
                <span>Name</span>
                <span>Mobile</span>
                <span>Email</span>
                <span>Date</span>
                <span>Actions</span>
            </div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                layout
                className="body">
                {admin?.users?.map((val, ind) => {
                    return <motion.div variants={item} layout key={ind}>
                        <span>{ind + 1}</span>
                        <span>{val.name}</span>
                        <span>{val.phone}</span>
                        <span>{val.email}</span>
                        <span>{formatDate(val.createdAt)}</span>
                        <span><i className="fa fa-pencil" onClick={() => actione(val)} aria-hidden="true"></i>
                            <i className="fa fa-trash" onClick={() => Deletee(val._id)} aria-hidden="true"></i></span>
                    </motion.div>
                })}
            </motion.div>
            <Modalbox open={modal} onClose={() => setmodal(false)}>
                <div className="membermodal">
                    <form onSubmit={handlee}>
                        <h2>User Detail</h2>
                        <span className="modalcontent">
                            <TextField required value={inp.name} onChange={(e) => handleChange(e, 'name')} sx={{ width: '98%' }} label="Name" size="small" />
                            <TextField type="tel" required value={inp.phone} onChange={(e) => handleChange(e, 'phone')} sx={{ width: '98%' }} label="Mobile"
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                size="small" />
                            <FormControl sx={{ width: '98%' }} size="small">
                                <InputLabel id="demo-simple-select-label">Verify</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inp.isverified}
                                    label="status"
                                    onChange={(e) => handleChange(e, 'isverified')}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: '98%' }} size="small">
                                <InputLabel id="demo-simple-select-label">Admin</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inp.isadmin}
                                    label="status"
                                    onChange={(e) => handleChange(e, 'isadmin')}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                            <div style={{ width: '100%' }}>
                                <Button size="small" type="submit" variant="contained"> Update</Button>
                                <Button size="small" onClick={() => { setmodal(false); setinp(init) }} variant="outlined"> cancel</Button>
                            </div>
                        </span>
                    </form>
                </div>
            </Modalbox>
        </motion.div>
    </>
}
export default User;