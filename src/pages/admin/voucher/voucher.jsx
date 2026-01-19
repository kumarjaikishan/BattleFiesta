import { useEffect, useState } from "react";
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
        <div className="voucherpage w-full p-3 sm:p-4">
            {/* PAGE TITLE + ADD BUTTON */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold sm:text-xl">
                    Voucher Page
                </h2>

                <div
                    onClick={() => { setmodal(true); setisedit(false); }}
                    title="Add New Voucher"
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer transition"
                >
                    <FaPlus className="w-4 h-4" />
                    <span className="text-sm font-medium whitespace-nowrap">
                        Create Voucher
                    </span>
                </div>

            </div>

            {/* CARDS */}
            <div className="cards grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {admin.voucher && admin.voucher.map((val, ind) => (
                    <div
                        key={ind}
                        className="card rounded-lg bg-white p-3  border border-gray-200"
                    >
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Plan Name</span>
                            <span>{val.coupon}</span>
                        </div>

                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Percent</span>
                            <span>{val.percent}%</span>
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Status</span>
                            <span
                                className={
                                    val.isactive
                                        ? "text-green-700 bg-green-100 px-2 py-[2px] rounded-full text-xs"
                                        : "text-red-700 bg-red-100 px-2 py-[2px] rounded-full text-xs"
                                }
                            >
                                {val.isactive ? "Active" : "Expired"}
                            </span>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 mt-2">
                            <HiPencilSquare
                                title="Edit"
                                onClick={() => setedit(val)}
                                className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer transition"
                            />
                            <RiDeleteBin6Line
                                title="Delete"
                                onClick={() => deletee(val._id)}
                                className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer transition"
                            />
                        </div>
                    </div>
                ))}
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