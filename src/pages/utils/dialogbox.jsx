import React from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const Dialogbox = ({ open, onClose,children }) => {

    return (
        <Dialog open={open} onClose={onClose}>
            {/* <DialogTitle>hi</DialogTitle> */}
            <DialogContent sx={{padding:0}} >
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Dialogbox;
