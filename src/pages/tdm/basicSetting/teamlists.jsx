import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import EditIcon from '@mui/icons-material/Edit';
import PhotoIcon from '@mui/icons-material/Photo';

const Teamlists = ({ teamarray, statuschange, callfrom, deletee, edetee, showss, decline }) => {
    const hgfh = (ide) => {
        decline(ide)
    }
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'

    const tdmrtk = useSelector((state) => state.tdm);
    useEffect(() => {
        console.log(teamarray);
        console.log(tdmrtk.tdmdetail.slotCategory);
    })
    return (<>
        {teamarray.length > 0 && teamarray.map((player, ind) => {
            return (<Accordion key={ind}
                style={{ borderRadius: "10px", overflow: "hidden" }}
                sx={{ mb: 1 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className={`header ${player.status}`}
                // style={{ borderRight: "8px solid orange" }}
                >
                    <img src={player?.logo || user} alt="PlayerLogo" />
                    <span className='name'>{player.name} </span>
                    {<span className='category' style={{ fontSize: '14px', fontWeight: '400', textTransform: 'capitalize' }}>-{tdmrtk?.tdmdetail?.slotCategory?.[player.category].category}</span>}
                </AccordionSummary>
                <AccordionDetails className='details'>
                    <div className="teamdata">
                        <div className='imageside'>
                        <img src={player?.logo || user} alt="PlayerLogo" />
                            <div className="icon">
                                <a href={`mailto:${player.email}`} target="_blank" ><MailOutlineIcon titleAccess='Email' /></a>
                                <a href={`tel:${player.mobile}`} target="_blank" ><PhoneEnabledIcon titleAccess='Phone' /></a>
                                <a href={`https://wa.me/+91${player.mobile}`} target="_blank" ><WhatsAppIcon titleAccess='Whatsapp' /></a>
                                {player.paymentss && <PhotoIcon color='primary' titleAccess='Show ScreenShot' onClick={() => showss(player.paymentss)} />}
                            </div>
                        </div>
                        <div className='teamside'>
                            <span> <span>Name</span><span>: {player.name || 'N/A'}</span></span>
                            <span> <span>Category</span><span>: {tdmrtk?.tdmdetail?.slotCategory?.[player.category].category || 'N/A'}</span></span>
                            {player.email && <span> <span>Email</span><span>: {player.email}</span></span>}
                            <span> <span>Phone</span><span>: {player.mobile || 'N/A'}</span></span>
                            {player.discord && <span> <span>Discord</span><span>: {player.discord}</span></span>}
                            <span> <span>O.S</span><span>: {player.os || 'N/A'}</span></span>
                            <span> <span>Device</span><span>: {player.device || 'N/A'}</span></span>
                            <span> <span>FPS</span><span>: {player.fps || 'N/A'}</span></span>
                            <span> <span>UTR No.</span><span>: {player.utrno || 'N/A'}</span></span>
                        </div>

                    </div>
                    <div className="playerdata">
                        <div>
                            {callfrom == "pending" && <>
                                <Button onClick={() => statuschange(player._id, "approved")} color="success" variant="outlined" startIcon={<ThumbUpAltIcon />}>
                                    Approve
                                </Button>
                                <Button color='error' onClick={() => hgfh(player._id)} variant="outlined" startIcon={<DeleteIcon />}>
                                    Reject
                                </Button>
                            </>}
                            {callfrom == "Approved" && <>
                                <Button onClick={() => statuschange(player._id, "pending")} color="warning" variant="outlined" startIcon={<UndoIcon />}>
                                    Pending
                                </Button>
                                <Button color='error' onClick={() => hgfh(player._id)} variant="outlined" startIcon={<DeleteIcon />}>
                                    Reject
                                </Button>
                            </>}
                            {callfrom == "Rejected" && <>
                                <Button onClick={() => statuschange(player._id, "pending")} color="warning" variant="outlined" startIcon={<UndoIcon />}>
                                    Pending
                                </Button>
                                <Button onClick={() => statuschange(player._id, "approved")} color="success" variant="outlined" startIcon={<ThumbUpAltIcon />}>
                                    Approve
                                </Button>
                            </>}
                            {callfrom == "manageteam" && <>
                                <Button color='error' onClick={() => deletee(player._id)} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                                <Button color="primary" onClick={() => edetee(player)} variant="outlined" startIcon={<EditIcon />}>
                                    Edit
                                </Button>
                            </>}

                        </div>
                    </div>

                </AccordionDetails>
                {player.status == "rejected" && <TextField
                    id="outlined-multiline-flexible"
                    label="Reason of Rejection  .."
                    multiline
                    color="error"
                    focused
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 18 } }}
                    value={player.reason || "your Fault"}
                    maxRows={6}
                    sx={{ minWidth: "96%", mb: 1, ml: 1 }}
                />}
            </Accordion>)
        })}
    </>);
};

export default Teamlists;
