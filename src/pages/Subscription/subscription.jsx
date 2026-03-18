import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { PaymentModal } from './PaymentModal';
import Membershipheader from './component/header';
import { PlanCard } from './component/PlanCard';
import { useDispatch, useSelector } from 'react-redux';


const setloader = (val) => ({ type: "SET_LOADER", payload: val });

/**
 * CUSTOM SVG ICONS
 */
const IconWrapper = ({ children, size = 24, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

const Icons = {
  Check: (props) => (
    <IconWrapper {...props}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></IconWrapper>
  ),
  Shield: (props) => (
    <IconWrapper {...props}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></IconWrapper>
  ),
  Payment: (props) => (
    <IconWrapper {...props}><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></IconWrapper>
  ),
  Flash: (props) => (
    <IconWrapper {...props}><path d="M7 2v11h3v9l7-12h-4l4-8z" /></IconWrapper>
  ),
  Percent: (props) => (
    <IconWrapper {...props}><path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4.0025 18.5831l14.5875-14.5806 1.4114 1.4169L5.4139 20zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></IconWrapper>
  ),
  ArrowForward: (props) => (
    <IconWrapper {...props}><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></IconWrapper>
  ),
  Smartphone: (props) => (
    <IconWrapper {...props}><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" /></IconWrapper>
  ),
  Location: (props) => (
    <IconWrapper {...props}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-12-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></IconWrapper>
  ),
  Email: (props) => (
    <IconWrapper {...props}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></IconWrapper>
  ),
  Person: (props) => (
    <IconWrapper {...props}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></IconWrapper>
  ),
  Close: (props) => (
    <IconWrapper {...props}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></IconWrapper>
  ),
  Lock: (props) => (
    <IconWrapper {...props}><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" /></IconWrapper>
  ),
  Calendar: (props) => (
    <IconWrapper {...props}><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></IconWrapper>
  ),
  AutoAwesome: (props) => (
    <IconWrapper {...props}><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4l-2.5 5.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" /></IconWrapper>
  ),
  Trophy: (props) => (
    <IconWrapper {...props}><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 10.63 21 8.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" /></IconWrapper>
  ),
  Paytm: (props) => (
    <IconWrapper {...props}><path d="M4 14.5v-5h2.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5H4zm6.5-2.5c0-2.5-2-4.5-4.5-4.5H2v14h2v-5h2.5c2.5 0 4.5-2 4.5-4.5zM15 12h5v2h-5zM14 8h7v2h-7zM14 16h7v2h-7z" /></IconWrapper>
  ),
  Razorpay: (props) => (
    <IconWrapper {...props}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" /></IconWrapper>
  )
};

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-100/50 overflow-hidden ${noPadding ? '' : 'p-6 md:p-8'} ${className}`}>
    {children}
  </div>
);

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="group space-y-2">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 px-1">
      {Icon && <Icon size={16} className="text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />}
      {label}
    </label>
    <div className="relative">
      <input
        {...props}
        className="w-full px-4 py-3 bg-gray-100/50 border border-gray-400 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-gray-800 placeholder:text-gray-400 font-medium"
      />
    </div>
  </div>
);

// --- MAIN PAGE ---
const SubscriptionPage = () => {
  const userprofile = useSelector((state) => state.userprofile);
  const log = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const init = {
    fullname: '',
    phone: '',
    couponname: '',
    coupon: 0,
    txn_no: '',
    agreed: false
  };

  const [inp, setinp] = useState(init);
  const [plandetail, setplandetail] = useState([]);
  const [planchoosed, setplanchoosed] = useState(null);
  const [paymodalopen, setpaymodalopen] = useState(false);
  const [couponerror, setcouponerror] = useState(null);
  const [fetchCouponData, setfetchCouponData] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('upi');

  // ✅ ONLY CHANGE IS IN useEffect PART — REST SAME AS YOUR CODE

  useEffect(() => {
    fetche();
  }, []);

  useEffect(() => {
    // console.log(log)
    if (userprofile?.userprofile) {
      setinp((prev) => ({
        ...prev,
        fullname: userprofile.userprofile.name || '',
        phone: userprofile.userprofile.phone || '',

      }));
    }
  }, [userprofile?.userprofile]);



  const fetche = async () => {
    dispatch(setloader(true));
    try {
      // Note: Replace with your actual VITE_API_ADDRESS
      const apiAddress = typeof import.meta.env !== 'undefined' ? import.meta.env.VITE_API_ADDRESS : '/api/';
      const response = await fetch(`${apiAddress}plan`, { method: "GET" });

      if (!response.ok) throw new Error("API fail");

      const data = await response.json();
      setplandetail(data.plans || []);
      setplanchoosed(data.plans ? data.plans[0] : null);
    } catch (error) {
      console.warn("API Error, falling back to mock plans:", error);
      // Mock plans if API fails during preview
      const mocks = [
        { _id: '1', baseprice: 100, into: 1, price: 99, duration: "1 Month", popular: false },
        { _id: '2', baseprice: 100, into: 3, price: 249, duration: "3 Months", popular: true },
        { _id: '3', baseprice: 100, into: 6, price: 449, duration: "6 Months", popular: false },
        { _id: '4', baseprice: 100, into: 12, price: 799, duration: "Yearly", popular: false },
      ];
      setplandetail(mocks);
      setplanchoosed(mocks[1]);
    } finally {
      dispatch(setloader(false));
    }
  };

  const handleinput = (e) => {
    const { name, value, type, checked } = e.target;
    setinp((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const checkcoupon = async () => {
    const coupon = inp.couponname.trim().toLowerCase();
    if (!coupon) return;

    setfetchCouponData(true);
    try {
      const apiAddress = typeof import.meta.env !== 'undefined' ? import.meta.env.VITE_API_ADDRESS : '/api/';
      const response = await fetch(`${apiAddress}checkcoupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon })
      });
      const data = await response.json();

      if (!response.ok) {
        toast.warn(`Coupon ${data.message || 'invalid'}`);
        setcouponerror(data.message);
        setinp((prev) => ({ ...prev, coupon: 0 }));
      } else {
        toast.success('Coupon Applied Successfully');
        setinp((prev) => ({ ...prev, coupon: data.data.percent }));
        setcouponerror(null);
      }
    } catch (error) {
      console.error(error);
      // Simulate successful coupon for preview demo
      if (coupon === 'save20') {
        toast.success('Demo: Coupon Applied!');
        setinp((prev) => ({ ...prev, coupon: 20 }));
        setcouponerror(null);
      }
    } finally {
      setfetchCouponData(false);
    }
  };

  const couponreset = () => {
    setinp((prev) => ({ ...prev, coupon: 0, couponname: '' }));
    setcouponerror(null);
  };

  const calculation = useMemo(() => {
    const base = planchoosed?.price || 0;
    const discount = Math.ceil((base * inp.coupon) / 100);
    const total = base - discount;
    return { base, discount, total };
  }, [planchoosed, inp.coupon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!log?.islogin) {
      toast.info("Please login to proceed");
      return navigate('/login');
    }
    if (!inp.agreed) {
      return toast.warn("Please agree to the terms.");
    }
    setpaymodalopen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 pb-24 font-sans selection:bg-indigo-100">
      <Helmet>
        <title>Subscription Plans || BattleFiesta</title>
        <meta name="description" content="Choose from our premium subscription plans to access tournament management tools." />
      </Helmet>

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 pt-10 pb-16 px-4 text-center">
        <Membershipheader Icons={Icons} />
      </div>


      {/* display plan cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white shadow-lg rounded-2xl flex items-center justify-center font-black text-indigo-600 text-xl border border-indigo-50">1</div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Choose your plan</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {plandetail.map((plan) => (
                  <PlanCard
                    Icons={Icons}
                    key={plan._id}
                    plan={plan}
                    isSelected={planchoosed?._id === plan._id}
                    onClick={() => setplanchoosed(plan)}
                  />
                ))}
              </div>
            </section>

            <Card className="relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600" />
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl">2</div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Details</h2>
              </div>

              <form id="billing-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField label="Full Name" icon={Icons.Person} placeholder='Enter your Name here..' name="fullname" value={inp.fullname} onChange={handleinput} required />
                <InputField label="Contact Number" icon={Icons.Smartphone} placeholder='Your contact no' name="phone" value={inp.phone} onChange={handleinput} required />
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 ">
            <div className="sticky top-8 space-y-6">
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-[1.5rem] p-8 text-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-gray-200 overflow-hidden">

                {/* 🔥 Soft Glow */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200 opacity-40 blur-3xl rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200 opacity-40 blur-3xl rounded-full pointer-events-none"></div>

                {/* Header */}
                <h2 className="text-xl font-extrabold mb-8 flex items-center gap-3">
                  <Icons.Payment className="text-indigo-500" />
                  Checkout Summary
                </h2>

                {/* Pricing */}
                <div className="space-y-5 mb-8 text-sm">
                  <div className="flex justify-between items-center text-gray-500">
                    <span>{planchoosed?.duration || 'Plan'} Price</span>
                    <span className="text-gray-900 font-bold">₹{calculation.base}.00</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-500">
                    <span>Tax (0% Round off)</span>
                    <span className="text-gray-900 font-bold">₹0.00</span>
                  </div>

                  {inp.coupon > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-100 rounded-xl border border-green-200 text-green-700">
                      <span className="flex items-center gap-2">
                        <Icons.Percent size={16} /> Discount ({inp.coupon}%)
                      </span>
                      <span className="font-black">-₹{calculation.discount}.00</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

                {/* Total */}
                <div className="mb-10">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.25em] block mb-2">
                    Total to Pay
                  </span>

                  <div className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    ₹{calculation.total}.00
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-6">

                  {/* Coupon */}
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Promo Code"
                      className="w-full pl-5 pr-28 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-bold placeholder:text-gray-400 uppercase tracking-widest shadow-sm"
                      value={inp.couponname}
                      name="couponname"
                      onChange={handleinput}
                      readOnly={inp.coupon > 0}
                    />

                    <button
                      onClick={inp.coupon > 0 ? couponreset : checkcoupon}
                      disabled={fetchCouponData || (!inp.couponname && inp.coupon === 0)}
                      className="absolute right-2 top-2 bottom-2 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md"
                    >
                      {fetchCouponData ? '...' : (inp.coupon > 0 ? 'Reset' : 'Apply')}
                    </button>
                  </div>

                  {couponerror && (
                    <p className="text-red-500 text-[10px] font-bold uppercase mt-1">
                      Code {couponerror}
                    </p>
                  )}

                  {/* Terms */}
                  <div className="flex items-start gap-3 px-1 cursor-pointer select-none">

                    {/* Hidden Native Checkbox */}
                    <input
                      type="checkbox"
                      id="terms-checkbox"
                      name="agreed"
                      checked={inp.agreed}
                      onChange={handleinput}
                      className="hidden peer"
                    />

                    {/* Custom Checkbox */}
                    <label
                      htmlFor="terms-checkbox"
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {/* Box */}
                      <div className={`mt-1 w-5 h-5 rounded-sm border flex items-center justify-center transition-all duration-300
                        ${inp.agreed
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600 shadow-md"
                          : "border-gray-600 bg-white"
                        }`}
                      >
                        {/* Check Icon */}
                        <svg
                          className={`w-3 h-3 text-white transition-all duration-300 ${inp.agreed ? "scale-100 opacity-100" : "scale-0 opacity-0"
                            }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      {/* Text */}
                      <span className="text-[11px] text-gray-500 leading-relaxed font-medium">
                        I agree to{" "}
                        <NavLink
                          to="/terms"
                          className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors"
                        >
                          Terms and Conditions
                        </NavLink>.
                      </span>
                    </label>
                  </div>

                  {/* 🔥 CTA */}
                  {log.islogin ? <button
                    form="billing-form"
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl shadow-[0_10px_25px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-3 group"
                  >
                    UPGRADE NOW
                    <Icons.ArrowForward
                      size={22}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button> :
                    <div
                      form="billing-form"
                      onClick={() => navigate('/login')}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl shadow-[0_10px_25px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-3 group"
                    >
                      Login Required
                      <Icons.ArrowForward
                        size={22}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  }


                </div>
              </div>
            </div>
          </div>
          {/* <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="relative bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-gray-200 overflow-hidden">
                <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                  <Icons.Payment className="text-indigo-400" /> Checkout Summary
                </h2>

                <div className="space-y-5 mb-8 text-sm">
                  <div className="flex justify-between items-center text-gray-400">
                    <span>{planchoosed?.duration || 'Plan'} Price</span>
                    <span className="text-white font-bold">₹{calculation.base}.00</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>Tax (0% Round off)</span>
                    <span className="text-white font-bold">₹0.00</span>
                  </div>
                  {inp.coupon > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-400">
                      <span className="flex items-center gap-2"><Icons.Percent size={16} /> Discount ({inp.coupon}%)</span>
                      <span className="font-black">-₹{calculation.discount}.00</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10 mb-8" />
                <div className="mb-10">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] block mb-2">Total to Pay</span>
                  <div className="text-5xl font-black tracking-tighter">₹{calculation.total}.00</div>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Promo Code"
                      className="w-full pl-5 pr-24 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-bold placeholder:text-gray-600 uppercase tracking-widest"
                      value={inp.couponname}
                      name="couponname"
                      onChange={handleinput}
                      readOnly={inp.coupon > 0}
                    />
                    <button
                      onClick={inp.coupon > 0 ? couponreset : checkcoupon}
                      disabled={fetchCouponData || (!inp.couponname && inp.coupon === 0)}
                      className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      {fetchCouponData ? '...' : (inp.coupon > 0 ? 'Reset' : 'Apply')}
                    </button>
                  </div>
                  {couponerror && <p className="text-red-400 text-[10px] font-bold uppercase mt-1">Code {couponerror}</p>}

                  <div className="flex items-start gap-3 px-1">
                    <input
                      type="checkbox"
                      id="terms-checkbox"
                      name="agreed"
                      required
                      className="mt-1 w-5 h-5 rounded-lg border-white/20 bg-transparent text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      checked={inp.agreed}
                      onChange={handleinput}
                    />
                    <label htmlFor="terms-checkbox" className="text-[11px] text-gray-400 leading-relaxed font-medium cursor-pointer">
                      I agree to the <NavLink to="/terms" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">Terms and Conditions</NavLink>.
                    </label>
                  </div>

                  <button
                    form="billing-form"
                    type="submit"
                    className="w-full bg-white hover:bg-gray-100 text-gray-900 font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group"
                  >
                    UPGRADE NOW
                    <Icons.ArrowForward size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <PaymentModal
        isOpen={paymodalopen}
        onClose={() => setpaymodalopen(false)}
        finalPrice={calculation.total}
        plan={planchoosed}
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
        inp={inp}
      />
    </div>
  );
};

export default function App() {
  return <SubscriptionPage />;
}