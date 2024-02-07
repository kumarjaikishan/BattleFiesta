import './home.css'
import { useSelector, useDispatch } from 'react-redux';
import { setloader } from '../../store/login';
import { useEffect } from 'react';
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
import registerform from '../../assets/home/registerform.webp'

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setloader(false))
    }, [])
    const gradientStyle = {
        backgroundImage: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
    };
    return (
        <>
            <div className="home">
                <section className='section1'>
                    <div className="left-content">
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
                    </div>
                    <div className="image">
                        <img src={char} alt="PUBG Character" />
                    </div>
                </section>
                <section className='section2'>
                    <h1>What we Offers ?</h1>
                    <div className='cards'>
                        <div className="card">
                            <img src={smile} alt="" />
                            <p className="title">
                                Easy Tournament Management
                            </p>
                            <p className="desc">
                                Easily manage eSport tournament from a single platform
                            </p>
                        </div>
                        <div className="card">
                            <img src={pie} alt="" />
                            <p className="title">
                                Beautiful Points Table
                            </p>
                            <p className="desc">
                                Points table are automatically managed as you enter results for each match.
                            </p>
                        </div>
                        <div className="card">
                            <img src={graph} alt="" />
                            <p className="title">
                                Detailed Stats
                            </p>
                            <p className="desc">
                                Get stats page thats shows teams and player statistics. Top performers, Killboard Leaders, and more
                            </p>
                        </div>
                        <div className="card">
                            <img src={trophy} alt="" />
                            <p className="title">
                                Top Fraggers
                            </p>
                            <p className="desc">
                                Get top fraggers list in the stats page
                            </p>
                        </div>
                        <div className="card">
                            <img src={gal} alt="" />
                            <p className="title">
                                Support Logos
                            </p>
                            <p className="desc">
                                Set player logos and team Logos or let them upload their logos using registration forms.
                            </p>
                        </div>
                        <div className="card">
                            <img src={forme} alt="" />
                            <p className="title">
                                Registration Form
                            </p>
                            <p className="desc">
                                Use registration form for accepting registrations for your tournament.
                            </p>
                        </div>
                        <div className="card">
                            <img src={cal} alt="" />
                            <p className="title">
                                Custom Points System
                            </p>
                            <p className="desc">
                                Set your own points system or use default one.
                            </p>
                        </div>
                        <div className="card">
                            <img src={joy} alt="" />
                            <p className="title">
                                All Royal Battle Games
                            </p>
                            <p className="desc">
                                Use esportsweb for all types of royal battle games or multiplayer TDM games.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='section3'>
                    <div className="left">
                        <div className="img">
                            <img src={registerform} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <h3>Create and manage tournaments in a go.</h3>
                        <p> <span><img src={tick2} alt="" /></span> <span>Easy creation using a single form.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Manage multiple matches and teams.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Add your own point system.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Add or disqualify team with a single click.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Manage reports for each and every match.</span></p>
                    </div>
                </section>
                <section className='section4'>
                    <div className="right">
                        <h3>Adding results of match made easy</h3>
                        <h4>The process of entering results data of a match has been been super user friendly. User experience has been the top most priority.</h4>
                        <p> <span><img src={tick} alt="" /></span> <span>Add the participating teams once.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>While entering results data, just select the team and no. of kills. We take care of the points calculation.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Select a team by just typing its player's name or the team name itself.</span></p>
                    </div>
                    <div className="left">
                        <div className="img">
                            <img src={registerform} alt="" />
                        </div>
                    </div>
                </section>
                <section className='section5'>
                    <div className="left">
                        <div className="img">
                            <img src={registerform} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <h3>Auto-generated beautiful points table.</h3>
                        <h4>A beautiful points table is generated for your tournament. The standings are calculated using the points system provided during the creation of points table.</h4>
                        <p> <span><img src={tick2} alt="" /></span> <span>A dedicated points table web page is created solely for your tournament.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Points table is updated automatically each time you enter results of a new match.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Option to export the points table to an image file.</span></p>
                        <p> <span><img src={tick2} alt="" /></span> <span>Detailed analytics.</span></p>
                        <button>SEE DEMO</button>
                    </div>
                </section>
                <section className='section6'>
                    <div className="right">
                        <h3>Comes with pre-built registration form</h3>
                        <h4>With each eSports tournament you will get a dedicated registration form.</h4>
                        <p> <span><img src={tick} alt="" /></span> <span>Accept team's email, discord id, phone number etc.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Accept team and player logo.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Set maximum and minimum player required for registration.</span></p>
                        <p> <span><img src={tick} alt="" /></span> <span>Approve registration or decline. Its up to you.</span></p>
                    </div>
                    <div className="left">
                        <div className="img">
                            <img src={registerform} alt="" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Home;