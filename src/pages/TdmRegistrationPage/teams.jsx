
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import user from '../../assets/user.webp'
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import group from '../../assets/group2.webp'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useState } from 'react';

const Teams = ({ entry, android, ios }) => {
    const [player, setplayer] = useState(entry);
    const [active, setactive] = useState(1)
    const setlist = (no) => {
        setactive(no)
        no == 1 && setplayer(entry)
        no == 2 && setplayer(android)
        no == 3 && setplayer(ios)
    }
    return (
        <>
            <div className="teamse">
                <h2>Player List</h2>
                <div>
                    <Badge sx={{ m: 2 }} min={1} badgeContent={entry.length} color="success">
                        <Button onClick={() => setlist(1)} variant={active == 1 ? "contained":'outlined'} color="secondary">All</Button>
                    </Badge>
                    <Badge sx={{ m: 2 }} min={1} badgeContent={android.length} color="success">
                        <Button onClick={() => setlist(2)} variant={active == 2 ? "contained":'outlined'} color="secondary">Android</Button>
                    </Badge>
                    <Badge sx={{ m: 2 }} min={1} badgeContent={ios.length} color="success">
                        <Button onClick={() => setlist(3)} variant={active == 3 ? "contained":'outlined'} color="secondary">Ios</Button>
                    </Badge>
                </div>
                {
                    entry.length < 1 && <div className="notfound">
                        <div>
                            <SentimentVeryDissatisfiedIcon className="sad" />
                            <h1>Ops! This List is Empty</h1>
                            <p>No Player Registered Yet</p>
                        </div>
                    </div>
                }
                {player.map((player, ind) => {
                    return (<Accordion key={ind}
                        style={{ borderRadius: "10px", overflow: "hidden" }}
                        sx={{ mb: 1, minWidth: "95%" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className={`headere ${player.status}`}
                        >
                            <img src={player.logo ? player.logo : user} alt="" />
                            <span>{player.name} </span>
                            <span className={player.status}> {player.status}</span>
                            <span style={{ fontSize: '13px' }}>-{player.os} </span>
                        </AccordionSummary>

                        {player.status == "rejected" && <TextField
                            id="outlined-multiline-flexible"
                            label="Reason of Rejection"
                            multiline
                            color="error"
                            focused
                            inputProps={{ style: { fontSize: 14 } }}
                            value={player.reason || "your Fault"}
                            maxRows={6}
                            sx={{ minWidth: "96%", mb: 1, ml: 1, mt: 2 }}
                        />}
                    </Accordion>)
                })}
            </div>
        </>
    )
}
export default Teams;