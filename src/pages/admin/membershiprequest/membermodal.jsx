import Dialogbox from "../../utils/dialogbox";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const Membermodal = ({feteche, setinp, inp, membermodal, setmembermodal }) => {
    const [other, setother] = useState({
        remarks: "",
        buydate: new Date(),
        expiredate: new Date()
    });

    useEffect(() => {
        // console.log(inp);
    }, [])
    const handleChange = (e, naam) => {
        setother({ ...other, [naam]: e.target.value })
        setinp({ ...inp, [naam]: e.target.value })
    };
    const tournacenter = useSelector((state) => state.tournacenter);
    const handlee = async (e) => {
        e.preventDefault();
        let all = { ...other, ...inp }
        console.log(all);
        // try {
        //     const token = localStorage.getItem("token");
        //     const responsee = await fetch(`${tournacenter.apiadress}/createmembership`, {
        //         method: "POST",
        //         headers: {
        //             "Authorization": `Bearer ${token}`,
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(all)
        //     });
        //     const data = await responsee.json();
        //     console.log(data);
        //     if (responsee.ok) {
        //         feteche();
        //         toast.success(data.msg, { autoClose: 1300 });
        //         setmembermodal(false);
        //     } else {
        //         toast.warn(data.msg, { autoClose: 1500 });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }
    return (
        <>
            <Dialogbox
                className="modale"
                open={membermodal}
                onClose={() => setmembermodal(false)}
            >
                <div className="membermodal">
                    <form onSubmit={handlee}>
                        <h2>Create Membership</h2>
                        <div>
                            <TextField sx={{ width: '48%' }} value={inp.user.name} label="User" size="small" />
                            <TextField sx={{ width: '48%' }} value={inp.coupon} label="coupon" size="small" />
                        </div>
                        <div>
                            <TextField sx={{ width: '48%' }} value={inp.plan_id.plan_name} label="Plan name" size="small" />
                            <TextField required={inp.status == 'success'} sx={{ width: '48%' }} value={inp.txn_no} label="txn no" size="small" />
                        </div>
                        <div>
                            <TextField required={inp.status == 'success'} type="date" sx={{ width: '48%' }} onChange={(e) => handleChange(e, 'buydate')} value={other.buydate} label="buy date" size="small" />
                            <TextField required={inp.status == 'success'} type="date" sx={{ width: '48%' }} onChange={(e) => handleChange(e, 'expiredate')} value={other.expiredate} label="expiry date" size="small" />
                        </div>
                        <div>
                            <TextField sx={{ width: '48%' }} value={inp.plan_id.price} label="price" size="small" />
                            <TextField sx={{ width: '48%' }} value={inp.finalpricepaid} label="finalprice" size="small" />
                        </div>
                        <div>
                            <FormControl sx={{ width: '48%' }} size="small">
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
                            <TextField required={inp.status == 'rejected'} onChange={(e) => handleChange(e, 'remarks')} value={other.remarks} sx={{ width: '48%' }} label="Remarks" size="small" />
                        </div>
                        <div>
                            <Button size="small" type="submit" variant="contained"> Submit</Button>
                            <Button size="small" onClick={() => setmembermodal(false)} variant="outlined"> cancel</Button>
                        </div>
                    </form>
                </div>
            </Dialogbox>
        </>
    )
}
export default Membermodal;