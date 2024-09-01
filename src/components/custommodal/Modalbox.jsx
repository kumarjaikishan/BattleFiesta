import React from 'react'
import './modalbox.css'
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const Modalbox = ({ onClose, children }) => {

    useEffect(() => {
        const getScrollbarWidth = () => {
            return window.innerWidth - document.documentElement.clientWidth;
        };

        const scrollbarWidth = getScrollbarWidth();

        // Set body styles to compensate for scrollbar disappearance
        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;


        return () => {
            setTimeout(() => {
                document.body.style.overflowY = '';
                document.body.style.paddingRight = ''; // Reset padding
            }, 100); // Adjust delay to match your modal’s transition timing
        };
    }, [])
    return (
        <>
            {createPortal(
                <div className='modalwrapper' onClick={onClose}>
                    <div className="modalbox"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {children}
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}

export default Modalbox
