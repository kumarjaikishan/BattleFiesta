import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setloader, header } from '../../store/login';
import './findtournas.css'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { TextField } from '@mui/material';
import { IoMdSearch } from "react-icons/io";
import { TbMoodSad } from "react-icons/tb";
import { MdContentCopy, MdMenuOpen, MdGroups } from "react-icons/md";
import { GiGamepad } from "react-icons/gi";
import { FaPlay } from "react-icons/fa6";
import { BiReset } from "react-icons/bi";
import { Helmet } from "react-helmet-async";
import tournlogo from '../../assets/logowebp_250.webp'
import InputAdornment from '@mui/material/InputAdornment';
import { IoClose } from "react-icons/io5";
import { cloudinaryUrl } from "../../utils/imageurlsetter";

const AllFindtournament = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const [searching, setsearching] = useState(false)

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
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}getalltournamentadmin`, {
                method: "GET"
            });

            const data = await response.json();
            // console.log(data)
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
            setShowingList(activeList);
            return toast.warn("Search is Empty", { autoClose: 1200 });
        }
        if (searchQuery.trim().length != 8) {
            setShowingList(activeList);
            return toast.warn("Tournament Id must be 8 Digits", { autoClose: 1200 });
        }

        try {
            dispatch(setloader(true));
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}tournamnetsearch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tournid: searchQuery })
            });

            const data = await response.json();
            console.log(data)
            dispatch(setloader(false));
            if (!response.ok) {
                return toast.warn(data.message, { autoClose: 1500 });
            }
            setsearching(true)
            // Update showing list with the search result
            setShowingList([data.query]);
        } catch (error) {
            dispatch(setloader(false));
            console.log(error);
        }
    };

    const findTournament = (tid) => {
        navigate(`/tournaments/${tid}`);
    };

    return (
        <div className="findtournas">
            <Helmet>
                <title>Find Tournaments || BattleFiesta</title>
                <link rel="canonical" href={`${window.location.origin}/tournaments`} />
                <meta name="description"
                    content="Discover and join exciting PUBG, BGMI, and Free Fire tournaments on BattleFiesta. Browse ongoing and upcoming competitions, check rankings with automatic points tables, and compete with top players." />
            </Helmet>
            <div className="conta">
                <div className="cate">
                    <div onClick={() => handleActive(0)} className="active">
                        <GiGamepad />
                        <span>UPCOMING</span>
                    </div>
                    <div onClick={() => handleActive(1)}>
                        <FaPlay />
                        <span>ONGOING</span>
                    </div>
                    <div onClick={() => handleActive(2)}>
                        <BiReset />
                        <span>COMPLETED</span>
                    </div>
                </div>
                <div>
                    <TextField
                        label="Tournament ID"
                        fullWidth
                        size="small"
                        type='tel'
                        inputProps={{ minLength: 8, maxLength: 8 }}
                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                        className="filled"
                        value={searchQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchQuery(value);
                            if (value === "") {
                                setShowingList(activeList); // Restore active list on empty input
                                setsearching(false)
                            }
                        }}
                        InputProps={{
                            endAdornment: searchQuery ? (
                                <InputAdornment className="cross" onClick={() => setSearchQuery("")} position="end" sx={{ cursor: "pointer" }}>
                                    <IoClose />
                                </InputAdornment>
                            ) : null,
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
                    const formattedDate = new Date(val.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    });

                    const formattedTime = new Date(val.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    });

                    return (
                        <div className="card" key={val._id}>
                            <div className="img">
                                <img
                                    loading="lazy"
                                    src={cloudinaryUrl(val?.tournment_logo, {
                                        format: "webp",
                                        width: 300,
                                        // height: 300,
                                    }) || tournlogo}
                                    alt="logo"
                                />
                                <span title={val.title}>{val.title}</span>
                            </div>
                            <h3 className="organiser">- {val.organiser}</h3>
                            <div className="time">
                                {formattedDate}, {formattedTime} <span>{val.type}</span>
                            </div>
                            <div className="tournId">
                                <span> ID :- {val.tournid}
                                    <MdContentCopy title="Copy Id" onClick={() => {
                                        navigator.clipboard.writeText(val.tournid);
                                        toast.success('Copied', { autoClose: 1000 })
                                    }} />
                                </span>
                                <span title={`${val.totalTeamsRegistered} out of ${val.slots} slots Registered (including Approved and Pending teams)`}> <MdGroups /> {val.totalTeamsRegistered} /{val.slots} </span>
                            </div>
                            {/* <div className="label">
                                {val.label.split(',').map((eac) => {
                                    return <span>{eac}</span>
                                })}
                            </div> */}
                            <div className="controller">
                                <Button size="small" onClick={() => findTournament(val._id)} variant="contained" endIcon={<MdMenuOpen />}>
                                    READ MORE
                                </Button>
                              
                                {searching &&
                                    <p className="status" title="Status">{val.status}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllFindtournament;
