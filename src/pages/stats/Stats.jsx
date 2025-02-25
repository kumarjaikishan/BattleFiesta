import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './stats.css'
import Unique from './theme/unique/unique';
import Droplet from './theme/droplets/Droplets';
import Red_carpet from './theme/RED_Carpet/red_Carpet';
import { toast } from "react-toastify";
import Red_white from './theme/red&white/red_white';
import Royal_grey from './theme/royal_grey/royal_grey';
import { styled } from '@mui/material';
import { Button, TextField, Grid, Select, FormControl, MenuItem, InputLabel, Container } from '@mui/material';
import { IoMdCloudUpload } from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Fragger from './fragger/fragger';
import MatchTable from './fragger/matchtable';
import { setloader, header } from '../../store/login';
import defaultlogo from '../../assets/logopng250.webp'
import { FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { MdInsertLink } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { Helmet } from "react-helmet-async";

const Stats = () => {
  const dispatch = useDispatch();
  const { tid } = useParams();
  const [matches, setmatches] = useState([]);
  const log = useSelector((state) => state.login);
  const userprofile = useSelector((state) => state.userprofile);
  const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'

  const [topplayer, settopplayer] = useState([]);
  const [topteam, settopteam] = useState([]);
  const [theme, settheme] = useState(1);
  const [title, settitle] = useState('Overall Standings')

  useEffect(() => {
    dispatch(header("Stats"));
    dispatch(setloader(true));
    fetche(tid);
    // console.log("user id: ", userprofile.userprofile._id)
  }, [])

  const handleChange = (event) => {
    settheme(event.target.value);
  };



  let rules = {};
  const [kuch, setkuch] = useState({});
  const [teamlogo, setteamlogo] = useState({});
  const [teamdeatil, setteamdeatil] = useState([]);
  const [links, setlinks] = useState([]);

  let temptemlogo = {};
  const fetche = async (id) => {
    try {
      const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}getmatches`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tid: id })
      });
      const result = await rese.json();
      console.log(result)
      dispatch(setloader(false));
      if (!rese.ok) {
        return toast.warn("someting went wrong", { autoclose: 1900 });
      }
      rules = result.rules
      setkuch(result.rules);
      funck(result.matches);
      setmatches(result.matches);
      setlinks(result.contact.links)
      Impfunction(result.teamdeatil, result.matches);
      // Impfunction1(result.teamdeatil, result.matches);
      createTeamLogoObj(result.teamdeatil);
      setteamdeatil(result.teamdeatil);
      // setrule(result.rules)
    } catch (error) {
      console.error(error);
      dispatch(setloader(false));
    }
  };

  const Impfunction = (teamdeatil, matches) => {
    // console.time("GPTfunc");
    const teamLogoMap = new Map(teamdeatil.map(team => [
      team._id,
      {
        teamLogo: team.teamLogo,
        players: new Map(team.player.map(player => [player.playerId, player.playerLogo]))
      }
    ]));

    const topTeamMap = new Map();
    const topPlayerMap = new Map();

    matches.forEach(match => {
      match.points.forEach(point => {
        const { teamid, team, kills, playerKills } = point;
        const teamData = teamLogoMap.get(teamid) || { teamLogo: '', players: new Map() };

        // Update team kills
        if (topTeamMap.has(teamid)) {
          topTeamMap.get(teamid).kills += kills;
        } else {
          topTeamMap.set(teamid, {
            teamLogo: teamData.teamLogo,
            teamid,
            teamname: team,
            kills
          });
        }

        // Update player kills
        playerKills.forEach(playerKill => {
          const { playerId, playerLogo, inGameName, kills } = playerKill;
          if (topPlayerMap.has(playerId)) {
            topPlayerMap.get(playerId).kills += kills;
          } else {
            topPlayerMap.set(playerId, {
              team: team,
              playerLogo: teamData.players.get(playerId) || '',
              playerName: inGameName,
              playerId,
              kills
            });
          }
        });
      });
    });

    // Convert Maps to arrays and sort
    const topTeams = Array.from(topTeamMap.values()).sort((a, b) => b.kills - a.kills);
    const topPlayers = Array.from(topPlayerMap.values()).sort((a, b) => b.kills - a.kills);
    settopteam(topTeams)
    settopplayer(topPlayers);
    // console.timeEnd("GPTfunc");
  };


  const Impfunction1 = (teamdeatil, matches) => {
    const topTeamMap = new Map();
    const topPlayerMap = new Map();

    matches.forEach(match => {
      match.points.forEach(point => {
        const { teamid, team, kills, playerKills } = point;
        if (topTeamMap.has(teamid)) {
          topTeamMap.get(teamid).kills += kills
        } else {
          topTeamMap.set(teamid, {
            teamid,
            teamname: team,
            kills
          })
        }
        playerKills.forEach(playerKill => {
          const { playerId, playerLogo, inGameName, kills } = playerKill;

          if (topPlayerMap.has(playerId)) {
            topPlayerMap.get(playerId).kills += kills
          } else {
            topPlayerMap.set(playerId, {
              playerId, playerLogo, inGameName, kills
            })
          }
        })
      })
    })
    // console.log(topPlayerMap)
  }


  const createTeamLogoObj = (arraye) => {
    arraye.map((val, ind) => {
      temptemlogo[val._id] = val.teamLogo;
    })
    setteamlogo(temptemlogo);
  }

  const [tablerow, settablerow] = useState([]);

  const funck = (allmatch) => {
    const tableMap = new Map();

    allmatch.forEach((match) => {
      match.points.forEach((point) => {
        const placePoints = parseInt(rules.pointsystem[point.place] || 0);
        const killPoints = point.kills * rules.killpoints;
        const totalPoints = placePoints + killPoints;
        const won = point.place === 1 ? 1 : 0;

        // Check if team already exists in the Map
        if (tableMap.has(point.teamid)) {
          const existingTeam = tableMap.get(point.teamid);
          existingTeam.matchplayed += 1;
          existingTeam.placepoints += placePoints;
          existingTeam.killpoints += killPoints;
          existingTeam.total = existingTeam.placepoints + existingTeam.killpoints;
          if (won) existingTeam.matchwon += 1;
        } else {
          // Create a new entry if the team is not in the Map
          tableMap.set(point.teamid, {
            teamname: point.team,
            placepoints: placePoints,
            killpoints: killPoints,
            teamid: point.teamid,
            matchplayed: 1,
            matchwon: won,
            total: totalPoints,
          });
        }
      });
    });

    // Convert Map values to array and sort
    const sortedTableData = Array.from(tableMap.values()).sort(comparePlayers);

    settablerow(sortedTableData);
  };

  function comparePlayers(playerA, playerB) {
    // Compare total points first
    if (playerA.total !== playerB.total) {
      return playerB.total - playerA.total; // Higher total points get higher rank
    }

    // If total points are the same, compare kill points
    if (rules.tiepreference) {
      return playerB.killpoints - playerA.killpoints; // Higher kill points get higher rank
    } else {
      return playerA.killpoints - playerB.killpoints; // Higher kill points get higher rank
    }
  }
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [disable, setdisable] = useState(false);

  const [isDesktopMode, setIsDesktopMode] = useState(false);

  const imagedownload = async (id, filename) => {
    setdisable(true);
    dispatch(setloader(true));
    setIsDesktopMode(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const timestamp = new Date().getMinutes();

      const boxElement = document.querySelector(`${id}`);
      const { width: originalWidth, minHeight: originalHeight } = boxElement.style;

      boxElement.style.width = '1680 px';
      boxElement.style.minHeight = originalHeight;

      const quality = 3;
      const canvas = await html2canvas(boxElement, { scale: quality, useCORS: true });

      const dataUrl = canvas.toDataURL();
      const anchor = document.createElement('a');
      anchor.href = dataUrl;
      anchor.download = `${filename}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      boxElement.style.width = originalWidth;
      boxElement.style.minHeight = originalHeight;
      dispatch(setloader(false));
      setIsDesktopMode(false);
      setdisable(false);
      smallscreen && toast.success("Image Downloaded", { autoClose: 2100 })
    } catch (error) {
      console.error('Error generating image:', error);
      boxElement.style.width = originalWidth;
      boxElement.style.minHeight = originalHeight;
      dispatch(setloader(false));
      setIsDesktopMode(false);
      setdisable(false);
    }
  };

  const tournamentOwner = kuch?.userid?._id == userprofile?.userprofile?._id;

  return (
    <div className='stats'>
      <Helmet>
        <title>Stats || BattleFiesta</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className='controls'>
        <div className='conti'>
          <h3>Select Theme</h3>
          <FormControl sx={{ mt: 1, width: "100%" }} size='small' >
            <InputLabel id="demo-simple-select-label">Theme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theme}
              label="Theme"
              onChange={handleChange}
            >
              <MenuItem value={1}>Red Carpet</MenuItem>
              <MenuItem value={2}>Royal Grey</MenuItem>
              <MenuItem value={3}>Droplets</MenuItem>
              <MenuItem value={4}>Red & White</MenuItem>
              <MenuItem value={5}>Golden Coast</MenuItem>
            </Select>
          </FormControl>
        </div>
        {log.islogin && tournamentOwner && <> <div className='conti' >
          <h3>Set Background</h3>
          <Button disabled className='btna' sx={{ mt: 1, width: "100%" }} component="label" variant="contained" startIcon={<IoMdCloudUpload />}>
            Upload
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
          <div className='conti'>
            <h3>Set Title</h3>
            <TextField size='small' sx={{ mt: 1, width: "100%" }} id="outlined-basic" label="Title" onChange={(e) => settitle(e.target.value)} value={title} variant="outlined" />
          </div> </>}
      </div>
      <div id="wrapper" className={`${isDesktopMode ? 'conta desktop-mode' : 'conta'}`}>
        {theme == 1 && <Red_carpet tablerow={tablerow} teamlogo={teamlogo} kuch={kuch} title={title} defaultlogo={defaultlogo} />}
        {theme == 2 && <Royal_grey tablerow={tablerow} teamlogo={teamlogo} kuch={kuch} title={title} defaultlogo={defaultlogo} />}
        {theme == 3 && <Droplet tablerow={tablerow} teamlogo={teamlogo} kuch={kuch} title={title} defaultlogo={defaultlogo} />}
        {theme == 4 && <Red_white tablerow={tablerow} teamlogo={teamlogo} kuch={kuch} title={title} defaultlogo={defaultlogo} />}
        {theme == 5 && <Unique tablerow={tablerow} teamlogo={teamlogo} kuch={kuch} title={title} />}

      </div>
      {/* {log.islogin && tournamentOwner && <p style={{ fontSize: '0.9em', color: 'gray', marginBottom: '0.5em' }}>
        <em>*Note - please switch to desktop view to download the scoreboard in the best quality, if viewing on mobile</em>
      </p>} */}

      <Button disabled={disable} onClick={() => imagedownload('#wrapper', `${kuch.title}-Score Board-new`)} title='Download Points Table' sx={{ mt: 0.3 }} component="label" variant="contained" startIcon={<IoCloudDownloadOutline />}>
        Score Board
      </Button>

      <Fragger isDesktopMode={isDesktopMode} topteam={topteam} topplayer={topplayer} group={group} />
      {log.islogin && tournamentOwner &&
        <div style={{ textAlign: 'center' }}>
          <Button disabled={disable} onClick={() => imagedownload('#fragger', `${kuch.title} - Fraggers`)} title='Download Fraggers Stat' sx={{ mt: 0.3 }} component="label" variant="contained" startIcon={<IoCloudDownloadOutline />}>
            Fraggers
          </Button>
        </div>
      }

      <MatchTable isDesktopMode={isDesktopMode} rules={kuch} matches={matches} log={log} teamdeatil={teamdeatil} disable={disable} imagedownload={imagedownload} tournamentOwner={tournamentOwner} />

      <div className="contacts">
        <div>Contacts Details
          <Button variant="contained"
            color='secondary'
            size='small'
            title={`View ${kuch?.userid?.name}'s Channel`}
            startIcon={<GrOverview />}
            onClick={() => window.open(`/channel/@${kuch?.userid?.username}`, '_blank')}
          > View Profile
          </Button> </div>
        {links.length > 0 && <>
          <div>Links</div>
          <div className="links">
            {links.map((val, ind) => {
              if (val.linkType == "whatsapp") {
                return <a key={ind} title='whatsapp' href={`https://wa.me/+91${val.link}`} target="_blank"><span><FaWhatsapp className='ico' /></span> <span>{val.linkName}</span> </a>
              }
              if (val.linkType == "instagram") {
                return <a key={ind} title='instagram' href={`https://www.instagram.com/${val.link}`} target="_blank"><span> <FaInstagram className='ico' /></span><span>{val.linkName}</span> </a>
              }
              if (val.linkType == "phone") {
                return <a key={ind} title='phone' href={`tel:${parseInt(val.link)}`} target="_blank"><span> <MdLocalPhone className='ico' /></span><span> {val.linkName}</span></a>
              }
              if (val.linkType == "email") {
                return <a key={ind} title='email' href={`mailto:${val.link}`} target="_blank"><span><IoMailOutline className='ico' /></span><span> {val.linkName}</span></a>
              }
              if (val.linkType == "link") {
                return <a key={ind} title='link' href={val.link} target="_blank"><span><MdInsertLink className='ico' /></span><span>{val.linkName}</span> </a>
              }
            })}
          </div>
        </>}
        {links.length < 1 && <p>The organiser has not provided any contact details for the tournament.
          If you are the organiser, check "Contact Info" section in the Basic Setting.</p>}
      </div>

    </div>
  );
};

export default Stats;
