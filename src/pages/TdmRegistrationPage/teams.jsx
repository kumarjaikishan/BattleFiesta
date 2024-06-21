
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useEffect, useState } from 'react';

const Teams = ({ about, categoryenteries, entry }) => {
    const [player, setplayer] = useState(entry);
    const [category, setcategory] = useState('all');
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'
   
   
    const handlecategory = (e) => {
        setcategory(e.target.value);
        if(e.target.value=="all"){
            setplayer(entry)
        }else{
            categoryenteries.hasOwnProperty(e.target.value) ? setplayer(categoryenteries[e.target.value]) : setplayer([]);
        }
    }

    return (
        <>
            <div className="teamse">
                <h2>Player List</h2>
                <div style={{ margin:'5px 0px'}}>
                    <FormControl className="cominp" size="small" sx={{ mt: 1.6, width: '200px' }}>
                        <InputLabel id="demo-simple-select-label">Choose Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={about?.slotCategory ? category : ""}
                            required
                            name="os"
                            label="Choose Category"
                            onChange={handlecategory}
                        >
                        <MenuItem value={'all'}>All</MenuItem>
                            {
                                about?.slotCategory?.map((val, ind) => {
                                    return <MenuItem sx={{ textTransform: "capitalize" }} key={ind} value={ind}>{val.category}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
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
                {
                    !categoryenteries.hasOwnProperty(category)&& player?.length < 1 && <div className="notfound">
                        <div>
                            <SentimentVeryDissatisfiedIcon className="sad" />
                            <h1>Ops! This List is Empty</h1>
                            <p>No Player Registered under this Category Yet</p>
                        </div>
                    </div>
                }
                {player?.map((player, ind) => {
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