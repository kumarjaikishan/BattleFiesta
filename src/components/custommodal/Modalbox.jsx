import React from 'react'
import './modalbox.css'
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { motion } from "framer-motion";

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
    return (
        <>
            {open && createPortal(
                <div className='modalwrapper' onClick={onClose}>
                    <motion.div className="modalbox"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        style={shadow ? { boxShadow: '0 10px 20px rgba(0,0,0,0.4)' } : undefined}
                        initial={{ scale: 0.1, x: '-50%', y: '-50%' }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 17,
                            bounce: 0.5, // gives that elastic feel
                            duration: 0.5,
                        }}
                    >
                        {children}
                    </motion.div>
                </div>,
                document.body
            )}
        </>
    )
}

export default Modalbox
