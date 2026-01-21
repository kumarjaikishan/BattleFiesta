import { useEffect, useState, useMemo, useRef } from 'react';
import './channeldashboard.css';
import { useParams, useNavigate } from 'react-router-dom';
import { MdMenuOpen, MdContentCopy } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setloader } from '../../store/login';
import { SlUserFollow } from "react-icons/sl";
import { SlUserFollowing } from "react-icons/sl";
import { toast } from 'react-toastify';
import { MdPinDrop } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { MdInsertLink } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbTournament } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import {  Button} from "@mui/material";
import { TbMoodSad } from "react-icons/tb";
import logo from '../../assets/logowebp_250.webp'
import { useSelector } from 'react-redux';
import confetti from 'canvas-confetti';
import { Helmet } from "react-helmet-async";
import { LuGamepad2 } from "react-icons/lu";
import { cloudinaryUrl } from '../../utils/imageurlsetter';
import TournamentCard from '../findtournament/FindTournCard';
import dayjs from 'dayjs';

const Channeldashboard = () => {
  const dispatch = useDispatch();
  const { uid } = useParams();
  const navigate = useNavigate();
  const log = useSelector((state) => state.login);
  const userprofile = useSelector((state) => state.userprofile);

  const [pro, setPro] = useState(null);
  const [tournas, settournas] = useState(null);
  const [error, setError] = useState(null);
  const [isfollowing, setisfollowing] = useState(false);
  const [loading, setloading] = useState(false)
  const followBtnRef = useRef(null);


  useEffect(() => {
    dispatch(setloader(true)); // Set loader when component mounts
    fetchData();
    // console.log(userprofile.userprofile.username)
  }, [log.islogin]);


  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const url = log.islogin ? `${import.meta.env.VITE_API_ADDRESS}loginchannel` : `${import.meta.env.VITE_API_ADDRESS}channel`;
    const headers = {
      "Content-Type": "application/json",
      ...(log.islogin && { "Authorization": `Bearer ${token}` })
    };
    const body = JSON.stringify({ uid: uid.split('@')[1] });

    try {
      const response = await fetch(url, { method: 'POST', headers, body });
      const result = await response.json();
      dispatch(setloader(false));
      // console.log(result)

      if (!response.ok) {
        setError(result.message);
        toast.warn(result.message, { autoClose: 1900 });
        return;
      }

      setPro(result.data);
      settournas(result.tournaments);
      console.log(result.tournaments)
      if (log.islogin) {
        setisfollowing(result.isfollowed);
      }
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Something went wrong, please try again.');
      dispatch(setloader(false));
    }
  };

  const dofollow = async (flag) => {
    // console.log(flag)
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.warn('You are not Logged In', { autoClose: 1900 });
    }
    const channeluserid = pro._id;
    try {
      setloading(true)
      const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}follow`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ flag, channeluserid })
      });
      const result = await rese.json();
      // console.log(result)
      setloading(false)

      if (!rese.ok) {
        toast.warn(result.message, { autoClose: 1900 });
        return;
      }
      // toast.success(result.message, { autoClose: 1500 });
      setisfollowing(flag)

      if (flag && followBtnRef.current) {
        const rect = followBtnRef.current.getBoundingClientRect();
        const originX = (rect.left + rect.right) / 2 / window.innerWidth;
        const originY = (rect.top + rect.bottom) / 2 / window.innerHeight;

        confetti({
          particleCount: 50, // Reduce to make it localized
          spread: 360, // Full 360-degree spread
          origin: { x: originX, y: originY },
          scalar: 0.9, // Smaller particles for a closer effect
          startVelocity: 30, // Lower speed for burst-like effect
          decay: 0.8, // Faster decay to limit the range
        });
      }

      fetchData();
      setError(null);  // Clear error if fetch is successful
    } catch (error) {
      setloading(false)
      console.error(error);
      toast.error(error.message, { autoClose: 1900 });
    }
  };

  function copyfunc(text) {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Copied', { autoClose: 1000 }))
      .catch(err => toast.error('Failed to copy', { autoClose: 1000 }));
  }

  const socialIcons = useMemo(() => ({
    youtube: <FaYoutube />,
    facebook: <CiFacebook />,
    instagram: <FaInstagram />,
    telegram: <FaTelegramPlane />,
    discord: <LuGamepad2 />,
    twitter: <FaTwitter />,
    website: <IoMdLink />
  }), []);

  if (error) {
    return (
      <div className='channeldashboard'>
        <h2>Oops, {error}</h2>
      </div>
    );
  }
  if (!pro) {
    return;  // Show loader until profile data is set
  }
  const defaultcoverimage = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1730449433/battlefiesta/coverpic/bgmi-33-update-image-2_tfng.1080_myyj43.webp'

  return (
    <div className='channeldashboard'>
      <Helmet>
        <title>{pro.name} | Battlefiesta</title>
        <link rel="canonical" href={`${window.location.origin}/profile`} />
        <meta name="description"
          content="Manage your BattleFiesta profile, update personal details, track tournament history, and customize settings for a better gaming experience." />
      </Helmet>
      <div className="profile">
        <div className="upperinfo">
          <div className="coverimage">
            <img
              // src={pro.coversrc || defaultcoverimage}
              src={cloudinaryUrl(pro?.coversrc, {
                format: "webp",
                // width: 600,
                //   height: 300,
              }) || defaultcoverimage}
              alt="cover image" />
          </div>

          <div className="maininfo">
            <div className="top">
              <div className="profileimage">
                <img
                  // src={pro.imgsrc || logo} 
                  src={cloudinaryUrl(pro?.imgsrc, {
                    format: "webp",
                    width: 200,
                    //   height: 300,
                  }) || logo}
                  alt="profile image" />
                <div className='names'>
                  <h2>{pro.name} {pro.bluetick && <MdVerified className='sve' />}</h2>
                  <span>{uid}</span> <br />
                  {pro.city && pro.state ? (
                    <span className='address' >
                      <MdPinDrop /> {pro.city}, {pro.state}
                    </span>
                  ) : pro.city || pro.state ? (
                    <span style={{ fontSize: '12px', marginLeft: '10px', textTransform: 'capitalize' }}>
                      ({pro.city || pro.state})
                    </span>
                  ) : null}
                </div>
              </div>
              <div className='mis'>
                <div className="tournament infoo">
                  <div><TbTournament /> Tournaments</div>
                  <p>{tournas.length}</p>
                  <i>(Private included)</i>
                </div>
                <div className="followers infoo">
                  <div><FaPeopleGroup /> Followers</div>
                  <p>{pro.followers.length || 0}</p>
                </div>
              </div>
              <div className='followsbtn'>
                {userprofile?.userprofile?.username === uid.split('@')[1] ? (
                  <Button
                    title='Edit Profile'
                    variant="outlined"
                    onClick={() => navigate('/profile')}
                    sx={{ fontWeight: 700 }}
                    startIcon={<MdEdit />}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    ref={followBtnRef}
                    loading={loading}
                    sx={{ fontWeight: 600 }}
                    loadingPosition="start"
                    startIcon={isfollowing ? <SlUserFollowing /> : <SlUserFollow />}
                    variant={isfollowing ? "outlined" : "contained"}
                    onClick={() => dofollow(!isfollowing)}
                  >
                    {isfollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='more'>
        <div className="about">
          <h2>About</h2>
          {(!pro.bio && !pro.publicphone && !pro.publicemail) && <p>No Details Provided</p>}
          <p style={{ marginBottom: '12px' }}> {pro.bio}</p>
          {pro.publicphone && <div> <MdLocalPhone /> {pro.publicphone}</div>}
          {pro.publicemail && <div> <IoIosMail /> {pro.publicemail}</div>}
        </div>
        <div className="socallink">
          <h2>Social Links</h2>
          {pro.sociallinks.length < 1 && <div>No Details Provided</div>}
          {pro.sociallinks?.map((val, ind) => (
            <div key={ind}>
              <span className="icon">{socialIcons[val.name]}</span>
              <a href={val.link} target="_blank" rel="noopener noreferrer">
                <span>{val.link}</span></a>
              <MdContentCopy className='copyicon' title='Copy Link' onClick={() => copyfunc(val.link)} />
            </div>
          ))}
        </div>
      </div>

      <div className="tournamentss relative w-full max-w-[1000px] mt-5 grid 
         grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 
           **:  justify-items-center mx-auto">
        {tournas &&
          tournas
            .filter((tourn) => tourn.visibility)
            .map((tourn, ind) => {
              return (
                <div
                  key={tourn._id || ind}
                  className="relative w-60 bg-white rounded-lg overflow-hidden h-fit pb-2
                            shadow-[6px_6px_16px_rgba(0,0,0,0.25)]
                            hover:shadow-[10px_10px_24px_rgba(0,0,0,0.3)]
                            transition-all duration-300 hover:-translate-y-1 "
                >
                  {/* IMAGE */}
                  <div className="relative h-56 w-full overflow-hidden bg-[radial-gradient(circle_at_center,transparent_30%,#6d6f71)]">
                    <img
                      loading="lazy"
                      src={
                        cloudinaryUrl(tourn?.tournment_logo, {
                          format: "webp",
                          width: 300,
                        }) || logo
                      }
                      alt={tourn.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {/* TITLE OVERLAY */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-3 pt-6 pb-1">
                      <h3
                        title={tourn.title}
                        className="text-white text-sm font-bold tracking-wide truncate uppercase"
                      >
                        {tourn.title}
                      </h3>
                    </div>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold uppercase
                    ${tourn.status === "ongoing"
                        ? "bg-green-100 text-green-700"
                        : tourn.status === "completed"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    title="Status"
                  >
                    {tourn.status}
                  </span>

                  {/* CONTENT */}
                  <div className="px-3 py-2 space-y-1 text-sm text-slate-800">
                    <p className="font-medium text-gray-800">
                      - {tourn.organiser}
                    </p>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        ID-{tourn.tournid}
                        <MdContentCopy
                          title="Copy ID"
                          className="cursor-pointer hover:text-teal-600"
                          onClick={() => copyfunc(tourn.tournid)}
                        />
                      </span>

                      <span>
                        {dayjs(tourn.createdAt).format('DD MMM, YYYY')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-white uppercase">
                        {tourn.type}
                      </span>
                    </div>
                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() => navigate(`/tournaments/${tourn._id}`)}
                    className="
                 mt-1 w-40 h-8 text-white
                bg-[url('/btn-bg1.webp')]
                bg-contain bg-no-repeat bg-center
                transition-all duration-200
                flex items-center justify-center gap-2
                hover:-translate-y-0.5
              "
                  >
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      Read More <MdMenuOpen className="text-base" />
                    </span>
                  </button>
                </div>
              );
            })}
      </div>

      {tournas?.filter((tourn) => tourn.visibility).length < 1 &&
        <div className=" col-span-full flex justify-center">
          <div
            className="
                                    w-95vw lg:w-120  text-center rounded-xl p-2
                                    shadow-md border border-dashed border-gray-400
                                    hover:shadow-lg transition
                                    hover:-translate-y-1
                                  "
          >
            <TbMoodSad className="text-8xl mx-auto text-gray-600 mb-2" />

            <p className="text-sm text-gray-700 mt-1 mb-4">
              No Public Tournament Found
            </p>
          </div>
        </div>
      }
      
    </div >
  );
};

export default Channeldashboard;
