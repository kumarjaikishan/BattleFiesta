import Dialogbox from "../utils/dialogbox";
import weekly from '../../assets/payment/weekly.webp'
import monthly from '../../assets/payment/monthly.webp'
import threemonth from '../../assets/payment/3month.webp'
import sixmonth from '../../assets/payment/6month.webp'
import logo from '../../assets/home/logo.webp'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from "react";

const Paymentmodal = ({ planchoosed, paymodalopen, setpaymodalopen }) => {
    const handlee = () => {

    }
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
                            planchoosed.duration == '3 Months' && threemonth ||
                            planchoosed.duration == '6 Months' && sixmonth 
                         } alt="" />
                    </div>
                    <div className="right">
                        <form onSubmit={handlee}>
                            <img src={logo} alt="" />
                            <h3>{planchoosed.duration} plan - ₹{planchoosed.price}.00</h3>
                            <TextField required id="outlined-basic" size="small" label="Enter UTR/UPI REF no. here" variant="outlined" />
                            <div className="just">
                                <Button type="submit" variant="contained">Submit</Button>
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