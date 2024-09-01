import React from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import './dialogbox.css'

const Dialogbox = ({ open, onClose,children }) => {

    return (
        <Dialog open={open} onClose={onClose} className='maindialog'>
            {/* <DialogTitle>hi</DialogTitle> */}

            <DialogContent  className='muidialogbox' sx={{padding:0}} >
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Dialogbox;
