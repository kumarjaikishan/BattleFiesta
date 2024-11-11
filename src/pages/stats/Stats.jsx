import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './stats.css'
import './theme/red_carpet.css'
import './theme/red_white.css'
import './theme/droplets.css'
import './theme/royal_grey.css'
import Unique from './theme/unique';
import { styled } from '@mui/material';
import { Button, TextField, Grid, Select, FormControl, MenuItem, InputLabel, Container } from '@mui/material';
import { IoMdCloudUpload } from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Fragger from './fragger/fragger';
import MatchTable from './fragger/matchtable';
import { setloader, header } from '../../store/login';
import defaultlogo from '../../assets/logopng250.webp'

const Stats = () => {
  const dispatch = useDispatch();
  const { tid } = useParams();
  const [matches, setmatches] = useState([]);
  const log = useSelector((state) => state.login);
  const userprofile = useSelector((state) => state.userprofile);
  const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'

  useEffect(() => {
    dispatch(header("Stats"));
    dispatch(setloader(true));
    fetche(tid);
    console.log("user id: ", userprofile.userprofile._id)
  }, [])
  const [topplayer, settopplayer] = useState([]);
  const [topteam, settopteam] = useState([]);
  const [theme, settheme] = useState("red_carpet");
  const [title, settitle] = useState('Overall Standings')

  const handleChange = (event) => {
    settheme(event.target.value);
  };



  let rules = {};
  const [kuch, setkuch] = useState({});
  const [teamlogo, setteamlogo] = useState({});
  const [teamdeatil, setteamdeatil] = useState([]);

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

  const imagedownload = async (id, filename) => {
    setdisable(true);
    const html2canvas = (await import("html2canvas")).default;
    const timenow = new Date();
    const rand = timenow.getMinutes();

    // Override mobile layout by temporarily simulating a large screen size
    const boxElement = document.querySelector(`${id}`);

    // Save the current style
    const originalWidth = boxElement.style.width;
    const originalHeight = boxElement.style.height;

    // Force the element to behave like a desktop size
    boxElement.style.width = '1680px'; // Set desired desktop width
    // boxElement.style.minHeight = '945px'; // Set desired desktop height
    boxElement.style.minHeight = originalHeight; // Set desired desktop height

    let quality = 3; // Adjust this if needed
    html2canvas(boxElement, { scale: quality, useCORS: true })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL(); // Get the data URL of the canvas
        const anchor = document.createElement('a');
        anchor.href = dataUrl;
        anchor.download = `${filename} @${rand}.jpg`; // Change the filename as needed
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        setdisable(false);

        // Restore the original styles after capturing
        boxElement.style.width = originalWidth;
        boxElement.style.minHeight = originalHeight;
      })
      .catch((error) => {
        console.error('Error generating image:', error);
        setdisable(false);

        // Restore the original styles if an error occurs
        boxElement.style.width = originalWidth;
        boxElement.style.minHeight = originalHeight;
      });
  };
  const tournamentOwner = kuch?.userid == userprofile?.userprofile._id;


  return (
    <div className='stats'>
      {log.islogin && <div className='controls'>
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
              <MenuItem value={"red_carpet"}>Red Carpet</MenuItem>
              <MenuItem value={"royal_grey"}>Royal Grey</MenuItem>
              <MenuItem value={"droplets"}>Droplets</MenuItem>
              <MenuItem value={"red_white"}>Red & White</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='conti' >
          <h3>Set Background</h3>
          <Button disabled className='btna' sx={{ mt: 1, width: "100%" }} component="label" variant="contained" startIcon={<IoMdCloudUpload />}>
            Upload
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
        <div className='conti'>
          <h3>Set Title</h3>
          <TextField size='small' sx={{ mt: 1, width: "100%" }} id="outlined-basic" label="Title" onChange={(e) => settitle(e.target.value)} value={title} variant="outlined" />
        </div>
      </div>}
      <div>
        <Unique/>
      </div>
      <Container id="wrapper" maxWidth="fixed" className={`conta ${theme}`}>
        <div>
          <img loading="lazy" src={kuch?.tournment_logo || defaultlogo} alt="Tournament Logo" />
        </div>
        <h3>{kuch.title}</h3>
        <h2>{kuch.organiser}</h2>
        <h1>{title}</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "left" }}>Team</th>
              <th>M</th>
              <th style={{ fontSize: "2em" }}>🍗</th>
              <th>Place Pts</th>
              <th>Kill Pts</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {tablerow.length > 0 ? tablerow.map((row, ind) => {
              return <tr key={ind}>
                <td>{ind + 1}</td>
                <td style={{ textAlign: "left" }}><span><img loading="lazy" src={teamlogo[row.teamid] || group}
                  alt="TeamLogo" /></span> <span>{row.teamname}</span> </td>
                <td>{row.matchplayed}</td>
                <td>{row.matchwon}</td>
                <td>{row.placepoints}</td>
                <td>{row.killpoints}</td>
                <td>{row.total}</td>
              </tr>
            }) : <tr>
              <td colSpan={7}>No Match Found</td>
            </tr>}
          </tbody>
        </table>
      </Container>
      {log.islogin && tournamentOwner && <p style={{ fontSize: '0.9em', color: 'gray', marginBottom: '0.5em' }}>
      <em>*Note - please switch to desktop view to download the scoreboard in the best quality, if viewing on mobile</em>
      </p>}

      {log.islogin && tournamentOwner &&
        <Button disabled={disable} onClick={() => imagedownload('#wrapper', `${kuch.title}-Score Board`)} title='Download Points Table' sx={{ mt: 0.3 }} component="label" variant="contained" startIcon={<IoCloudDownloadOutline />}>
          Score Board
        </Button>}
      <Fragger log={log} disable={disable} imagedownload={imagedownload} topteam={topteam} topplayer={topplayer} tournamentOwner={tournamentOwner} />
      <MatchTable rules={kuch} matches={matches} teamdeatil={teamdeatil} />
    </div>
  );
};

export default Stats;
