
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Teams = ({ entry }) => {
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950086/battlefiesta/assets/icon/group2_gqiyup.webp'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'
   

    return (
        <>
            <div className="teamse">
                <h2>Team List</h2>
                {
                    entry.length < 1 && <div className="notfound">
                        <div>
                            <SentimentVeryDissatisfiedIcon className="sad" />
                            <h1>Ops! This List is Empty</h1>
                            <p>No Team Registered Yet</p>
                        </div>
                    </div>
                }
                {entry.map((player, ind) => {
                    return (<Accordion key={ind}
                        style={{ borderRadius: "10px", overflow: "hidden" }}
                        sx={{ mb: 1, minWidth: "95%" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className={`headere ${player.status}`}
                        >
                            <img src={player.teamLogo ? player.teamLogo : group} alt="" /> <span>{player.teamName} </span> <span className={player.status}> {player.status}</span>
                        </AccordionSummary>
                        <AccordionDetails className='detailse'>
                            <div className="playerdata">
                                <h2>Player List : </h2>
                                {player.player.map((each, ind) => {
                                    return <div key={ind}>
                                        <span><img src={each.playerLogo ? each.playerLogo : user} alt="" /></span>
                                        <span title='InGameName'>{each.inGameName}</span>
                                        <span title='InGameID'>{each?.inGameID || 'N/A'}</span>
                                    </div>
                                })}
                            </div>
                        </AccordionDetails>
                        {player.status == "rejected" && <TextField
                            id="outlined-multiline-flexible"
                            label="Reason of Rejection"
                            multiline
                            color="error"
                            focused
                            inputProps={{ style: { fontSize: 14 } }}
                            value={player.reason || "your Fault"}
                            maxRows={6}
                            sx={{ minWidth: "96%", mb: 1, ml: 1 }}
                        />}
                    </Accordion>)
                })}
            </div>
        </>
    )
}
export default Teams;