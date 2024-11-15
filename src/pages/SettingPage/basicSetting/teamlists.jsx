import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdInsertPhoto } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdThumbUp } from "react-icons/md";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import { HiUserGroup } from "react-icons/hi2";
import { FaDiscord } from "react-icons/fa";

const Teamlists = ({ teamarray, statuschange, callfrom, deletee, edetee, showss, decline }) => {
    const hgfh = (ide) => {
        decline(ide)
    }
    useEffect(() => {
        // console.log("list:", teamarray)
    }, [])
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'
    const group1 = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group1_oxfqan.webp'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'

    const hidenotification = async (player) => {
        if (player.newEntry) {
            const token = localStorage.getItem("token");
            try {
                const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}classicseen`, {
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
                <Accordion key={ind}
                    style={{ borderRadius: "10px", overflow: "hidden" }}
                    sx={{ mb: 1 }}>
                    <AccordionSummary
                        expandIcon={<MdExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className={`header ${player.status}`}
                        onClick={() => hidenotification(player)}
                        sx={{ background: player.newEntry ? 'rgba(6, 146, 6, 0.218)' : '' }}
                    >
                        <Badge key={ind} variant="dot" color="error" invisible={!player.newEntry}>
                            <img src={player.teamLogo ? player.teamLogo : group} alt="Team logo" />
                        </Badge>
                        <span>{player.teamName} </span>
                    </AccordionSummary>
                    <AccordionDetails className='details' sx={{ pb: 1 }}>
                        <div className="teamdata">
                            <div className='imageside'>
                                <img src={player.teamLogo ? player.teamLogo : group1} alt="" />
                                <div className="icon">
                                    <a href={`mailto:${player.email}`} target="_blank" ><IoMailOutline title='Email' /></a>
                                    <a href={`tel:${player.mobile}`} target="_blank" ><MdLocalPhone title='Phone' /></a>
                                    <a href={`https://wa.me/+91${player.mobile}`} target="_blank" ><FaWhatsapp title='Whatsapp' /></a>
                                </div>
                                {player.screenss &&
                                    <div className='payss' onClick={() => showss(player.screenss)}>
                                        <IoEyeOutline />
                                        Payment S.S
                                    </div>
                                }
                            </div>
                            <div className='teamside'>
                                <span> <span><HiUserGroup /> </span> <span>: {player?.teamName}</span></span>
                                <span> <span><IoMailOutline /> </span> <span>: {player?.email || 'N/A'}</span></span>
                                <span> <span><MdLocalPhone /> </span> <span>: {player?.mobile || 'N/A'}</span></span>
                                <span> <span><FaDiscord /> </span> <span>: {player?.discordID || 'N/A'}</span></span>
                            </div>
                        </div>
                        <div className="playerdata">
                            <h2>Player List : </h2>
                            {player.player.map((each, ind) => {
                                return <div key={ind}>
                                    <span>{<img src={each.playerLogo ? each.playerLogo : user} alt="" />}</span>
                                    <span>{each?.inGameName || 'N/A'}</span>
                                    <span>{each?.inGameID || 'N/A'}</span>
                                </div>
                            })}
                            <div>
                                {callfrom == "pending" && <>
                                    <Button sx={{ padding: 1, margin: 0, lineHeight: 0 }} size='small' onClick={() => statuschange(player._id, "approved")} color="success" variant="outlined" startIcon={<MdThumbUp />}>
                                        Approve
                                    </Button>
                                    <Button sx={{ padding: 1, margin: 0, lineHeight: 0 }} color='error' onClick={() => hgfh(player._id)} variant="outlined" startIcon={<MdDelete />}>
                                        Reject
                                    </Button>
                                </>}
                                {callfrom == "Approved" && <>
                                    <Button sx={{ padding: 1, margin: 0, lineHeight: 0 }} onClick={() => statuschange(player._id, "pending")} color="warning" variant="outlined" startIcon={<FaUndo />}>
                                        Pending
                                    </Button>
                                    <Button sx={{ padding: 1, margin: 0, lineHeight: 0 }} color='error' onClick={() => hgfh(player._id)} variant="outlined" startIcon={<MdDelete />}>
                                        Reject
                                    </Button>
                                </>}
                                {callfrom == "Rejected" && <>
                                    <Button sx={{ padding: 1, margin: 0, lineHeight: 0 }} onClick={() => statuschange(player._id, "pending")} color="warning" variant="outlined" startIcon={<FaUndo />}>
                                        Pending
                                    </Button>
                                    <Button sx={{ padding: 1, margin: 0, lineHeight: 0 }} onClick={() => statuschange(player._id, "approved")} color="success" variant="outlined" startIcon={<MdThumbUp />}>
                                        Approve
                                    </Button>
                                </>}
                                {callfrom == "manageteam" && <>
                                    <Button sx={{ padding: 1, margin: 0, lineHeight: 0 }} color='error' onClick={() => deletee(player._id)} variant="outlined" startIcon={<MdDelete />}>
                                        Delete
                                    </Button>
                                    <Button sx={{ padding: 1, margin: 0, lineHeight: 0 }} color="primary" onClick={() => edetee(player)} variant="outlined" startIcon={<MdEdit />}>
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
