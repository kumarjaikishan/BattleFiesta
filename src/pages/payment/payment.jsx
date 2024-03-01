import { useEffect, useState } from 'react';
import './payment.css'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import upi from '../../assets/payment/upi-payment-icon.webp'
import razorpay from '../../assets/payment/razorpay-icon.webp'
import paytm from '../../assets/payment/paytm-icon.webp'
import Button from '@mui/material/Button';
import Paymentmodal from './modal';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const Payment = () => {
  const tournacenter = useSelector((state) => state.tournacenter);
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
  ]

  const init = {
    fullname: '',
    phone: '',
    city: '',
    email: '',
    couponname: '',
    coupon: 0,
    txn_no: '',
  }
  const [inp, setinp] = useState(init);
  const [couponerror, setcouponerror] = useState(null);
  const reset = () => {
    setinp(init);
  }

  useEffect(() => {

  }, []);

  const plandetail = [
    {
      baseprice: 29,
      price: 29,
      into: 1,
      duration: '1 Week',
      notation: 'week'
    },
    {
      baseprice: 29,
      price: 70,
      into: 4,
      duration: '1 Month',
      notation: 'Month'
    },
    {
      baseprice: 29,
      price: 170,
      into: 12,
      duration: '3 Months',
      notation: 'Month'
    },
    {
      baseprice: 29,
      price: 300,
      into: 24,
      duration: '6 Months',
      notation: 'Month'
    }
  ]

  const [planchoosed, setplanchoosed] = useState(plandetail[0]);

  const baseprice = 29;

  const padZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const calculateDate = (offset) => {
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getTime());

    if (offset === '1 Week') {
      targetDate.setDate(currentDate.getDate() + 7);
    } else if (offset === '1 Month') {
      targetDate.setMonth(currentDate.getMonth() + 1);
    } else if (offset === '3 Months') {
      targetDate.setMonth(currentDate.getMonth() + 3);
    } else if (offset === '6 Months') {
      targetDate.setMonth(currentDate.getMonth() + 6);
    }

    const day = padZero(targetDate.getDate());
    const month = padZero(targetDate.getMonth() + 1);
    const year = targetDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const colore = '#2f1c6a';
  const changeactive = (ind) => {
    let card = document.querySelectorAll('.cards .card');
    for (let i = 0; i < card.length; i++) {
      card[i].classList.remove('active');
    }
    card[ind].classList.add('active')
    setplanchoosed(plandetail[ind]);
  }

  const handleinput = (e) => {
    let naam = e.target.name;
    let value = e.target.value;

    setinp((prev) => ({
      ...prev,
      [naam]: value
    }));
  }
  const sub = (e) => {
    e.preventDefault();
    // console.log(inp);
    setpaymodalopen(true);
  }

  const tax = (val) => {
    return Math.floor(val * 0);
  }
  const coupon = 0;
  const [paymodalopen, setpaymodalopen] = useState(false);

  const checkcoupon = async () => {
    let coupon = inp.couponname.trim().toLowerCase();
    console.log(coupon);
    try {
      const responsee = await fetch(`${tournacenter.apiadress}/checkcoupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ coupon })
      });
      const data = await responsee.json();
      console.log(data);
      if (!responsee.ok) {
        toast.warn(`Coupon ${data.msg}`, { autoClose: 1700 });
        setcouponerror(data.msg)
        setinp((prev) => ({
          ...prev,
          coupon: 0,
        }));
      }
      if (responsee.ok) {
        toast.success('Coupon Applied Successfully', { autoClose: 1700 });
        setinp((prev) => ({
          ...prev,
          coupon: data.data.percent
        }));
        setcouponerror(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const couponreset = () => {
    setinp((prev) => ({
      ...prev,
      coupon: 0,
      couponname: ''
    }));
    setcouponerror(null);
  }

  return (
    <>
      <div className="payment">
        <div className="mater">
          <h1>» Choose a Period</h1>
          <div className="cards">
            {
              plandetail.map((val, ind) => {

                return (
                  <div key={ind} className={ind == 0 ? 'card active' : 'card'} onClick={() => changeactive(ind)}>
                    <span>SAVE ₹{(val.baseprice * val.into) - val.price}.00</span>
                    <div className='period'>{val.duration}</div>
                    <div className='not'> ₹{ind == 0 ? '.' : val.baseprice * val.into} </div>
                    <div className='price'>₹{val.price}.00</div>
                    <div className='des'>INR/{val.duration}</div>
                    <div className="renew">Plan renews at ₹{val.price}.00/{val.duration} on {calculateDate(val.duration)}</div>
                  </div>
                )
              })
            }
          </div>

          <h1>» Select Payment</h1>
          <div className="paymentgateway">
            <div className="method">
              <div className="card active" title='Pay via UPI'>
                <span>UPI</span>
                <span><img src={upi} alt="" /></span>
              </div>
              <div className="card disable" title='coming soon'>
                <span>Razorpay</span>
                <span><img src={razorpay} alt="" /></span>
              </div>
              <div className="card disable" title='coming soon'>
                <span>PayTM</span>
                <span><img src={paytm} alt="" /></span>
              </div>
            </div>
            <div className="paymentdetail">
              <form onSubmit={sub}>
                <div className='initial'>
                  <b><p>BattleFiesta - {planchoosed.duration} Plan</p></b>
                  <span> <b>₹{planchoosed.price}.00</b></span>
                </div>
                <Divider variant="middle" />
                <div className='half'>
                  <TextField onChange={handleinput} required size='small' id="outlined-basic" value={inp.fullname} name='fullname' label="Full Name" variant="outlined" sx={{ width: '47%' }} />
                  <TextField onChange={handleinput} required size='small' id="outlined-basic" type='tel'
                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                    value={inp.phone} name='phone' label="Phone Number" variant="outlined" sx={{ width: '47%' }} />
                </div>

                <div className='half'>
                  <TextField onChange={handleinput} required size='small' id="outlined-basic" value={inp.city} name='city' label="City" variant="outlined" sx={{ width: '47%' }} />
                  <TextField onChange={handleinput} required size='small' id="outlined-basic" value={inp.email} name='email' type='email' label="Email" variant="outlined" sx={{ width: '47%' }} />
                </div>
                <Divider variant="middle" />
                <div className='full'>
                  <div className="under">
                    <span>Plan</span>
                    <span>₹{planchoosed.price}.00</span>
                  </div>
                  <div className="under">
                    <span>Tax (0% Round off)</span>
                    <span>₹{tax(planchoosed.price)}.00</span>
                  </div>
                  <div className="under">
                    <span>Coupon {inp.coupon > 0 && `(${inp.coupon}% OFF)`}</span>
                    <span style={{ color: 'green' }}>- ₹{inp.coupon ? Math.floor((planchoosed.price * inp.coupon) / 100) : 0}.00</span>
                  </div>
                </div>
                <div className='full'>
                  <div className="under">
                    <b><span>Final Price</span></b>
                    <span> <b>₹{planchoosed.price + tax(planchoosed.price) - Math.floor((planchoosed.price * inp.coupon) / 100)}.00</b></span>
                  </div>
                </div>
                <Divider variant="middle" />
                <div style={{ padding: '10px 0px' }}>
                  <h2>Have a coupon code?</h2>
                  <div style={{ padding: '10px 0px' }}>
                    <TextField
                      InputProps={{
                        readOnly: (inp.coupon > 0 && true || couponerror && true), style: { textTransform: 'lowercase' }
                      }}
                      onChange={handleinput} size='small' id="outlined-basic" label="Enter a coupon code" value={inp.couponname} name='couponname' variant="outlined" />
                    <Button onClick={checkcoupon} disabled={inp.couponname.length < 1 && true|| couponerror && true} className='btn' sx={{ ml: 4 }} variant="contained">{inp.coupon > 0 ? 'Applied' : 'Apply'}</Button>
                   {inp.couponname.length > 0 && <Button onClick={couponreset} sx={{ ml: 2 }} variant="outlined">Reset</Button>} 
                  </div>
                  {inp.coupon > 0 && <p className='cousuc'>Coupon code <b>{inp.couponname}</b> applied successfully, <b>{inp.coupon}% </b> off applied </p>}
                  {couponerror && <p style={{ color: 'red', fontSize: '14px', fontWeight: 500 }}>Coupon Code <b>{inp.couponname}</b> {couponerror}</p>}
                </div>
                <Divider variant="middle" />
                <div style={{ padding: '10px 0px' }}>
                  <input required type="checkbox" name="" id="termsCheckbox" />
                  <label style={{ marginLeft: 8, cursor: 'pointer' }} htmlFor="termsCheckbox">I Agree to the Terms and Conditions</label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button className='btn' type='submit' sx={{ mt: 1 }} variant="contained">Proceed to Payment</Button>
                </div>
              </form>
              <Paymentmodal reset={reset} handleinput={handleinput} inp={inp} planchoosed={planchoosed} paymodalopen={paymodalopen} setpaymodalopen={setpaymodalopen} />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Payment;

