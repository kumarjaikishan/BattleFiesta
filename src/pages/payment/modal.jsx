import Dialogbox from "../utils/dialogbox";
import logo from '../../assets/logopng250.webp'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";

const Paymentmodal = ({ handleinput, reset, setinp, inp, tax, planchoosed, paymodalopen, setpaymodalopen }) => {
    const { txnNo } = useParams(); // Get the transaction number from URL params

    useEffect(() => {
        if (txnNo) {
            // If transaction number exists, set it in the input field or store it in state
            handleinput({ target: { name: 'txn_no', value: txnNo } });
            // You can also show a success toast or perform other actions
            toast.success('Payment successful!');
        }
    }, [txnNo]);
useEffect(()=>{
    // console.log(planchoosed);
})
    const handlee = async (e) => {
        e.preventDefault();
        let inpreplace = { ...inp };
        if (inp.coupon == 0) {
            inpreplace.couponname = ""
        }
        // console.log(planchoosed);
        const id = toast.loading("Please wait...")
        try {
            // setisloading(true);
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}manualcheck`, {
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
                toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
                setpaymodalopen(false);
            } else {
                toast.update(id, { render: data.message, type: "warn", isLoading: false, autoClose: 1600 });
            }
            setisloading(false);
        } catch (error) {
            toast.update(id, { render: data.message, type: "warn", isLoading: false, autoClose: 1600 });
            setisloading(false);
            console.log(error);
        }
    }
    const qrcodeamount = planchoosed?.price + tax(planchoosed?.price) - Math.ceil((planchoosed?.price * inp.coupon) / 100);
    const [isloading, setisloading] = useState(false);
    return (
        <>
            <Dialogbox
                className="modale"
                open={paymodalopen}
                onClose={() => setpaymodalopen(false)}
            >
                <div className="paymodal">
                    <div className="left">
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={`upi://pay?pa=battlefiesta01@ybl&pn=battlefiesta&am=${qrcodeamount}&tn=battleFiesta&cu=INR`}
                            viewBox={`0 0 256 256`}
                        />
                        <a href={`upi://pay?pa=battlefiesta01@ybl&pn=BattleFiesta&am=${qrcodeamount}&tn=${planchoosed.duration}_Plan&cu=INR`}>Pay Now</a>
                    </div>
                    <div className="right">
                        <form onSubmit={handlee}>
                            <img src={logo} alt="" />
                            <h3>{planchoosed?.duration} plan - ₹{qrcodeamount}.00</h3>
                            <TextField onChange={handleinput}
                                required id="outlined-basic"
                                type='tel'
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                name="txn_no"
                                size="small" label="UTR/ REF/ TXN No."
                                variant="outlined"
                                inputProps={{ minLength: 12, maxLength: 12 }}
                                 />
                            <div className="just">
                                <Button type="submit" disabled={isloading} variant="contained">Submit</Button>
                                <Button onClick={() => setpaymodalopen(false)} variant="outlined">Cancel</Button>
                            </div>
                            <p>*Membership will be processed within 24 Hours. Thanks for your patience.</p>
                        </form>
                    </div>
                </div>

            </Dialogbox>
        </>
    )
}
export default Paymentmodal;