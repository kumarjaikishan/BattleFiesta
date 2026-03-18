import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useNavigate, useLocation } from "react-router-dom";

// Icons
import {
  FiCheck,
  FiCopy,
  FiArrowRight,
  FiDownload
} from "react-icons/fi";
import dayjs from 'dayjs';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [copied, setCopied] = useState(false);

  // ✅ GET DATA FROM NAVIGATION
  const data = location?.state?.data?.membership;
  console.log("recived from params", data)

  // ✅ FALLBACK DEFAULT DATA (important for refresh case)
  const defaultStart = new Date();
  const defaultEnd = new Date();
  defaultEnd.setDate(defaultStart.getDate() + 90);

  const paymentId =
    data?.paymentId || "TXN-" + Math.floor(Math.random() * 1000000);

  const order_id =
    data?.orderId || "Pro Membership";

  const planName =
    data?.planid?.plan_name || "3 Months";

  const amount =
    (data?.amount/100) || 29;

  const startDate =
    dayjs(data?.startDate).format('DD MMM, YYYY') || defaultStart.toLocaleDateString();

  const endDate =
    dayjs(data?.endDate).format('DD MMM, YYYY') || defaultEnd.toLocaleDateString();

  // 🎉 Auto Confetti
  useEffect(() => {
    const end = Date.now() + 3000;
    const colors = ['#10B981', '#3B82F6', '#F59E0B'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  // 🎉 Manual Confetti
  const handleManualConfetti = (e) => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      colors: ['#10B981', '#3B82F6']
    });
  };

  // 📋 Copy Txn ID
  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-2">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl p-8 text-center shadow-2xl border border-gray-100"
      >
        {/* ICON */}
        <div onClick={handleManualConfetti} className="mb-6 cursor-pointer">
          <div className="bg-green-500 p-6 rounded-full inline-block shadow-md">
            <FiCheck className="text-white text-4xl" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Received! 🎉
        </h1>

        <p className="text-gray-500 mt-2 mb-6">
          Welcome to BattleFiesta — your membership is now active.
        </p>

        {/* SUBSCRIPTION DETAILS */}
        <div className="bg-gray-50 border rounded-xl p-4 text-left mb-6">

          <div className="flex justify-between py-1">
            <span className="text-gray-500">Plan</span>
            <span className="font-semibold">{planName}</span>
          </div>

          <div className="flex justify-between py-1 items-center">
            <span className="text-gray-500">Transaction ID</span>

            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{paymentId}</span>

              <button onClick={copyToClipboard}>
                {copied ? (
                  <FiCheck className="text-green-500" />
                ) : (
                  <FiCopy className="text-gray-600 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-gray-500">Start Date</span>
            <span>{startDate}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-gray-500">End Date</span>
            <span>{endDate}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-gray-500">Amount Paid</span>
            <span className="font-semibold">₹{amount}</span>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <FiArrowRight />
          </button>

          <button
            className="border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-2"
            onClick={() => alert("Download feature coming soon 😄")}
          >
            <FiDownload />
            Download Receipt
          </button>
        </div>

        {/* FOOTER */}
        <p className="mt-6 text-sm text-gray-400">
          BattleFiesta Team 💙
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;