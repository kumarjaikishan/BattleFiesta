import './home.css'
import { useSelector, useDispatch } from 'react-redux';
import { setloader, header } from '../../store/login';
import { useEffect, useRef, useref } from 'react';
import Button from '@mui/material/Button';
import char from '../../assets/anime.webp'
import { NavLink } from 'react-router-dom';
import smile from '../../assets/home/smile.webp'
import forme from '../../assets/home/form.webp'
import joy from '../../assets/home/joy.webp'
import trophy from '../../assets/home/trophy.webp'
import cal from '../../assets/home/cal.webp'
import gal from '../../assets/home/gal.webp'
import graph from '../../assets/home/graph.webp'
import pie from '../../assets/home/pie.webp'
import tick from '../../assets/home/tick.webp'
import tick2 from '../../assets/home/tick2.webp'
import registerform from '../../assets/home/registrationform.webp'
import enterresult from '../../assets/home/enterresult.webp'
import createform from '../../assets/home/createform.webp'
import { motion, useInView, useAnimation } from 'framer-motion';

const Home = () => {
    const dispatch = useDispatch();
    const refer = useRef(null);
    const section3 = useRef(null);
    const section4 = useRef(null);
    const section5 = useRef(null);
    const section6 = useRef(null);

    const isInview = useInView(refer, { once: true });
    const isInview1 = useInView(section3, { once: true });
    const isInview2 = useInView(section4, { once: true });
    const isInview3 = useInView(section5, { once: true });
    const isInview4 = useInView(section6, { once: true });
    useEffect(() => {
        dispatch(header("Home"))
        dispatch(setloader(false))
    }, [])
    const control = useAnimation();
    const control1 = useAnimation();
    const control2 = useAnimation();
    const control3 = useAnimation();
    const control4 = useAnimation();
    useEffect(() => {
        // console.log(isInview);
        if (isInview) {
            control.start('visible');
        }
    }, [isInview])
    useEffect(() => {
        if (isInview1) {
            control1.start('visible');
        }
    }, [isInview1])
    useEffect(() => {
        if (isInview2) {
            control2.start('visible');
        }
    }, [isInview2])
    useEffect(() => {
        if (isInview3) {
            control3.start('visible');
        }
    }, [isInview3])
    useEffect(() => {
        console.log(isInview4);
        if (isInview4) {
            control4.start('visible');
        }
    }, [isInview4])
    const gradientStyle = {
        backgroundImage: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
    };
    const container = {
        hidden: { opacity: 0, scale: .2 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };
    const leftsection = {
        hidden: { opacity: 0, scale: .1, x: -200 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0
        }
    }
    const rightsection = {
        hidden: { opacity: 0, scale: .1, x: 200 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0
        }
    }

    return (
        <>
            <div className="home">
                <section className='section1'>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -200 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        initial='hidden'
                        animate='visible'
                        transition={{ duration: 1, delay: .5 }}
                        className="left-content">
                        <h2>Welcome to <span>BattleFiesta</span> </h2>
                        <h3>Managing Esport Tournament is Super Easy Now.</h3>
                        <p>Your ultimate destination for hosting and competing in PUBG/BGMI tournaments. Elevate your gaming experience with professional setups, exciting prizes, and an active gaming community.</p>
                        <p>Whether you're a seasoned competitor or just dipping your toes into the thrilling world of competitive
                            gaming, This Platform offers a seamless experience for both hosting and joining tournaments across various esports communities.we provide a comprehensive platform where players can easily organize, participate, and engage in electrifying esports competitions. Join us and
                            immerse yourself in the excitement of competitive gaming!"</p>
                        <div className="links">
                            <NavLink className="navlink" to='/dashboard'>Dashboard </NavLink>
                            <NavLink className="navlink" to='/tournaments'>Find Tournament </NavLink>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 200 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        initial='hidden'
                        animate='visible'
                        transition={{ duration: 1, delay: 1.2 }}
                        className="image">
                        <img src={char} alt="PUBG Character" />
                    </motion.div>
                </section>
                <section className='section2'>
                    <h1>What we Offers ?</h1>
                    <motion.div
                        ref={refer}
                        variants={container}
                        initial="hidden"
                        animate={control}
                        className='cards'>
                        <div className="card">
                            <img src={smile} alt="" />
                            <p className="title">
                                Easy Tournament Management
                            </p>
                            <p className="desc">
                                Effortlessly oversee all aspects of your eSports tournaments through a unified platform.
                            </p>
                        </div>
                        <motion.div variants={item} className="card">
                            <img src={pie} alt="" />
                            <p className="title">
                                Beautiful Points Table
                            </p>
                            <p className="desc">
                                As match results are inputted, the points table updates automatically, simplifying the management process.
                            </p>
                        </motion.div>
                        <motion.div variants={item} className="card">
                            <img src={graph} alt="" />
                            <p className="title">
                                Detailed Stats
                            </p>
                            <p className="desc">
                                Access a comprehensive stats page showcasing team and player statistics, highlighting top performers, killboard leaders, and other crucial metrics.
                            </p>
                        </motion.div>
                        <motion.div variants={item} className="card">
                            <img src={trophy} alt="" />
                            <p className="title">
                                Top Fraggers
                            </p>
                            <p className="desc">
                                Discover the elite players leading the fray with the top fraggers list prominently featured on the stats page.
                            </p>
                        </motion.div>
                        <motion.div variants={item} className="card">
                            <img src={gal} alt="" />
                            <p className="title">
                                Support Logos
                            </p>
                            <p className="desc">
                                Enable logo customization for players and teams during registration, with options to upload their own logos.
                            </p>
                        </motion.div>
                        <motion.div variants={item} className="card">
                            <img src={forme} alt="" />
                            <p className="title">
                                Registration Form
                            </p>
                            <p className="desc">
                                Utilize a registration form to gather entries for your tournament.
                            </p>
                        </motion.div>
                        <motion.div variants={item} className="card">
                            <img src={cal} alt="" />
                            <p className="title">
                                Custom Points System
                            </p>
                            <p className="desc">
                                Set your own points system or opt for the default one.
                            </p>
                        </motion.div>
                        <motion.div variants={item} className="card">
                            <img src={joy} alt="" />
                            <p className="title">
                                All Royal Battle Games
                            </p>
                            <p className="desc">
                                Leverage Esportsweb for a wide array of royal battle and multiplayer TDM games.
                            </p>
                        </motion.div>
                    </motion.div>
                </section>
                <section className='section3'>
                    <motion.div
                        ref={section3}
                        variants={leftsection}
                        transition={{ duration: .6, delay: .1 }}
                        initial="hidden"
                        animate={control1}
                        className="left">
                        <div className="img">
                            <img src={createform} alt="" />
                        </div>
                    </motion.div>
                    <motion.div
                        ref={section3}
                        variants={rightsection}
                        transition={{ duration: .6, delay: .1 }}
                        initial="hidden"
                        animate={control1}
                        className="right">
                        <h3>Create and manage tournaments in a go.</h3>
                        <p> <span><img src={tick2} alt="" /></span> <span>Create effortlessly with a single form.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Effortlessly Manage numerous matches and teams.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Customize your point system to suit your needs.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Easily add or disqualify teams with just one click.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Seamlessly manage reports for each match.</span></p>
                    </motion.div>
                </section>
                <section className='section4'>
                    <motion.div
                        ref={section4}
                        variants={leftsection}
                        transition={{ duration: .6, delay: .1 }}
                        initial="hidden"
                        animate={control2}
                        className="right">
                        <h3>Adding results of match made easy</h3>
                        <h4>The process of entering results data of a match has been been super user friendly. User experience has been the top most priority.</h4>
                        <p> <span><img src={tick} alt="" /></span> <span>Add the participating teams once.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>While entering results data, just select the team and no. of kills. We take care of the points calculation.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Select a team by just typing its player's name or the team name itself.</span></p>
                    </motion.div>
                    <motion.div
                        ref={section4}
                        variants={rightsection}
                        transition={{ duration: .6, delay: .1 }}
                        initial="hidden"
                        animate={control2}
                        className="left">
                        <div className="img">
                            <img src={enterresult} alt="" />
                        </div>
                    </motion.div>
                </section>
                <section className='section5'>
                    <motion.div
                        ref={section5}
                        variants={leftsection}
                        transition={{ duration: .6, delay: .1 }}
                        initial="hidden"
                        animate={control3}
                        className="left">
                        <div className="img">
                            <img src={registerform} alt="" />
                        </div>
                    </motion.div>
                    <motion.div
                        ref={section5}
                        variants={rightsection}
                        transition={{ duration: .6, delay: .1 }}
                        initial="hidden"
                        animate={control3}
                        className="right">
                        <h3>Auto-generated beautiful points table.</h3>
                        <h4>A beautiful points table is generated for your tournament. The standings are calculated using the points system provided during the creation of points table.</h4>
                        <p> <span><img src={tick2} alt="" /></span> <span>A dedicated points table web page is created solely for your tournament.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Points table is updated automatically each time you enter results of a new match.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Option to export the points table to an image file.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Detailed analytics.</span></p>
                        <Button variant="contained" size='small'>See Demo</Button>
                    </motion.div>
                </section>
                <section className='section6'>
                    <motion.div
                        ref={section6}
                        variants={leftsection}
                        transition={{ duration: .6, delay: .1 }}
                        initial="hidden"
                        animate={control4}
                        className="right">
                        <h3>Comes with pre-built registration form</h3>
                        <h4>With each eSports tournament you will get a dedicated registration form.</h4>
                        <p> <span><img src={tick} alt="" /></span> <span>Accept team's email, discord id, phone number etc.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Accept team and player logo.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Set maximum and minimum player required for registration.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Approve registration or decline. Its up to you.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Teamlist section for participant, to see their Registration Status- Approved, Pending or Rejected</span></p>
                    </motion.div>
                    <motion.div
                        ref={section6}
                        variants={rightsection}
                        transition={{ duration: .6, delay: .1 }}
                        initial="hidden"
                        animate={control4}
                        className="left">
                        <div className="img">
                            <img src={registerform} alt="" />
                        </div>
                    </motion.div>
                </section>
            </div>
        </>
    )
}
export default Home;