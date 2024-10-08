import { useEffect, useState } from "react";
import './voucher.css'
import { useSelector, useDispatch } from "react-redux";
import { voucher } from "../../../store/admin";
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modalbox from "../../../components/custommodal/Modalbox";
import { FaSave } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

const Voucher = () => {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin);
    const tournacenter = useSelector((state) => state.tournacenter);
    useEffect(() => {
        // console.log(admin);
    }, [])
    const handlee = async (e) => {
        e.preventDefault();
        // console.log(inp);

        try {
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}createvoucher`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inp)
            });
            const data = await responsee.json();
            // console.log(data);
            if (responsee.status == 200) {
                dispatch(voucher());
                setmodal(false);
                toast.success(data.message, { autoClose: 1300 });
            } else {
                toast.warn(data.message, { autoClose: 1500 });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const deletee = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this Tournament!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const token = localStorage.getItem("token");
                    const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}deletevoucher`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ id })
                    });
                    const data = await responsee.json();
                    // console.log(data);
                    if (responsee.ok) {
                        dispatch(voucher());
                        toast.success(data.message, { autoClose: 1300 });
                    } else {
                        toast.warn(data.message, { autoClose: 1500 });
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {

            }
        });
    }
    const edit = async () => {
        // console.log(inp);
        try {
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}editvoucher`, {
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
                setmodal(false);
                setinp(init);
                dispatch(voucher());
                toast.success(data.message, { autoClose: 1300 });
            } else {
                toast.warn(data.message, { autoClose: 1500 });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const setedit = (val) => {
        setisedit(true)
        setmodal(true);
        setinp((prev) => ({
            name: val.coupon, percent: val.percent, isactive: val.isactive, id: val._id
        }))
    }
    const [isedit, setisedit] = useState(false);
    const [modal, setmodal] = useState(false);
    const handleChange = (e, field) => {
        setinp({
            ...inp, [field]: e.target.value
        })
    }
    const init = {
        name: "",
        percent: '',
        isactive: true,
        id: ''
    }
    const [inp, setinp] = useState(init)

    return <>
        <div className="voucherpage">
            <div className="conta" onClick={() => { setmodal(true); setisedit(false) }} title="Add New Voucher">
                <FaPlus />
            </div>
            <div className="cards">
                {admin.voucher && admin.voucher.map((val, ind) => {
                    return <div className="card" key={ind}>
                        <div><span>Plan Name</span> <span>:</span> <span>{val.coupon}</span></div>
                        <div><span>Percent</span> <span>:</span> <span>{val.percent}</span></div>
                        <div><span>Status</span> <span>:</span> <span>{val.isactive ? "Active" : 'Expired'}</span></div>
                        <div>
                            <HiPencilSquare className='editicon ico' title="Edit" onClick={() => setedit(val)} />
                            <RiDeleteBin6Line className='deleteicon ico' title="Delete" onClick={() => deletee(val._id)} style={{ marginLeft: '20px' }} />
                        </div>
                    </div>
                })}
            </div>
        </div>
        <Modalbox open={modal} onClose={() => setmodal(false)}>
            <div className="membermodal">
                <form onSubmit={handlee}>
                    <h2>Create Voucher</h2>
                    <span className="modalcontent">
                        <TextField required value={inp.name} onChange={(e) => handleChange(e, 'name')} fullWidth label="Plan Name" size="small" />
                        <TextField type="tel" required value={inp.percent} onChange={(e) => handleChange(e, 'percent')} fullWidth label="Percent"
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                            size="small" />
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={inp.isactive}
                                label="status"
                                onChange={(e) => handleChange(e, 'isactive')}
                            >
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Expired</MenuItem>
                            </Select>
                        </FormControl>
                        <div style={{ width: '100%' }}>
                            {!isedit && <Button startIcon={<FaSave />} type="submit" variant="contained"> Submit</Button>}
                            {isedit && <Button startIcon={<FaSave />} onClick={edit} variant="contained"> Update</Button>}
                            <Button onClick={() => { setmodal(false); setinp(init) }} variant="outlined"> cancel</Button>
                        </div>
                    </span>
                </form>
            </div>
        </Modalbox>
    </>
}
export default Voucher;