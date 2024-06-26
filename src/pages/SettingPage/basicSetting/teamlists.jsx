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
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import EditIcon from '@mui/icons-material/Edit';
import PhotoIcon from '@mui/icons-material/Photo';
// import group from '../../../assets/group.webp'
// import group1 from '../../../assets/group1.webp'
// import user from '../../../assets/user.webp'

const Teamlists = ({ teamarray, statuschange, callfrom, deletee, edetee, showss, decline }) => {
    const hgfh = (ide) => {
        decline(ide)
    }
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'
    const group1 = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group1_oxfqan.webp'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'
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
                     <img src={player.teamLogo ?player.teamLogo :group} alt="" /> 
                    <span>{player.teamName} </span>
                </AccordionSummary>
                <AccordionDetails className='details'>
                    <div className="teamdata">
                        <div className='imageside'>
                        <img src={player.teamLogo ?player.teamLogo :group1} alt="" /> 
                            <div className="icon">
                                <a href={`mailto:${player.email}`} target="_blank" ><MailOutlineIcon titleAccess='Email' /></a>
                                <a href={`tel:${player.mobile}`} target="_blank" ><PhoneEnabledIcon titleAccess='Phone' /></a>
                                <a href={`https://wa.me/+91${player.mobile}`} target="_blank" ><WhatsAppIcon titleAccess='Whatsapp' /></a>
                                {player.screenss && <PhotoIcon color='primary' titleAccess='Show ScreenShot' onClick={() => showss(player.screenss)} />}
                            </div>
                        </div>
                        <div className='teamside'>
                            <span> <span>Team</span> <span>: {player?.teamName}</span></span>
                            <span> <span>Email</span> <span>: {player?.email || 'N/A'}</span></span>
                            <span> <span>Phone</span> <span>: {player?.mobile || 'N/A'}</span></span>
                            <span> <span>Discord</span> <span>: {player?.discordID || 'N/A'}</span></span>
                        </div>
                    </div>
                    <div className="playerdata">
                        <h2>Player List : </h2>
                        {player.player.map((each, ind) => {
                            return <div key={ind}>
                                <span>{ <img src={each.playerLogo ? each.playerLogo : user} alt="" />}</span>
                                <span>{each?.inGameName || 'N/A'}</span>
                                <span>{each?.inGameID || 'N/A'}</span>
                            </div>
                        })}
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
