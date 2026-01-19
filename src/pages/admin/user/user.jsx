import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useCustomStyles } from "../backups/AllDbModal";
import { Avatar, Box } from "@mui/material";


const User = () => {
    const admin = useSelector((state) => state.admin);
    const userprofile = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        // console.log(val);
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

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: "Name",
            cell: (row) => (
                <Box
                    onClick={() => navigate(`/channel/@${row.username}`)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        "&:hover span": {
                            color: "primary.main",
                        },
                    }}
                >
                    <Avatar
                        src={row.imgsrc}
                        alt={row.name}
                        sx={{ width: 32, height: 32 }}
                    >
                        {!row.imgsrc && row.name?.[0]}
                    </Avatar>

                    <span>{row.name}</span>
                </Box>
            ),
        },
        {
            name: "Mobile",
            selector: (row) => row.phone
        },
        {
            name: "Email",
            selector: (row) => row.email
        },
        {
            name: "Date",
            selector: (row) => formatDate(row.createdAt),
            width: '80px'
        },
        {
            name: "Member Stat",
            selector: (row) => row?.membership?.isActive ? '✅ Active' : '❌ Expired',
            width: '100px'
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-2 lg:gap-1">
                    <HiPencilSquare className='editicon ico' title="Edit" onClick={() => actione(row)} />
                    <IoMailOutline className='printicon ico' title="Mail" onClick={() => mail(row)} />
                    <RiDeleteBin6Line className='deleteicon ico' title="Delete" onClick={() => Deletee(row._id)} />
                </div>
            ),
            width: '120px',
            ignoreRowClick: true,
        }
    ]

    return <>
        <div className="adminusers p-1">
            <div className="controler flex flex-col items-center gap-2 py-[5px] sm:flex-row sm:justify-between">
                <h2 className="text-center text-xl font-semibold sm:text-left">
                    Users
                </h2>

                <LoadingButton
                    loading={userprofile.loading}
                    onClick={async () => {
                        try {
                            await dispatch(Users()).unwrap();
                            toast.success('Refreshed!', { autoClose: 900 });
                        } catch {
                            toast.error('Failed to refresh!');
                        }
                    }}
                    loadingPosition="end"
                    endIcon={<IoMdRefresh />}
                    variant="outlined"
                    type="submit"
                    size="small"
                >
                    REFRESH
                </LoadingButton>
            </div>

            <DataTable
                columns={columns}
                data={admin?.users}
                pagination
                highlightOnHover
                customStyles={useCustomStyles()}
            />

            <Modalbox open={modal} onClose={() => setmodal(false)}>
                <div className="content w-100">
                    <p className="header">User Detail</p>
                    <div className="modalbody">
                        <form id="form" onSubmit={handlee}>
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
                        </form>
                    </div>
                    <div className="modalfooter">
                        <Button startIcon={<FaSave />} form='form' type="submit" variant="contained"> Update</Button>
                        <Button onClick={() => { setmodal(false); setinp(init) }} variant="outlined"> cancel</Button>
                    </div>
                </div>
            </Modalbox>

            <Modalbox open={mailmodal} onClose={() => setmailmodal(false)}>
                <div className="content w-100 mail">
                    <p className="header">User Detail</p>
                    <div className="modalbody">
                        <form id="form" onSubmit={mailhandlee}>
                            <TextField required value={mailinp.email}
                                sx={{ width: '98%' }}
                                label="Email Id"
                                disabled
                                size="small" />
                            <TextField required value={mailinp.message}
                                onChange={(e) => handlemailChange(e, 'message')}
                                sx={{ width: '98%' }}
                                multiline rows={8}
                                label="Message"
                                size="small" />
                        </form>
                    </div>

                    <div className="modalfooter">
                        <Button startIcon={<SiMinutemailer />} form="form" type="submit" variant="contained"> Send</Button>
                        <Button onClick={() => { setmailmodal(false); setmailinp(mailinit) }} variant="outlined"> cancel</Button>
                    </div>
                </div>
            </Modalbox>
        </div>
    </>
}
export default User;