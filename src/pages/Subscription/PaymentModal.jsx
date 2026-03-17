import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {
    FiCheck,
    FiX,
    FiLock,
    FiCalendar,
    FiZap,
    FiCreditCard
} from "react-icons/fi";

import { SiRazorpay, SiPaytm } from "react-icons/si";
import { useNavigate } from "react-router-dom";

export const PaymentModal = ({
    isOpen,
    onClose,
    finalPrice,
    plan,
    selectedMethod,
    setSelectedMethod,
    inp
}) => {
    if (!isOpen) return null;

    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const paymentMethods = [
        {
            id: "razorpay",
            name: "Razorpay",
            desc: "Cards & Netbanking",
            icon: SiRazorpay,
        },
        {
            id: "upi",
            name: "UPI Express",
            desc: "Instant Activation",
            icon: FiZap,
        },
        {
            id: "paytm",
            name: "Paytm Wallet",
            desc: "Quick Payment",
            icon: SiPaytm,
        },
    ];
    // Load Razorpay Script
    useEffect(() => {
        if (!selectedMethod) {
            setSelectedMethod("razorpay");
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    const handlePayment = async (plan) => {
        // console.log(plan);
        // return

        setIsProcessing(true);

        try {
            // 🔹 Create order
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}create-order`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plan_detail:plan
                })
            });

            const order = await res.json();

            console.log("🧾 ORDER CREATED:", order);

            if (!order?.id) {
                throw new Error("Order creation failed");
            }

            const options = {
                key: 'rzp_live_SSEdhM9TsH0zjZ',
                amount: order.amount,
                currency: "INR",
                name: "EMS Pro Solutions",
                description: plan.name,
                order_id: order.id,

                // ✅ SUCCESS
                handler: async function (response) {
                    console.log("✅ PAYMENT SUCCESS:", response);

                    try {
                        const verifyRes = await fetch(`${import.meta.env.VITE_API_ADDRESS}verify_payment`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(response),
                        });

                        const data = await verifyRes.json();

                        console.log("🔐 VERIFY RESPONSE:", data);

                        if (data.success) {
                            toast.success("Payment Successful 🎉");
                            setTimeout(() => navigate("/payment_success"), 3000);
                        } else {
                            toast.error("Verification Failed ❌");
                        }
                    } catch (err) {
                        console.error("❌ VERIFY ERROR:", err);
                        toast.error("Server verification failed");
                    }

                    setIsProcessing(false);
                },

                // 🚫 CANCEL
                modal: {
                    ondismiss: function () {
                        console.log("🚫 USER CANCELLED PAYMENT");
                        toast.info("Payment Cancelled");
                        setIsProcessing(false);
                    }
                },

                prefill: {
                    name: "Client Name",
                    email: "admin@company.com",
                },

                theme: {
                    color: "#f97316",
                },
            };

            const rzp = new window.Razorpay(options);

            // ❌ FAILURE
            rzp.on("payment.failed", function (response) {
                console.error("❌ PAYMENT FAILED:", response.error);

                toast.error(
                    response.error.description || "Payment Failed ❌"
                );

                setIsProcessing(false);
            });

            rzp.open();

        } catch (err) {
            console.error("❌ PAYMENT INIT ERROR:", err);
            toast.error("Something went wrong while initiating payment");
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
            <div className="bg-white w-full max-w-md max-h-[95vh] flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden">

                {/* HEADER */}
                <div className="px-8 pt-8 pb-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <FiCreditCard size={22} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">Checkout</h3>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
                        >
                            <FiX size={22} />
                        </button>
                    </div>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-8 pb-4 space-y-8">

                    {/* PRICE */}
                    <div className="bg-gray-50 rounded-[2rem] p-6 text-center border">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                            Final Amount
                        </p>
                        <div className="text-5xl font-black text-gray-900">
                            ₹{finalPrice}
                        </div>

                        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-white rounded-full border text-xs font-bold text-gray-600">
                            <FiCalendar className="text-indigo-500" />
                            {plan?.duration} Access
                        </div>
                    </div>

                    {/* METHODS */}
                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                            Select Payment Method
                        </p>

                        {paymentMethods.map((method) => {
                            const Icon = method.icon;

                            return (
                                <div
                                    key={method.id}
                                    onClick={() =>
                                        method.id === "razorpay"
                                            ? setSelectedMethod(method.id)
                                            : toast.info("Coming soon!")
                                    }
                                    className={`group cursor-pointer p-4 rounded-2xl border-2 flex items-center gap-4 transition-all
                  ${selectedMethod === method.id
                                            ? "border-indigo-600 bg-indigo-50/50"
                                            : "border-gray-100 hover:border-indigo-200"
                                        }
                  ${method.id !== "razorpay" ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition
                    ${selectedMethod === method.id
                                                ? "bg-indigo-600 text-white"
                                                : "bg-gray-50 text-gray-400"
                                            }`}
                                    >
                                        <Icon size={24} />
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-black text-gray-900 text-sm">
                                            {method.name}
                                        </p>
                                        <p className="text-[10px] font-bold uppercase text-gray-400">
                                            {method.id === "upi" ? method.desc : "Coming Soon"}
                                        </p>
                                    </div>

                                    {selectedMethod === method.id && (
                                        <div className="bg-indigo-600 rounded-full p-1 text-white">
                                            <FiCheck size={16} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="px-8 pb-8">
                    <div className="flex items-center justify-center gap-2 py-3">
                        <FiLock className="text-green-500" size={16} />
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                            Secure 256-bit Encrypted
                        </span>
                    </div>

                    <button
                        onClick={() => handlePayment(plan)}
                        disabled={isProcessing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3">
                        COMPLETE PAYMENT
                    </button>
                </div>
            </div>
        </div>
    );
};