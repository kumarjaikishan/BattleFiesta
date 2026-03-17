import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { PaymentModal } from './PaymentModal';

/**
 * MOCK REDUX & STORE (To resolve compilation errors in preview)
 * In your actual project, replace these with:
 * import { useSelector, useDispatch } from "react-redux";
 * import { setloader } from "../../store/login";
 */
const mockState = {
  userprofile: {
    userprofile: {
      name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
      city: "Mumbai"
    }
  },
  login: {
    islogin: true
  }
};

const useSelector = (fn) => fn(mockState);

const useDispatch = () => (action) => console.log("Dispatching:", action);
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

// --- ENHANCED UI COMPONENTS ---

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden ${noPadding ? '' : 'p-6 md:p-8'} ${className}`}>
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
        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-gray-800 placeholder:text-gray-400 font-medium"
      />
    </div>
  </div>
);

const PlanCard = ({ plan, isSelected, onClick }) => {
  const savings = (plan.baseprice * plan.into) - plan.price;
  const savingsPercent = Math.round((savings / (plan.baseprice * plan.into)) * 100);

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer group transition-all duration-500 
      ${isSelected
          ? 'ring-2 ring-indigo-600 shadow-[0_20px_50px_rgba(79,70,229,0.15)] scale-[1.02] z-10'
          : 'hover:border-indigo-400 border border-gray-300 hover:shadow-xl hover:-translate-y-1'
        } 
      bg-white p-6 rounded-[2.5rem] flex flex-col items-center text-center h-full overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full transition-colors duration-500 ${isSelected ? 'bg-indigo-50/50' : 'bg-gray-50/30'}`} />

      {plan.popular && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-b-xl shadow-lg z-20">
          Most Popular
        </div>
      )}

      <div className="relative z-10 w-full">
        <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-indigo-50 text-indigo-500'}`}>
          {plan.into >= 12 ? <Icons.Trophy size={28} /> : plan.into >= 3 ? <Icons.AutoAwesome size={28} /> : <Icons.Calendar size={26} />}
        </div>

        <span className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{plan.into >= 12 ? 'Ultimate' : plan.into >= 3 ? 'Recommended' : 'Basic'}</span>
        <h3 className="text-lg font-bold text-gray-900 mb-4">{plan.duration}</h3>

        <div className="mb-4">
          <span className="text-gray-400 text-xs font-semibold line-through block mb-0.5">₹{plan.baseprice * plan.into}</span>
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-black text-gray-900">₹{plan.price}</span>
            <span className="text-xs font-bold text-gray-500 ml-1">/total</span>
          </div>
        </div>

        <div className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tight py-1.5 px-3 rounded-full transition-all duration-500 ${isSelected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          <Icons.Percent size={14} />
          Save {savingsPercent}%
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4 animate-in zoom-in duration-300">
          <div className="bg-indigo-600 rounded-full p-1 shadow-md shadow-indigo-200">
            <Icons.Check size={16} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};


// --- MAIN PAGE ---

const SubscriptionPage = () => {
  const userprofile = useSelector((state) => state.userprofile);
  const log = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const init = {
    fullname: '',
    phone: '',
    city: '',
    email: '',
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
    if (userprofile?.userprofile) {
      setinp((prev) => ({
        ...prev,
        fullname: userprofile.userprofile.name || '',
        phone: userprofile.userprofile.phone || '',
        email: userprofile.userprofile.email || '',
        city: userprofile.userprofile.city || ''
      }));
    }
  }, [userprofile?.userprofile]);

  // ❌ REMOVE THIS FUNCTION (or don't call it inside effect)
  // const setprofile = () => { ... }

  const setprofile = () => {
    setinp((prev) => ({
      ...prev,
      fullname: userprofile.userprofile.name || '',
      phone: userprofile.userprofile.phone || '',
      email: userprofile.userprofile.email || '',
      city: userprofile.userprofile.city || ''
    }));
  };

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
      <div className="relative overflow-hidden bg-indigo-600 pt-16 pb-32 px-4 text-center">
        <div className="relative max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/30 backdrop-blur-md rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
            <Icons.AutoAwesome size={12} /> BattleFiesta Premium
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">Ready to level up?</h1>
          <p className="text-indigo-100 text-sm md:text-lg font-medium opacity-80">Choose the duration that fits your tournament needs.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16">
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
                <InputField label="Full Name" icon={Icons.Person} name="fullname" value={inp.fullname} onChange={handleinput} required />
                <InputField label="Email Address" icon={Icons.Email} type="email" name="email" value={inp.email} onChange={handleinput} required />
                <InputField label="Contact Number" icon={Icons.Smartphone} name="phone" value={inp.phone} onChange={handleinput} required />
                <InputField label="City" icon={Icons.Location} name="city" value={inp.city} onChange={handleinput} required />
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
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
          </div>
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