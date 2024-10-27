import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './user.css'
import swal from 'sweetalert';
import LoadingButton from '@mui/lab/LoadingButton';
import { IoMdRefresh } from "react-icons/io";
import { Users } from "../../../store/admin";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaSave } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { IoMailOutline } from "react-icons/io5";
import Modalbox from "../../../components/custommodal/Modalbox";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

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

    const mailinit = {
        email: '',
        message: '',
    }
    const [mailinp, setmailinp] = useState(mailinit)

    useEffect(() => {
        // console.log(admin.users);
    }, [])
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: '2-digit' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate.replace(/(\d{2} \w{3}) (\d{2})/, '$1, $2'); 
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
                    toast.update(toaste, { render: error.message, type: "warn", isLoading: false, autoClose: 5200 });
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
    const [mailmodal, setmailmodal] = useState(false);

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
            toast.error(error.message, { autoClose: 1900 })
            console.log(error);
            setmodal(false);
        }
    }
    const mailhandlee = async (e) => {
        e.preventDefault();
        // console.log(mailinp)
        const formattedMessage = mailinp.message.replace(/\n/g, '<br />');
        try {
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}emailsend`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: mailinp.email,
                    reply: formattedMessage
                })
            });
            const data = await responsee.json();
            // console.log(data);
            setmailmodal(false)
            if (responsee.status == 200) {
                setmailinp(mailinit);
                toast.success(data.message, { autoClose: 1300 });
            } else {
                toast.warn(data.message, { autoClose: 1500 });
            }
        } catch (error) {
            console.log(error);
            setmailmodal(false)
            toast.error(error.message, { autoClose: 1900 })
        }
    }
    const actione = (val) => {
        // console.log(val);
        setinp({
            id: val._id,
            name: val.name,
            phone: val.phone,
            isverified: val.isverified,
            isadmin: val.isadmin
        })
        setmodal(true);
    }
    const mail = (val) => {
        console.log(val);
        setmailinp({
            email: val.email,
            message: '',
        })
        setmailmodal(true);
    }
    const handleChange = (e, field) => {
        setinp({
            ...inp, [field]: e.target.value
        })
    }
    const handlemailChange = (e, field) => {
        setmailinp({
            ...mailinp, [field]: e.target.value
        })
    }

    return <>
        <div className="adminusers">
            <div className="controler">
                <h2 style={{ textAlign: 'center' }}>Users</h2>
                <LoadingButton
                    loading={userprofile.loading}
                    onClick={() => dispatch(Users())}
                    loadingPosition="end"
                    endIcon={<IoMdRefresh />}
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
            <div className="body">
                {admin?.users?.map((val, ind) => {
                    return <div key={ind} className={`status ${val.membership?.isActive ? 'active' : 'expired'}`}>
                        <span>{ind + 1}</span>
                        <span>{val.name}</span>
                        <span>{val.phone}</span>
                        <span>{val.email}</span>
                        <span>{formatDate(val.createdAt)}</span>
                        <span>
                            <HiPencilSquare className='editicon ico' title="Edit" onClick={() => actione(val)} />
                            <IoMailOutline className='printicon ico' title="Mail" onClick={() => mail(val)} />
                            <RiDeleteBin6Line className='deleteicon ico' title="Delete" onClick={() => Deletee(val._id)} />
                        </span>
                    </div>
                })}
            </div>
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
                                <Button startIcon={<FaSave />} type="submit" variant="contained"> Update</Button>
                                <Button onClick={() => { setmodal(false); setinp(init) }} variant="outlined"> cancel</Button>
                            </div>
                        </span>
                    </form>
                </div>
            </Modalbox>
            <Modalbox open={mailmodal} onClose={() => setmailmodal(false)}>
                <div className="membermodal mail">
                    <form onSubmit={mailhandlee}>
                        <h2>Send Email</h2>
                        <span className="modalcontent">
                            <TextField required value={mailinp.email}
                                sx={{ width: '98%' }}
                                label="Email Id"
                                disabled
                                size="small" />
                            <TextField required value={mailinp.message}
                                onChange={(e) => handlemailChange(e, 'message')}
                                sx={{ width: '98%' }}
                                multiline rows={5}
                                label="Message"
                                size="small" />

                            <div style={{ width: '100%' }}>
                                <Button startIcon={<SiMinutemailer />} type="submit" variant="contained"> Send</Button>
                                <Button onClick={() => { setmailmodal(false); setmailinp(mailinit) }} variant="outlined"> cancel</Button>
                            </div>
                        </span>
                    </form>
                </div>
            </Modalbox>
        </div>
    </>
}
export default User;