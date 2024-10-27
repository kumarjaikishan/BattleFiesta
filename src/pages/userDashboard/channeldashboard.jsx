import { useEffect, useState } from 'react';
import './channeldashboard.css';
import { useParams } from 'react-router-dom';
import { MdMenuOpen, MdContentCopy } from "react-icons/md";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setloader } from '../../store/login';
import { toast } from 'react-toastify';

const Channeldashboard = () => {
  const dispatch = useDispatch();
  const { uid } = useParams();

  const tournlogo = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1709654642/battlefiesta/assets/logo/logopng250_vuhy4f.webp';

  const [pro, setpro] = useState(null);
  const [tournas, settournas] = useState(null);
  const [error, setError] = useState(null);  // New state to handle errors

  useEffect(() => {
    dispatch(setloader(true)); // Set loader when component mounts
    fetche();
  }, []);

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

      if (!rese.ok) {
        setError(result.message);  // Set error message if username is incorrect
        toast.warn(result.message, { autoClose: 1900 });
        dispatch(setloader(false));
        return;
      }

      setpro(result.data);  // Set profile data
      settournas(result.tournaments);
      setError(null);  // Clear error if fetch is successful

      dispatch(setloader(false));
    } catch (error) {
      console.error(error);
      setError('Something went wrong, please try again.');  // Set a generic error
      dispatch(setloader(false));  // Remove loader on error
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
                  <h2>{pro.name}</h2>
                  <span>{uid}</span>
                </div>
              </div>
              <div className="tournament infoo">
                <div>Tournament</div>
                <div>Private included</div>
                <div>8</div>
              </div>
              <div className="followers infoo">
                <div>Followers</div>
                <div>80</div>
              </div>
              <div>
                Follow
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='more'>
        <div className="about">
          <h2>About</h2>
          {pro.bio}
        </div>
        <div className="socallink">
          <h2>Social Links</h2>
          {pro.sociallinks?.map((link, ind) => {
            return <div key={ind}> <span>{link.name} </span><span>{link.link}</span></div>
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
