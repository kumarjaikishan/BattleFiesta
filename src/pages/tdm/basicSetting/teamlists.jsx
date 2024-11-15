import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdInsertPhoto } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdThumbUp } from "react-icons/md";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import Badge from '@mui/material/Badge';

const Teamlists = ({ teamarray, statuschange, callfrom, deletee, edetee, showss, decline }) => {
    const hgfh = (ide) => {
        decline(ide)
    }
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'

    const tdmrtk = useSelector((state) => state.tdm);
    useEffect(() => {
        // console.log("tdm arraylist", teamarray);
        // console.log(tdmrtk.tdmdetail.slotCategory);
    })
    const hidenotification = async (player) => {
        if (player.newEntry) {
            const token = localStorage.getItem("token");
            try {
                const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}tdmseen`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ tid: player.tournament_id })
                });
                const vfdvdf = await responsee.json();
                console.log(vfdvdf);

            } catch (error) {
                console.log(error);
            }
        }
    }
    return (<>
        {teamarray.length > 0 && teamarray.map((player, ind) => {
            return (
                <Accordion key={ind} style={{ borderRadius: "10px", overflow: "hidden" }}
                    sx={{ mb: 1 }}>
                    <AccordionSummary
                        expandIcon={<MdExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        onClick={() => hidenotification(player)}
                        className={`header ${player.status}`}
                        sx={{ background: player.newEntry ? 'rgba(6, 146, 6, 0.218)' : '' }}
                    >
                        <Badge key={ind} variant="dot" color="error" invisible={!player.newEntry}>
                            <img src={player?.logo || user} alt="PlayerLogo" />
                        </Badge>
                        <span className='name'>{player.name} </span>
                        {<span className='category' style={{ fontSize: '14px', fontWeight: '400', textTransform: 'capitalize' }}>-{tdmrtk?.tdmdetail?.slotCategory?.[player.category].category}</span>}


                    </AccordionSummary>
                    <AccordionDetails className='details' sx={{pb:0}}>
                        <div className="teamdata">
                            <div className='imageside'>
                                <img src={player?.logo || user} alt="PlayerLogo" />
                                <div className="icon">
                                    <a href={`mailto:${player.email}`} target="_blank" ><IoMailOutline title='Email' /></a>
                                    <a href={`tel:${player.mobile}`} target="_blank" ><MdLocalPhone title='Phone' /></a>
                                    <a href={`https://wa.me/+91${player.mobile}`} target="_blank" ><FaWhatsapp title='Whatsapp' /></a>
                                </div>
                                {player.paymentss &&
                                    <div className='payss' onClick={() => showss(player.paymentss)}>
                                        <IoEyeOutline />
                                        Payment S.S
                                    </div>
                                }
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
                                    <Button onClick={() => statuschange(player._id, "approved")} color="success" variant="outlined" startIcon={<MdThumbUp />}>
                                        Approve
                                    </Button>
                                    <Button color='error' onClick={() => hgfh(player._id)} variant="outlined" startIcon={<MdDelete />}>
                                        Reject
                                    </Button>
                                </>}
                                {callfrom == "Approved" && <>
                                    <Button onClick={() => statuschange(player._id, "pending")} color="warning" variant="outlined" startIcon={<FaUndo />}>
                                        Pending
                                    </Button>
                                    <Button color='error' onClick={() => hgfh(player._id)} variant="outlined" startIcon={<MdDelete />}>
                                        Reject
                                    </Button>
                                </>}
                                {callfrom == "Rejected" && <>
                                    <Button onClick={() => statuschange(player._id, "pending")} color="warning" variant="outlined" startIcon={<FaUndo />}>
                                        Pending
                                    </Button>
                                    <Button onClick={() => statuschange(player._id, "approved")} color="success" variant="outlined" startIcon={<MdThumbUp />}>
                                        Approve
                                    </Button>
                                </>}
                                {callfrom == "manageteam" && <>
                                    <Button color='error' onClick={() => deletee(player._id)} variant="outlined" startIcon={<MdDelete />}>
                                        Delete
                                    </Button>
                                    <Button color="primary" onClick={() => edetee(player)} variant="outlined" startIcon={<MdEdit />}>
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
                </Accordion>
            )
        })}
    </>);
};

export default Teamlists;
