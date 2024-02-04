import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './findtournas.css'
import {useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Findtournament = () => {
    const tournacenter = useSelector((state) => state.tournacenter);
    const [alltournas, setalltournas] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetche();
    }, [])
    const [ongoinglist, setongoinglist] = useState([]);
    const [upcominglist, setupcominglist] = useState([]);
    const [completedlist, setcompletedlist] = useState([]);
    const [showinglist, setshowinglist] = useState([]);

    const [activecont, setactivecont] = useState(0);
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

    let defaultlogo = "https://res.cloudinary.com/dusxlxlvm/image/upload/v1699090690/just_yoljye.png";

    const fetche = async () => {
        try {
            const responsee = await fetch(`${tournacenter.apiadress}/getalltournament`, {
                method: "GET"
            });

            const data = await responsee.json();
            console.log(data);
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
            }
        } catch (error) {
            console.log(error);
        }
    }
    const findtournament = (tid) => {
       return navigate(`/tournaments/${tid}`)
    }
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
                <div className="cards">
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

                        return <div className="card" key={val._id}>
                            <div className="img">
                                <img
                                    src={val.tournment_logo ? val.tournment_logo : defaultlogo}
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
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Findtournament;