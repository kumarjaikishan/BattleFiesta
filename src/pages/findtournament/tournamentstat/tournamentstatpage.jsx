import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setloader } from '../../../store/login';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import FeedIcon from '@mui/icons-material/Feed';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Tournamentstatpage = () => {
  const dispatch = useDispatch();
  const { tid } = useParams();
  const tournacenter = useSelector((state) => state.tournacenter);
  useEffect(() => {
    dispatch(setloader(true));
    fetche();
  }, [])
  const [iserror, setiserror] = useState(false);
  const [tournament, settournament] = useState("");
  const [data2, setdata2] = useState(false);
  const [links, setlinks] = useState([]);
  const [publicpost, setpublicpost] = useState('');

  const fetche = async () => {
    try {
      const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}getonetournament`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tid })
      });

      const data = await responsee.json();
      // console.log(data);
      if (responsee.ok) {
        setdata2(data.data2)
        settournament(data.data)
        setlinks(data.data2.links)
        setpublicpost(data.data2.publicpost)
      }
      else {
        setiserror(true)
        return toast.warn(data.message, { autoclose: 2100 })
      }
      dispatch(setloader(false));
    } catch (error) {
      console.log(error);
      dispatch(setloader(false));
    }
  }
  const changeformat = (date) => {
    const mongoCreatedAt = new Date(date); // Replace this with your MongoDB createdAt value

    const formattedDate = mongoCreatedAt.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  }
  let localhos = window.location.origin;

  return (
    <div className="tournastat">
      {iserror && <div className="notfound">
        <div>
          <SentimentDissatisfiedIcon className="sad" />
          <h2>Oops! Tournament Not Found</h2>
          <p>Either Tournament is Removed by Owner or Tournament Id is Wrong</p>
        </div>
      </div>}
      {!iserror && <>
        {tournament.tournment_banner != "" && <div className="img">
          <img src={tournament.tournment_banner} loading="lazy" alt="Tournament Banner" />
        </div>}
        <div className="info">
          <div className="upper">
            <div>{tournament.title} <span>{tournament.status}</span></div>
            <div>Organised by: {tournament.organiser} </div>
            <div>Created At: {changeformat(tournament.createdAt)} </div>
          </div>
          {publicpost &&  <div style={{margin:"10px 0px"}}>
          { publicpost.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          </div>}
         
          <div className="btn">
            {data2.isopen && <a href={`${localhos}/${tournament.type == 'tdm' ? 'tdmregister' : 'register'}/${tid}`} target="_blank" title='Register for this Tournament'>
              <Button variant="contained" startIcon={<FeedIcon />}> REGISTER </Button>
            </a>}
            {tournament.type == 'classic' && <a href={`${localhos}/stat/${tid}`} target="_blank" title='View Stats for this tournament'>
              <Button variant="outlined" startIcon={<LeaderboardIcon />}> LEADERBOARD </Button>
            </a>} <br />
          </div>
            {!data2.isopen && <div style={{color:'red', textAlign:'center'}}>**Registration is Closed for this Tournament**</div> }
          <div className="contacts">
            <div>Contacts Details</div>
            {links.length > 0 && <>
              <div>Links</div>
              <div className="links">
                {links.map((val, ind) => {
                  if (val.linkType == "whatsapp") {
                    return <a key={ind} title='whatsapp' href={`https://wa.me/+91${val.link}`} target="_blank"><span><WhatsAppIcon className='ico' /></span> <span>{val.linkName}</span> </a>
                  }
                  if (val.linkType == "instagram") {
                    return <a key={ind} title='instagram' href={`https://www.instagram.com/${val.link}`} target="_blank"><span> <InstagramIcon className='ico' /></span><span>{val.linkName}</span> </a>
                  }
                  if (val.linkType == "phone") {
                    return <a key={ind} title='phone' href={`tel:${parseInt(val.link)}`} target="_blank"><span> <LocalPhoneIcon className='ico' /></span><span> {val.linkName}</span></a>
                  }
                  if (val.linkType == "email") {
                    return <a key={ind} title='email' href={`mailto:${val.link}`} target="_blank"><span><EmailIcon className='ico' /></span><span> {val.linkName}</span></a>
                  }
                  if (val.linkType == "link") {
                    return <a key={ind} title='link' href={val.link} target="_blank"><span><InsertLinkIcon className='ico' /></span><span>{val.linkName}</span> </a>
                  }
                })}
              </div>
            </>}
            {links.length < 1 && <p>The organiser has not provided any contact details for the tournament.
              If you are the organiser, check "Contact Info" section in the Basic Setting.</p>}
          </div>
        </div> </>}
    </div>
  );
};

export default Tournamentstatpage;
