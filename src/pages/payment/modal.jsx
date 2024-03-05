import Dialogbox from "../utils/dialogbox";
import weekly from '../../assets/payment/weekly.webp'
import monthly from '../../assets/payment/monthly.webp'
import threemonth from '../../assets/payment/3month.webp'
import sixmonth from '../../assets/payment/6month.webp'
import logo from '../../assets/home/logo.webp'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const Paymentmodal = ({ handleinput, reset, setinp, inp, planchoosed, paymodalopen, setpaymodalopen }) => {

    const tournacenter = useSelector((state) => state.tournacenter);
    const handlee = async (e) => {
        e.preventDefault();
        let inpreplace = { ...inp };
        if (inp.coupon == 0) {
            inpreplace.couponname = ""
        }
        console.log(planchoosed);
        const id = toast.loading("Please wait...")
        try {
            setisloading(true);
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${tournacenter.apiadress}/manualcheck`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ plan_id: planchoosed._id, coupon: inpreplace.couponname, txn_id: inpreplace.txn_no })
            });
            const data = await responsee.json();
            console.log(data);
            if (responsee.ok) {
                toast.update(id, { render: data.msg, type: "success", isLoading: false, autoClose: 1600 });
                setpaymodalopen(false);
                reset();
            } else {
                toast.update(id, { render: data.msg, type: "warn", isLoading: false, autoClose: 1600 });
            }
            setisloading(false);
        } catch (error) {
            toast.update(id, { render: data.msg, type: "warn", isLoading: false, autoClose: 1600 });
            setisloading(false);
            console.log(error);
        }
    }
    const [isloading,setisloading]=useState(false);
    return (
        <>
            <Dialogbox
                className="modale"
                open={paymodalopen}
                onClose={() => setpaymodalopen(false)}
            >
                <div className="paymodal">
                    <div className="left">
                        <img src={
                            planchoosed.duration == '1 Week' && weekly ||
                            planchoosed.duration == '1 Month' && monthly ||
                            planchoosed.duration == '3 Month' && threemonth ||
                            planchoosed.duration == '6 Month' && sixmonth
                        } alt="" />
                    </div>
                    <div className="right">
                        <form onSubmit={handlee}>
                            <img src={logo} alt="" />
                            <h3>{planchoosed.duration} plan - ₹{planchoosed.price}.00</h3>
                            <TextField onChange={handleinput} required id="outlined-basic" name="txn_no" size="small" label="Enter UTR/UPI REF no. here" variant="outlined" />
                            <div className="just">
                                <Button type="submit" disabled={isloading} variant="contained">Submit</Button>
                                <Button onClick={() => setpaymodalopen(false)} variant="outlined">Cancel</Button>
                            </div>
                            <p>Note- Do payment and Enter your transaction no. above and have  some patients</p>
                        </form>
                    </div>
                </div>

            </Dialogbox>
        </>
    )
}
export default Paymentmodal;