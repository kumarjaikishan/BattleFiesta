import { useEffect, useState } from 'react';
import './channeldashboard.css';
import { useParams } from 'react-router-dom';
import { MdMenuOpen, MdContentCopy } from "react-icons/md";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setloader } from '../../store/login';
import { SlUserFollow } from "react-icons/sl";
import { SlUserFollowing } from "react-icons/sl";
import { toast } from 'react-toastify';
import { FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdInsertLink } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import LoadingButton from '@mui/lab/LoadingButton';
import logo from '../../assets/logopng250.webp'
import { useSelector } from 'react-redux';

const Channeldashboard = () => {
  const dispatch = useDispatch();
  const { uid } = useParams();
  const log = useSelector((state) => state.login);

  const tournlogo = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1709654642/battlefiesta/assets/logo/logopng250_vuhy4f.webp';

  const [pro, setpro] = useState(null);
  const [tournas, settournas] = useState(null);
  const [error, setError] = useState(null);
  const [isfollowing, setisfollowing] = useState(false);


  useEffect(() => {
    dispatch(setloader(true)); // Set loader when component mounts
    firstfetch();
  }, []);
  const firstfetch = () => {
    log.islogin && fetchelogin();
    !log.islogin && fetche();
  }

  const fetche = async () => {
    try {
      const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}channel`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ uid: uid.split('@')[1] })
      });
      const result = await rese.json();
      console.log(result)

      dispatch(setloader(false));
      if (!rese.ok) {
        setError(result.message);  // Set error message if username is incorrect
        toast.warn(result.message, { autoClose: 1900 });
        return;
      }

      setpro(result.data);  // Set profile data
      settournas(result.tournaments);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Something went wrong, please try again.');  // Set a generic error
      dispatch(setloader(false));  // Remove loader on error
    }
  };
  const fetchelogin = async () => {
    const token = localStorage.getItem("token");
    try {
      const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}loginchannel`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ uid: uid.split('@')[1] })
      });
      const result = await rese.json();
      console.log(result)

      dispatch(setloader(false));
      if (!rese.ok) {
        setError(result.message);  // Set error message if username is incorrect
        toast.warn(result.message, { autoClose: 1900 });
        return;
      }

      setpro(result.data);  // Set profile data
      settournas(result.tournaments);
      setisfollowing(result.isfollowed)
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Something went wrong, please try again.');  // Set a generic error
      dispatch(setloader(false));  // Remove loader on error
    }
  };
  const dofollow = async (flag) => {
    console.log(flag)
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.warn('You are not Logged In', { autoClose: 1900 });
    }
    const channeluserid = pro._id;
    try {
      const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}follow`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ flag, channeluserid })
      });
      const result = await rese.json();
      console.log(result)

      if (!rese.ok) {
        toast.warn(result.message, { autoClose: 1900 });
        return;
      }
      toast.success(result.message, { autoClose: 1500 });
      firstfetch();
      setError(null);  // Clear error if fetch is successful
    } catch (error) {
      console.error(error);
      toast.error(error.message, { autoClose: 1900 });
    }
  };

  // Display error message if username is incorrect
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
  function copyfunc(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied', { autoClose: 1000 });
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        toast.error('Failed to copy', { autoClose: 1000 });
      });
  }

  const fine = {
    "youtube": <FaYoutube />,
    "facebook": <CiFacebook />,
    "whatsapp": <FaWhatsapp />,
    "instagram": <FaInstagram />,
  }

  return (
    <div className='channeldashboard'>
      <div className="profile">
        <div className="upperinfo">
          <div className="coverimage">
            <img src="https://firebasestorage.googleapis.com/v0/b/esportswebin.appspot.com/o/users%2FOyGza3wnnfT082g2YsrO1ag2umK2%2Fcover.webp?alt=media&token=10828b44-1acb-4a36-bdec-d7ac4e24a67d" alt="cover image" />
          </div>

          <div className="maininfo">
            <div className="top">
              <div className="profileimage">
                <img src="https://firebasestorage.googleapis.com/v0/b/esportswebin.appspot.com/o/users%2FOyGza3wnnfT082g2YsrO1ag2umK2%2Fphoto.webp?alt=media&token=18e2c5f4-0182-4ac8-ab5e-d7c25dc00835" alt="profile image" />
                <div className='names'>
                  <h2>{pro.name} {log.islogin ? "login" : "logout"}</h2>
                  <span>{uid}</span>
                </div>
              </div>
              <div className="tournament infoo">
                <div>Tournament</div>
                <div>(Private included)</div>
                <div>{tournas.length}</div>
              </div>
              <div className="followers infoo">
                <div>Followers</div>
                <div>{pro.followers.length || 0}</div>
              </div>
              <div>
                {isfollowing ?
                  <Button onClick={() => dofollow(false)} style={{ background: 'grey', color: 'black' }} variant="contained" startIcon={<SlUserFollowing />}>
                    Following
                  </Button> :
                  <Button onClick={() => dofollow(true)} variant="contained" startIcon={<SlUserFollow />}>
                    Follow
                  </Button>
                }
                {/* <LoadingButton
                  loading={tournacenter.loading}
                  onClick={() => dispatch(alltourna())}
                  loadingPosition="end"
                  sx={{ width: '48%' }}
                  startIcon={<IoMdRefresh />}
                  variant="outlined"
                  type="submit"
                >
                  REFRESH
                </LoadingButton> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='more'>
        <div className="about">
          <h2>About</h2>
          <div style={{ marginBottom: '12px' }}> {pro.bio}</div>
          <div> <MdLocalPhone /> {pro.publicphone}</div>
          <div> <IoIosMail /> {pro.publicemail}</div>
        </div>
        <div className="socallink">
          <h2>Social Links</h2>

          {pro.sociallinks?.map((val, ind) => {
            return <div key={ind}> <span className="icon"> {fine[val.name]} </span> <span>{val.link}</span> <MdContentCopy className='copyicon' title='copy Link' onClick={() => copyfunc(val.link)} /> </div>
          })}
        </div>
      </div>

      <div className="tournamentss">
        {tournas && tournas.map((tourn, ind) => {
          const formattedDate = new Date(tourn.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          const formattedTime = new Date(tourn.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

          return <div className="card" key={ind}>
            <div className="img">
              <img
                loading="lazy"
                src={tourn.tournment_logo || tournlogo}
                alt="logo"
              />
              <span title={tourn.title}>{tourn.title}</span>
            </div>
            <h3 className="organiser">- {tourn.organiser}</h3>
            <div className="time">
              {formattedDate}, {formattedTime} <span>{tourn.type}</span>
            </div>
            <div className="tournId">
              ID :- {tourn.tournid}
              <MdContentCopy title="Copy Id" onClick={() => {
                navigator.clipboard.writeText(tourn.tournid);
                toast.success('Copied', { autoClose: 1000 })
              }} />
            </div>
            <div className="controller">
              <Button size="small" variant="contained" endIcon={<MdMenuOpen />}>
                READ MORE
              </Button>
              <p className="status" title="Status">{tourn.status}</p>
            </div>
          </div>
        })}
      </div>
    </div>
  );
};

export default Channeldashboard;
