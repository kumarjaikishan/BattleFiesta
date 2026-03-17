import React, { useState, useEffect, useMemo } from 'react';

/**
 * CUSTOM SVG ICONS (Replacing react-icons to ensure environment compatibility)
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
    <IconWrapper {...props}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></IconWrapper>
  ),
  Shield: (props) => (
    <IconWrapper {...props}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></IconWrapper>
  ),
  Payment: (props) => (
    <IconWrapper {...props}><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></IconWrapper>
  ),
  Flash: (props) => (
    <IconWrapper {...props}><path d="M7 2v11h3v9l7-12h-4l4-8z"/></IconWrapper>
  ),
  Percent: (props) => (
    <IconWrapper {...props}><path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4.0025 18.5831l14.5875-14.5806 1.4114 1.4169L5.4139 20zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></IconWrapper>
  ),
  ArrowForward: (props) => (
    <IconWrapper {...props}><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></IconWrapper>
  ),
  Info: (props) => (
    <IconWrapper {...props}><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></IconWrapper>
  ),
  Smartphone: (props) => (
    <IconWrapper {...props}><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></IconWrapper>
  ),
  Location: (props) => (
    <IconWrapper {...props}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-12-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></IconWrapper>
  ),
  Email: (props) => (
    <IconWrapper {...props}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></IconWrapper>
  ),
  Person: (props) => (
    <IconWrapper {...props}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></IconWrapper>
  ),
  Close: (props) => (
    <IconWrapper {...props}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></IconWrapper>
  ),
  Lock: (props) => (
    <IconWrapper {...props}><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/></IconWrapper>
  ),
  Calendar: (props) => (
    <IconWrapper {...props}><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></IconWrapper>
  ),
  AutoAwesome: (props) => (
    <IconWrapper {...props}><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4l-2.5 5.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/></IconWrapper>
  ),
  Trophy: (props) => (
    <IconWrapper {...props}><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 10.63 21 8.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></IconWrapper>
  ),
  Paytm: (props) => (
    <IconWrapper {...props}><path d="M4 14.5v-5h2.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5H4zm6.5-2.5c0-2.5-2-4.5-4.5-4.5H2v14h2v-5h2.5c2.5 0 4.5-2 4.5-4.5zM15 12h5v2h-5zM14 8h7v2h-7zM14 16h7v2h-7z"/></IconWrapper>
  ),
  Razorpay: (props) => (
    <IconWrapper {...props}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/></IconWrapper>
  )
};

/**
 * MOCK DATA
 */
const mockUser = {
  userprofile: {
    name: "John Doe",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
    city: "Mumbai"
  }
};

const mockPlans = [
  { id: 1, baseprice: 100, into: 1, price: 99, duration: "1 Month", popular: false, tag: "Basic" },
  { id: 2, baseprice: 100, into: 3, price: 249, duration: "3 Months", popular: true, tag: "Recommended" },
  { id: 3, baseprice: 100, into: 6, price: 449, duration: "6 Months", popular: false, tag: "Professional" },
  { id: 4, baseprice: 100, into: 12, price: 799, duration: "Yearly", popular: false, tag: "Ultimate" },
];

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
      {/* Decorative Background Pattern */}
      <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full transition-colors duration-500 ${isSelected ? 'bg-indigo-50/50' : 'bg-gray-50/30'}`} />
      
      {plan.popular && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-b-xl shadow-lg z-20">
          Most Popular
        </div>
      )}
      
      <div className="relative z-10 w-full">
        <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-indigo-50 text-indigo-500'}`}>
          {plan.id === 4 ? <Icons.Trophy size={28} /> : plan.popular ? <Icons.AutoAwesome size={28} /> : <Icons.Calendar size={26} />}
        </div>

        <span className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{plan.tag}</span>
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

// --- PAYMENT MODAL ---

