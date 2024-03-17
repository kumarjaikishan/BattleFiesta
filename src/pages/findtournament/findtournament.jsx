import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setloader, header } from '../../store/login';
import './findtournas.css'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
import tournlogo from '../../assets/logopng250.webp'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Findtournament = () => {
    const dispatch = useDispatch();
    const tournacenter = useSelector((state) => state.tournacenter);
    const [alltournas, setalltournas] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(header("Tournaments"));
        dispatch(setloader(true));
        fetche();
    }, [])
    const [ongoinglist, setongoinglist] = useState([]);
    const [upcominglist, setupcominglist] = useState([]);
    const [completedlist, setcompletedlist] = useState([]);
    const [showinglist, setshowinglist] = useState([]);

    const handleactive = (index) => {
        let alldiv = document.querySelectorAll(".conta div");
        for (let i = 0; i < alldiv.length; i++) {
            alldiv[i].classList.remove('active');
        }
        // setactive(index);
        alldiv[index].classList.add("active")

        index == 0 && setshowinglist(upcominglist);
        index == 1 && setshowinglist(ongoinglist);
        index == 2 && setshowinglist(completedlist);
    }

    const fetche = async () => {
        try {
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}getalltournament`, {
                method: "GET"
            });

            const data = await responsee.json();
            // console.log(data);
            if (responsee.ok) {
                setalltournas(data.data)
                let one = [];
                let two = [];
                let three = [];
                data.data.map((val) => {
                    val.status == 'ongoing' && one.push(val);
                    val.status == 'upcoming' && two.push(val);
                    val.status == 'completed' && three.push(val);
                })
                setongoinglist(one); setupcominglist(two); setcompletedlist(three);
                setshowinglist(two)
                dispatch(setloader(false));
            }
        } catch (error) {
            console.log(error);
            dispatch(setloader(false));
        }
    }
    const findtournament = (tid) => {
        return navigate(`/tournaments/${tid}`)
    }
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.4,
                staggerChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { x: -80, y: 80, opacity: 0, scale: 0 },
        visible: { y: 0, x: 0, scale: 1, opacity: 1 }
    };
    return (
        <>
            <div className="findtournas">
                <div className="conta">
                    <div onClick={() => handleactive(0)} className="active">
                        <span><i className="fa fa-gamepad" aria-hidden="true"></i></span>
                        <span>UPCOMING</span>
                    </div>
                    <div onClick={() => handleactive(1)} >
                        <span><i className="fa fa-play" aria-hidden="true"></i></span>
                        <span>ONGOING</span>
                    </div>
                    <div onClick={() => handleactive(2)}>
                        <span><i className="fa fa-undo" aria-hidden="true"></i></span>
                        <span>COMPLETED</span>
                    </div>
                </div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="cards">
                    {showinglist.length < 1 && <div className="notfound">
                        <div>
                            <SentimentDissatisfiedIcon className="sad" />
                            <h2>No Tournament Found</h2>
                            <p>Please Add Tournament.</p>
                        </div>
                    </div>}
                    {showinglist.map((val, ind) => {
                        const formattedDate = new Date(val.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        );

                        // Format the time
                        const formattedTime = new Date(val.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: true,
                            }
                        );

                        return <motion.div
                            variants={item}
                            className="card" key={val._id}>
                            <div className="img">
                                <img
                                    loading="lazy"
                                    src={val.tournment_logo ? val.tournment_logo : tournlogo}
                                    alt="logo"
                                />
                                <span>{val.title}</span>
                            </div>
                            <h3 className="organiser">by {val.organiser}</h3>
                            <div className="time">
                                {formattedDate}, {formattedTime}
                            </div>
                            <div className="controller">
                                <Stack spacing={2} direction="row" sx={{ ml: 2 }}>
                                    <Button size="small" onClick={() => findtournament(val._id)} variant="contained" endIcon={<MenuOpenIcon />}>READ MORE</Button>
                                    <p className="status">{val.status}</p>
                                </Stack>
                            </div>
                        </motion.div>
                    })}
                </motion.div>
            </div>
        </>
    )
}

export default Findtournament;