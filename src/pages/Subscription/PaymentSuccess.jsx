import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// ✅ react-icons replacements
import {
  FiCheck,
  FiCopy,
  FiArrowRight,
  FiDownload,
  FiShare2,
  FiHome
} from "react-icons/fi";

import { BsStars } from "react-icons/bs"; // Sparkles equivalent

const PaymentSuccess = () => {
  const [copied, setCopied] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const transactionId = "TXN-98234-AX77B";

  useEffect(() => {
    const end = Date.now() + 3 * 1000;
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-8 text-center"
      >

        {/* ICON */}
        <div onClick={handleManualConfetti} className="mb-8 cursor-pointer">
          <div className="bg-green-500 p-6 rounded-full inline-block">
            <FiCheck className="text-white text-4xl" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">
          Payment Received!
        </h1>

        <p className="text-gray-500 mb-6">
          Your Pro account is now active.
        </p>

        {/* TRANSACTION */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="font-mono">{transactionId}</span>

          <button onClick={copyToClipboard}>
            {copied ? (
              <FiCheck className="text-green-500" />
            ) : (
              <FiCopy />
            )}
          </button>
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <button className="bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2">
            Go to Dashboard
            <FiArrowRight />
          </button>

          <button
            onClick={() => setViewDetails(!viewDetails)}
            className="border py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <FiDownload />
            Receipt
          </button>
        </div>

        {/* DETAILS */}
        <AnimatePresence>
          {viewDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-left"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span>Annual Pro</span>
                </div>

                <div className="flex justify-between">
                  <span>Amount</span>
                  <span>$228</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 border py-2 flex items-center justify-center gap-2">
                  <FiShare2 /> Share
                </button>
                <button className="flex-1 border py-2 flex items-center justify-center gap-2">
                  <BsStars /> Upgrade
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <p className="mt-6 text-sm text-gray-400">
          Need help? Contact support
        </p>
      </motion.div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 p-4 bg-white rounded-full shadow">
        <FiHome />
      </button>
    </div>
  );
};

export default PaymentSuccess;