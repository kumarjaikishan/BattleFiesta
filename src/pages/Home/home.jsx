import './home.css'
import { useSelector, useDispatch } from 'react-redux';
import { setloader } from '../../store/login';
import { useEffect } from 'react';
import char from '../../assets/anime.webp'
import { NavLink } from 'react-router-dom';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ImageIcon from '@mui/icons-material/Image';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CalculateIcon from '@mui/icons-material/Calculate';
import smile from '../../assets/home/smile.webp'
import forme from '../../assets/home/form.webp'
import joy from '../../assets/home/joy.webp'
import trophy from '../../assets/home/trophy.webp'

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
                        <h1>Welcome to BattleFiesta</h1>
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
                    <h1>What we Offers</h1>
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
                            <InsertEmoticonIcon className='log' />
                            <p className="title">
                                Beautiful Points Table
                            </p>
                            <p className="desc">
                               Points table are automatically managed as you enter results for each match.
                            </p>
                        </div>
                        <div className="card">
                            <InsertEmoticonIcon className='log' />
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
                            <ImageIcon className='log' />
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
                            <CalculateIcon className='log' />
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
            </div>
        </>
    )
}
export default Home;