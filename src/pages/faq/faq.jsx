
import Accordion from '@mui/material/Accordion';
import './faq.css'
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

const Faq = () => {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="faq">
            <div className="accord">
                <h1>Frequently Asked Question</h1>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            What is BattleFiesta ?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            BattleFiesta is your go-to platform for effortlessly creating, managing, and tracking esports tournaments.
                            Say goodbye to manual tasks - it streamlines everything from team management to points calculation, all in one
                            convenient place. Plus, each tournament gets its own dedicated points table web page for easy access.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>How to create a tournament ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p> 1.  Log in to the dashboard.</p>
                            <p> 2.  Click on the 'Create a new tournament' card.</p>
                            <p> 3.  Fill up the details asked. Click 'create'.</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            How to add match results ?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p>  1. Log in to your dashboard. </p>
                            <p>2. Click on 'manage' in the desired tournament card.</p>
                            <p>3. Go to 'enter results' section.</p>
                            <p>4. Add team name and their kills count for the respective place.
                                You can search a team name by either typing the team name or any of the player's name.</p>
                            <p>5. After adding all the data, click 'finish and save' to save data to the cloud.
                            </p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Why to use BattleFiesta ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Focus on organizing your tournaments while leaving technical tasks like Points Table calculation to our app.
                            Save time and access all your data securely from any device, anywhere, thanks to cloud storage.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>How to add participating teams ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p>1.  Log in to your dashboard.</p>
                            <p>2. Click on 'manage' in the desired tournament card.</p>
                            <p>3. Go to the 'Teams' section</p>
                            <p>4. Fill team's name and players' name</p>
                            <p>5. Click on 'Add Team' to save.</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '60%', flexShrink: 0 }}>Where do I find automatically generated Points tables ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p> There are two types of points tables available. The first type is for the entire tournament and is accessible to anyone via a separate webpage. You can locate the link to this page in the dashboard under "Tournament."
                            </p> <br /> <p>
                                The second type of points table is specific to each match and can be found in the dashboard under "Tournament" as well. However, this points table is only visible to you. You can still share it by taking a screenshot.
                            </p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '60%', flexShrink: 0 }}>Is BattleFiesta is safe ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Yes, the data is stored securely in the server. For authentication, Google Firebase has been used so that no one else can access your data.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}
export default Faq;