const PaymentModal = ({ isOpen, onClose, finalPrice, plan }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'upi', name: 'UPI Express', desc: 'Instant Activation', icon: Icons.Flash, color: 'indigo' },
    { id: 'paytm', name: 'Paytm Wallet', desc: 'Quick Payment', icon: Icons.Paytm, color: 'blue' },
    { id: 'razorpay', name: 'Razorpay', desc: 'Cards & Netbanking', icon: Icons.Razorpay, color: 'slate' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md transition-all">
      <div className="bg-white w-full max-w-md max-h-[95vh] flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-8 duration-300">
        
        {/* Header - Fixed */}
        <div className="px-8 pt-8 pb-4 shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Icons.Shield size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Checkout</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
              <Icons.Close size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-8 pb-4 space-y-8 scrollbar-hide">
          <div className="bg-gray-50 rounded-[2rem] p-6 text-center border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Final Amount</p>
            <div className="text-5xl font-black text-gray-900 tracking-tighter">₹{finalPrice}</div>
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-white rounded-full border border-gray-200 text-xs font-bold text-gray-600">
              <Icons.Calendar size={14} className="text-indigo-500" />
              {plan.duration} Access
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Select Payment Method</p>
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`group cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center gap-4
                ${selectedMethod === method.id 
                  ? 'border-indigo-600 bg-indigo-50/50' 
                  : 'border-gray-100 bg-white hover:border-indigo-200'}`}
              >
                <div className={`w-12 h-12 rounded-2xl shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 
                  ${selectedMethod === method.id ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                  <method.icon size={28} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-gray-900 text-sm">{method.name}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedMethod === method.id ? 'text-indigo-400' : 'text-gray-400'}`}>
                    {method.desc}
                  </p>
                </div>
                {selectedMethod === method.id && (
                  <div className="bg-indigo-600 rounded-full p-1 text-white">
                    <Icons.Check size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions - Fixed */}
        <div className="px-8 pt-2 pb-8 shrink-0 bg-white">
          <div className="flex items-center justify-center gap-2 py-3">
            <Icons.Lock size={16} className="text-green-500" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure 256-bit Encrypted</span>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 active:scale-[0.98]">
            COMPLETE PAYMENT <Icons.ArrowForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

const SubscriptionPage = () => {
  const [plans, setPlans] = useState(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState(mockPlans[1]);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: mockUser.userprofile.name,
    phone: mockUser.userprofile.phone,
    email: mockUser.userprofile.email,
    city: mockUser.userprofile.city,
    agreed: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const applyCoupon = () => {
    if (!couponCode) return;
    setIsLoadingCoupon(true);
    setTimeout(() => {
      if (couponCode.toLowerCase() === 'save20') {
        setDiscountPercent(20);
      } else {
        alert("Invalid Coupon. Use 'SAVE20' for 20% off!");
        setDiscountPercent(0);
      }
      setIsLoadingCoupon(false);
    }, 800);
  };

  const calculation = useMemo(() => {
    const base = selectedPlan?.price || 0;
    const discount = Math.ceil((base * discountPercent) / 100);
    const total = base - discount;
    return { base, discount, total };
  }, [selectedPlan, discountPercent]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 pb-24 font-sans selection:bg-indigo-100">
      
      {/* Dynamic Header */}
      <div className="relative overflow-hidden bg-indigo-600 pt-16 pb-32 px-4">
        {/* Background Circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/30 backdrop-blur-md rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
            <Icons.AutoAwesome size={12} /> Premium Subscription
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">Ready to level up?</h1>
          <p className="text-indigo-100 text-sm md:text-lg font-medium opacity-80">
            Join 10,000+ members getting exclusive benefits every single day.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Step 1: Enhanced Plan Selection */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white shadow-lg rounded-2xl flex items-center justify-center font-black text-indigo-600 text-xl border border-indigo-50">1</div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Choose your plan</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select the duration that fits you</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <PlanCard 
                    key={plan.id} 
                    plan={plan} 
                    isSelected={selectedPlan?.id === plan.id}
                    onClick={() => setSelectedPlan(plan)}
                  />
                ))}
              </div>
            </section>

            {/* Step 2: Information Card */}
            <Card className="relative overflow-hidden group">
              {/* Subtle accent line */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600" />
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl">2</div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Details</h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personalize your membership</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField label="Full Name" icon={Icons.Person} name="fullname" value={formData.fullname} onChange={handleInputChange} />
                <InputField label="Email Address" icon={Icons.Email} type="email" name="email" value={formData.email} onChange={handleInputChange} />
                <InputField label="Contact Number" icon={Icons.Smartphone} name="phone" value={formData.phone} onChange={handleInputChange} />
                <InputField label="City" icon={Icons.Location} name="city" value={formData.city} onChange={handleInputChange} />
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 max-w-md">
                  <Icons.Info className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                  <p className="text-xs font-medium text-indigo-700 leading-relaxed">
                    Once payment is confirmed, your account will be upgraded instantly and you'll receive a confirmation email.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Plan</p>
                    <p className="text-lg font-black text-indigo-600">{selectedPlan.duration}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Modern Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              
              <div className="relative bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-gray-200 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                
                <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                  <Icons.Payment className="text-indigo-400" /> Checkout Summary
                </h2>
                
                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">Standard Price</span>
                    <span className="font-bold tracking-tight">₹{selectedPlan?.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">Platform Fee</span>
                    <span className="text-green-400 font-black uppercase tracking-widest text-[10px]">Free</span>
                  </div>
                  
                  {discountPercent > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-400">
                        <Icons.Percent size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Discount Applied</span>
                      </div>
                      <span className="text-green-400 font-black">-₹{calculation.discount}</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10 mb-8" />

                <div className="mb-10">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] block mb-2">Total to Pay</span>
                  <div className="text-5xl font-black tracking-tighter">₹{calculation.total}</div>
                </div>

                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Promo Code" 
                      className="w-full pl-5 pr-24 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-bold placeholder:text-gray-600 uppercase tracking-widest"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button 
                      onClick={applyCoupon}
                      disabled={isLoadingCoupon || !couponCode}
                      className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-30"
                    >
                      {isLoadingCoupon ? '...' : 'Apply'}
                    </button>
                  </div>

                  <div className="flex items-start gap-3 px-1">
                    <input 
                      type="checkbox" 
                      id="terms-checkbox" 
                      name="agreed"
                      className="mt-1 w-5 h-5 rounded-lg border-white/20 bg-transparent text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-900 cursor-pointer"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="terms-checkbox" className="text-[11px] text-gray-400 leading-relaxed font-medium cursor-pointer select-none">
                      I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">Subscription Terms</a> and allow auto-renewal.
                    </label>
                  </div>

                  <button 
                    onClick={() => formData.agreed ? setIsModalOpen(true) : alert("Please accept the terms to proceed.")}
                    className="w-full bg-white hover:bg-gray-100 text-gray-900 font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
                  >
                    UPGRADE NOW
                    <Icons.ArrowForward size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 flex flex-col items-center gap-4 text-center">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">+2k</div>
                </div>
                <p className="text-[11px] font-bold text-indigo-900/60 uppercase tracking-widest">Trusted by thousands of users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        finalPrice={calculation.total}
        plan={selectedPlan}
      />
    </div>
  );
};

export default function App() {
  return (
    <SubscriptionPage />
  );
}