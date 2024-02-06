import './home.css'
import { useSelector, useDispatch } from 'react-redux';
import { setloader } from '../../store/login';
import { useEffect } from 'react';
import char from '../../assets/anime.webp'
import { NavLink } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setloader(false))
    }, [])
    return (
        <>
            <div className="home">
                <section className='section1'>
                    <div class="left-content">
                        <h1>Welcome to BattleFiesta</h1>
                        <h3>Managing Esport Tournament is Super Easy Now.</h3>
                        <p>Your ultimate destination for hosting and competing in PUBG/BGMI tournaments. Elevate your gaming experience with professional setups, exciting prizes, and an active gaming community.</p>
                        <div class="links">
                            <NavLink className="navlink" to='/dashboard'>Dashboard </NavLink>
                            <NavLink className="navlink" to='/tournaments'>Find Tournament </NavLink>
                        </div>
                    </div>

                    <div className="image">
                        <img src={char} alt="PUBG Character" />
                    </div>

                </section>
                <section className='section2'>

                </section>
            </div>
        </>
    )
}
export default Home;