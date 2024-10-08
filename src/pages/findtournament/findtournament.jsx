import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setloader, header } from '../../store/login';
import './findtournas.css'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { IoMdSearch } from "react-icons/io";
import { TextField } from '@mui/material';
import { TbMoodSad } from "react-icons/tb";
import { MdContentCopy } from "react-icons/md";
import { MdMenuOpen } from "react-icons/md";
import { GiGamepad } from "react-icons/gi";
import { FaPlay } from "react-icons/fa6";
import { BiReset } from "react-icons/bi";

const Findtournament = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tournlogo = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1709654642/battlefiesta/assets/logo/logopng250_vuhy4f.webp';

    useEffect(() => {
        dispatch(header("Tournaments"));
        dispatch(setloader(true));
        fetchTournaments();
    }, []);

    const [ongoinglist, setOngoingList] = useState([]);
    const [upcominglist, setUpcomingList] = useState([]);
    const [completedlist, setCompletedList] = useState([]);
    const [showinglist, setShowingList] = useState([]);
    const [activeList, setActiveList] = useState([]); // Store the currently active list
    const [searchQuery, setSearchQuery] = useState("");

    const handleActive = (index) => {
        let alldiv = document.querySelectorAll(".conta .cate div");
        alldiv.forEach(div => div.classList.remove('active'));
        alldiv[index].classList.add("active");

        if (index === 0) {
            setShowingList(upcominglist);
            setActiveList(upcominglist); // Update the active list
        } else if (index === 1) {
            setShowingList(ongoinglist);
            setActiveList(ongoinglist); // Update the active list
        } else {
            setShowingList(completedlist);
            setActiveList(completedlist); // Update the active list
        }
    };

    const fetchTournaments = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}getalltournament`, {
                method: "GET"
            });

            const data = await response.json();
            console.log(data)
            dispatch(setloader(false));
            if (!response.ok) {
                return toast.warn(data.message, { autoClose: 2000 });
            }

            let ongoing = [];
            let upcoming = [];
            let completed = [];
            data.data.forEach(val => {
                if (val.status === 'ongoing') ongoing.push(val);
                if (val.status === 'upcoming') upcoming.push(val);
                if (val.status === 'completed') completed.push(val);
            });

            setOngoingList(ongoing);
            setUpcomingList(upcoming);
            setCompletedList(completed);
            setShowingList(upcoming);
            setActiveList(upcoming); // Set the default active list
        } catch (error) {
            console.log(error);
            dispatch(setloader(false));
        }
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === "") {
            // If searchQuery is empty, restore the active list
            setShowingList(activeList);
            return toast.warn("Search is Empty", { autoClose: 1200 });
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}tournamnetsearch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tournid: searchQuery })
            });

            const data = await response.json();
            if (!response.ok) {
                return toast.warn(data.message, { autoClose: 1500 });
            }

            // Update showing list with the search result
            setShowingList([data.query]);
        } catch (error) {
            console.log(error);
        }
    };

    const findTournament = (tid) => {
        navigate(`/tournaments/${tid}`);
    };

    return (
        <div className="findtournas">
            <div className="conta">
                <div className="cate">
                    <div onClick={() => handleActive(0)} className="active">
                        <GiGamepad />
                        <span>UPCOMING</span>
                    </div>
                    <div onClick={() => handleActive(1)}>
                    <FaPlay/>
                        <span>ONGOING</span>
                    </div>
                    <div onClick={() => handleActive(2)}>
                       <BiReset/>
                        <span>COMPLETED</span>
                    </div>
                </div>
                <div>
                    <TextField
                        label="Tournament Id..."
                        fullWidth
                        size="small"
                        className="filled"
                        value={searchQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchQuery(value);
                            if (value === "") {
                                setShowingList(activeList); // Restore active list on empty input
                            }
                        }}
                    />
                    <IoMdSearch onClick={handleSearch} title="Search" className="searchIcon" />
                </div>
            </div>
            <div className="cards">
                {showinglist.length < 1 && (
                    <div className="notfound">
                        <div>
                            <TbMoodSad className="sad" />
                            <h2>No Tournament Found</h2>
                            <p>This section will be auto updated once any Tournament comes under this section</p>
                        </div>
                    </div>
                )}
                {showinglist.map((val) => {
                    const formattedDate = new Date(val.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    });

                    const formattedTime = new Date(val.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                    });

                    return (
                        <div className="card" key={val._id}>
                            <div className="img">
                                <img
                                    loading="lazy"
                                    src={val.tournment_logo ? val.tournment_logo : tournlogo}
                                    alt="logo"
                                />
                                <span title={val.title}>{val.title}</span>
                            </div>
                            <h3 className="organiser">- {val.organiser}</h3>
                            <div className="time">
                                {formattedDate}, {formattedTime} <span>{val.type}</span>
                            </div>
                            <div className="tournId">
                                ID :- {val.tournid}
                                <MdContentCopy title="Copy Id" onClick={() => {
                                    navigator.clipboard.writeText(val.tournid);
                                    toast.success('Copied', { autoClose: 1000 })
                                }} />
                            </div>
                            <div className="controller">
                                <Button size="small" onClick={() => findTournament(val._id)} variant="contained" endIcon={<MdMenuOpen />}>
                                    READ MORE
                                </Button>
                                <p className="status" title="Status">{val.status}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Findtournament;
