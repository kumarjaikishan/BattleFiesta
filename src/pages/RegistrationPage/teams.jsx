
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import user from '../../assets/user.png'
import group from '../../assets/group2.png'

const Teams = ({ entry }) => {

    return (
        <>
            <div className="teamse">
                <h2>Team List</h2>
                {entry.map((player, ind) => {
                    return (<Accordion key={ind}
                        style={{ borderRadius: "10px", overflow: "hidden" }}
                        sx={{ mb: 1, minWidth: "95%" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            title={player.status}
                            className={`headere ${player.status}`}
                        // style={{ borderRight: "8px solid orange" }}
                        >
                            <img src={player.teamLogo ? player.teamLogo : group} alt="" /> <span>{player.teamName} </span> <span className={player.status}> { player.status}</span>
                        </AccordionSummary>
                        <AccordionDetails className='detailse'>
                            <div className="playerdata">
                                <h2>Player List : </h2>
                                {player.player.map((each, ind) => {
                                    return <div key={ind}>
                                        <span><img src={each.playerLogo ? each.playerLogo:user} alt="" /></span>
                                        <span>{each.inGameName}</span>
                                        <span>{each.inGameID}</span>
                                    </div>
                                })}
                            </div>
                        </AccordionDetails>
                       {player.status == "rejected" && <TextField
                            id="outlined-multiline-flexible"
                            label="Reason of Rejection  .."
                            multiline
                            color="error"
                            focused
                            inputProps={{style: {fontSize: 14}}}
                            InputLabelProps={{style: {fontSize: 18}}}
                            value={player.reason || "your Fault"}
                            maxRows={6}
                            sx={{minWidth:"96%", mb:1, ml:1}}
                        />}
                    </Accordion>)
                })}
            </div>
        </>
    )
}
export default Teams;