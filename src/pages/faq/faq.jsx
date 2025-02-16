
import Accordion from '@mui/material/Accordion';
import './faq.css'
import AccordionDetails from '@mui/material/AccordionDetails';
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Helmet } from "react-helmet-async";

const Faq = () => {

    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const log = useSelector((state) => state.login);
    const userprofile = useSelector((state) => state.userprofile);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        // console.log(userprofile)
    }, [])

    return (
        <div className="faq">
            <Helmet>
                <meta charSet="utf-8" />
                <title>FAQ || BattleFiesta</title>
                <link rel="canonical" href={`${window.location.origin}/faq`} />
                <meta name="description"
                    content="Find answers to common questions about BattleFiesta. Learn how to create and manage PUBG, BGMI, and Free Fire tournaments, generate automatic points tables, and get the most out of our platform." />
            </Helmet>

            <div className="accord">
                <h1>Frequently Asked Question</h1>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDown />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography >
                            What is BattleFiesta ?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            BattleFiesta is your ultimate platform for seamlessly creating, managing, and tracking esports tournaments with automatic points tables that update instantly.
                            Simplify your workflow with features like team management, automatic points calculation, and personalized points
                            table web pages for each tournament.  Enhance your tournaments with support for team logos, and streamline payments
                            with UPI QR codes, all in one convenient place. Say goodbye to manual tasks and elevate your esports experience with BattleFiesta!
                        </Typography>
                        <Button sx={{ mt: 1 }} variant='contained'
                            onClick={() => {
                                window.open('https://www.youtube.com/watch?v=vDEUTuRPZHM');
                            }}
                            startIcon={<FaRegEye />} color='secondary'> Watch Tutorial
                        </Button>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDown />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography >How to create a tournament ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='details'>
                        <Typography>
                            <ol type="1">
                                <li>Log in to the dashboard.</li>
                                <li>Click on the 'Create a new tournament' card.</li>
                                <li>Fill up the details asked. Click 'create'.</li>
                            </ol>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDown />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography >
                            How to add match results ?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className='details'>
                        <Typography>
                            <ol type="1">
                                <li>Log in to your dashboard. </li>
                                <li>Click on 'manage' in the desired tournament card.</li>
                                <li>Go to 'enter results' section.</li>
                                <li>Add team name and their kills count for the respective place.
                                    You can search a team name by either typing the team name or any of the player's name.</li>
                                <li>After adding all the data, click 'finish and save' to save data to the cloud.
                                </li>
                            </ol>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDown />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography >Why to use BattleFiesta ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Focus on organizing your tournaments while leaving technical tasks like Points Table calculation to our app.
                            Save time and access all your data securely from any device, anywhere, thanks to cloud storage.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDown />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography >
                            Advantages of Username ?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            When you sign up with BattleFiesta, a unique UserID (email) is assigned to you. This UserID
                            can later be changed, subject to availability. Your UserID serves as your identity on the platform,
                            allowing your followers or other users to easily view your profile, including all your activities,
                            tournaments, and participation details—all in one place.
                            <br /> <br />
                            Additionally, logged-in users can follow your profile to stay updated on your tournaments and activities.
                            BattleFiesta ensures seamless engagement and connectivity within the esports community.
                        </Typography>
                        {log.islogin ?
                            <Button sx={{ mt: 1 }} variant='contained'
                                onClick={() => navigate(`/channel/@${userprofile.userprofile.username}`)}
                                startIcon={<FaRegEye />} color='secondary'> Your Profile
                            </Button> :
                            <Button sx={{ mt: 1 }} variant='contained'
                                onClick={() => navigate(`/channel/@battlefiesta`)}
                                startIcon={<FaRegEye />} color='secondary'> Admin Profile
                            </Button>
                        }
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDown />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography >How to add participating teams ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='details'>
                        <Typography>
                            <ol type="1">
                                <li>Log in to your dashboard.</li>
                                <li>Click on 'manage' in the desired tournament card.</li>
                                <li>Go to the 'Teams' section</li>
                                <li>Fill team's name and players' name</li>
                                <li>Click on 'Add Team' to save.</li>
                            </ol>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDown />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography >Where do I find automatically generated Points tables ?</Typography>
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
                        expandIcon={<IoIosArrowDown />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography >Is BattleFiesta is safe ?</Typography>
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