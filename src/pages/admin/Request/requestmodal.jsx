import Modalbox from "../../../components/custommodal/Modalbox";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { memshipentry } from "../../../store/admin";
import SaveIcon from '@mui/icons-material/Save';

const Membermodal = ({ setinp, inp, membermodal, setmembermodal }) => {
    const [other, setother] = useState({
        remarks: "",
        buydate: new Date(),
        expiredate: new Date()
    });
    const [isloading, setisloading] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(inp);
    }, [inp])
    const handleChange = (e, naam) => {
        setother({ ...other, [naam]: e.target.value })
        setinp({ ...inp, [naam]: e.target.value })
    };

    const handlee = async (e, id) => {
        e.preventDefault();
        let remarks = other.remarks;
        let flag = other.status;
        // console.log(id);
        try {
            setisloading(true)
            const toaste = toast.loading("Please wait...")
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}createmembership`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ remarks, id, flag })
            });
            const data = await responsee.json();
            // console.log(data);
            setisloading(false)
            if (responsee.ok) {
                dispatch(memshipentry())
                toast.update(toaste, { render: data.message, type: "success", isLoading: false, autoClose: 2100 });
                setmembermodal(false);
            } else {
                return toast.update(toaste, { render: data.message, type: "warn", isLoading: false, autoClose: 2100 });
            }
        } catch (error) {
            setisloading(false)
            toast.update(toaste, { render: data.message, type: "warn", isLoading: false, autoClose: 5200 });
            console.log(error);
        }
    }
    return (
        <>
            <Modalbox open={membermodal} onClose={() => setmembermodal(false)}>
                <div className="membermodal">
                    <form onSubmit={(e) => handlee(e, inp._id)}>
                        <h2>Create Membership</h2>
                        <span className="modalcontent">
                            <div style={{ width: '100%' }}>
                                <TextField  value={inp.plan_id.plan_name || "None"} sx={{ width: '45%' }} label="Plan" size="small" />
                                <TextField  value={inp.coupon || "None"} sx={{ width: '45%' }} label="Voucher" size="small" />
                            </div>
                            <div style={{ width: '100%' }}>
                                <TextField  value={inp.discount || 0} sx={{ width: '45%' }} label="Discount" size="small" />
                                <TextField  value={inp.finalpricepaid} sx={{ width: '45%' }} label="Final Price" size="small" />
                            </div>
                            <div style={{ width: '100%' }}>
                                <TextField  value={inp.txn_no} sx={{ width: '45%' }} label="Transaction No." size="small" />
                                <FormControl sx={{ width: '45%' }} size="small">
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={inp.status}
                                        label="Status"
                                        onChange={(e) => handleChange(e, 'status')}
                                    >
                                        <MenuItem value='pending'>Pending</MenuItem>
                                        <MenuItem value='success'>Success</MenuItem>
                                        <MenuItem value='rejected'>Rejected</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <TextField multiline rows={2} required={inp.status == 'rejected'} onChange={(e) => handleChange(e, 'remarks')} value={other.remarks} sx={{ width: '95%' }} label="Remarks" size="small" />
                            <div className="btn">
                                <Button startIcon={<SaveIcon/>} disabled={isloading}  type="submit" variant="contained"> Submit</Button>
                                <Button  onClick={() => setmembermodal(false)} variant="outlined"> cancel</Button>
                            </div>
                        </span>
                    </form>
                </div>
            </Modalbox>
        </>
    )
}
export default Membermodal;