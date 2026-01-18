import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setloader, header } from "../../store/login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, InputAdornment, Button } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { TbMoodSad } from "react-icons/tb";
import { GiGamepad } from "react-icons/gi";
import { FaPlay } from "react-icons/fa6";
import { BiReset } from "react-icons/bi";
import { Helmet } from "react-helmet-async";
import TournamentCard from "./FindTournCard";
import { MdMenuOpen } from "react-icons/md";

const Findtournament = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ongoinglist, setOngoingList] = useState([]);
    const [upcominglist, setUpcomingList] = useState([]);
    const [completedlist, setCompletedList] = useState([]);
    const [showinglist, setShowingList] = useState([]);
    const [activeList, setActiveList] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setsearching] = useState(false);
    const [visible, setvisible] = useState(20)

    useEffect(() => {
        dispatch(header("Tournaments"));
        dispatch(setloader(true));
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_ADDRESS}getalltournament`
            );
            const data = await res.json();
            dispatch(setloader(false));

            if (!res.ok) return toast.warn(data.message);

            const ongoing = [];
            const upcoming = [];
            const completed = [];

            data.data.forEach((t) => {
                if (t.status === "ongoing") ongoing.push(t);
                if (t.status === "upcoming") upcoming.push(t);
                if (t.status === "completed") completed.push(t);
            });

            setOngoingList(ongoing);
            setUpcomingList(upcoming);
            setCompletedList(completed);
            setShowingList(upcoming);
            setActiveList(upcoming);
        } catch {
            dispatch(setloader(false));
        }
    };

    const handleActive = (i) => {
        setActiveTab(i);
        setsearching(false);

        if (i === 0) {
            setShowingList(upcominglist);
            setActiveList(upcominglist);
        } else if (i === 1) {
            setShowingList(ongoinglist);
            setActiveList(ongoinglist);
        } else {
            setShowingList(completedlist);
            setActiveList(completedlist);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim())
            return toast.warn("Search is Empty", { autoClose: 1200 });

        if (searchQuery.length !== 8)
            return toast.warn("Tournament Id must be 8 Digits", { autoClose: 1200 });

        try {
            dispatch(setloader(true));
            const res = await fetch(
                `${import.meta.env.VITE_API_ADDRESS}tournamnetsearch`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tournid: searchQuery }),
                }
            );

            const data = await res.json();
            dispatch(setloader(false));

            if (!res.ok) return toast.warn(data.message);

            setsearching(true);
            setShowingList([data.query]);
        } catch {
            dispatch(setloader(false));
        }
    };

    return (
       <div className="findtournas relative min-h-[calc(100vh-var(--navheightmobile))] lg:min-h-[calc(100vh-var(--navheight))] bg-amber-50">
            <Helmet>
                <title>Find Tournaments || BattleFiesta</title>
            </Helmet>

            {/* CONTROLLER */}
            <div className="w-full top-(--navheightmobile) py-0.5 px-1.25 pb-1 md:py-1 bg-white sticky  z-10
                shadow-[5px_5px_10px_rgba(0,0,0,0.4)]
                flex flex-col sm:flex-row sm:h-[55px] sm:items-center justify-between gap-2">

                {/* TABS */}
                <div className="w-full sm:w-[65%] h-[30px] sm:h-[40px]
                flex justify-between items-center rounded-[10px]
                font-semibold text-[11px] md:text-[0.9em] tracking-wider">

                    {[
                        { icon: <GiGamepad />, label: "UPCOMING" },
                        { icon: <FaPlay />, label: "ONGOING" },
                        { icon: <BiReset />, label: "COMPLETED" },
                    ].map((t, i) => (
                        <div
                            key={i}
                            onClick={() => handleActive(i)}
                            className={`w-1/3 h-full flex items-center justify-center gap-2 rounded-md cursor-pointer
                          ${activeTab === i ? "bg-[var(--primarycolor)] text-white" : ""}`}
                        >
                            <span className="text-[20px] md:text-[24px]">{t.icon}</span>
                            <span>{t.label}</span>
                        </div>
                    ))}
                </div>

                {/* SEARCH */}
                <div className="w-full sm:w-auto flex items-center gap-2">
                    <TextField
                        label="Tournament ID"
                        size="small"
                        fullWidth
                        type="tel"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (!e.target.value) {
                                setShowingList(activeList);
                                setsearching(false);
                            }
                        }}
                        InputProps={{
                            endAdornment: searchQuery && (
                                <InputAdornment position="end">
                                    <IoClose
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setShowingList(activeList);
                                            setsearching(false);
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IoMdSearch
                        onClick={handleSearch}
                        className=" w-10 h-8 p-1.5 rounded cursor-pointer text-white
                      bg-[var(--primarycolor)] hover:bg-[var(--hovercolor)]"
                    />

                </div>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                gap-7 pt-5 md:p-3 justify-items-center">

                {showinglist.length === 0 && (
                    <div className="col-span-full text-center mt-6">
                        <TbMoodSad className="text-7xl mx-auto text-gray-400 mb-2" />
                        <p>No Tournament Found</p>
                    </div>
                )}

                {showinglist?.slice(0, visible).map((t) => (
                    <TournamentCard
                        key={t._id}
                        tournament={t}
                        onReadMore={(id) => navigate(`/tournaments/${id}`)}
                        showStatus={searching}
                    />
                ))}


            </div>

            {(showinglist.length > visible) &&
                <div
                    className=" w-full pb-2 text-center"
                >
                    <Button size="small"
                        onClick={() => setvisible(visible + 10)}
                        variant="contained" endIcon={<MdMenuOpen />}>
                        Load MORE
                    </Button>
                </div>
            }
        </div>
    );
};

export default Findtournament;
