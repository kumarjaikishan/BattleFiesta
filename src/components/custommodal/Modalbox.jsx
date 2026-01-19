import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import './modalbox.css'

const Modalbox = ({ open, onClose, children, shadow = true }) => {

   useEffect(() => {
          if (open) {
              const getScrollbarWidth = () => {
                  return window.innerWidth - document.documentElement.clientWidth;
              };
  
              const scrollbarWidth = getScrollbarWidth();
  
              // Set body styles to compensate for scrollbar disappearance
              document.body.style.overflowY = 'hidden';
              document.body.style.paddingRight = `${scrollbarWidth}px`;
  
  
              return () => {
                  setTimeout(() => {
                      document.body.style.overflowY = 'scroll';
                      document.body.style.paddingRight = '0px'; // Reset padding
                  }, 100); // Adjust delay to match your modal’s transition timing
              };
          }
      }, [open])

  if (!open) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-1000 
        bg-black/50 backdrop-blur-[5px]
        flex items-center justify-center modalwrapper
      "
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-min h-min
          max-w-[98vw] max-h-[95vh]
          bg-white rounded-[15px] modalbox
        "
        style={shadow ? { boxShadow: "0 10px 20px rgba(0,0,0,0.4)" } : undefined}
        initial={{ scale: 0.1 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 17,
          bounce: 0.5,
          duration: 0.5
        }}
      >
        {children}
      </motion.div>
    </div>,
    document.body
  );
};

export default Modalbox;
