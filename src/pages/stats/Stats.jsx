import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './stats.css'
import './theme/theme1.css'
import './theme/theme2.css'
import './theme/theme3.css'
import './theme/theme4.css'
import { styled } from '@mui/material';
import html2canvas from "html2canvas";
import { Button, TextField, Grid, Select, FormControl, MenuItem, InputLabel, Container } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Fragger from './fragger/fragger';
import MatchTable from './fragger/matchtable';
import { setloader, header } from '../../store/login';
import defaultlogo from '../../assets/logopng250.webp'

const Stats = () => {
  const dispatch = useDispatch();
  const { tid } = useParams();
  const [matches, setmatches] = useState([]);
  const log = useSelector((state) => state.login);
  const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'
 
  useEffect(() => {
    dispatch(header("Stats"));
    dispatch(setloader(true));
    fetche(tid);
  }, [])
  const [topplayer, settopplayer] = useState([]);
  const [theme, settheme] = useState("theme1");
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
      // console.log(result);
      dispatch(setloader(false));
      if (!rese.ok) {
        return toast.warn("someting went wrong", { autoclose: 1900 });
      }
      rules = result.rules
      setkuch(result.rules);
      funck(result.matches);
      setmatches(result.matches);
      findtopplayer(result.matches, result.teamdeatil)
      vdcf(result.teamdeatil);
      setteamdeatil(result.teamdeatil);
      // setrule(result.rules)
    } catch (error) {
      console.error('Error:', error);
      dispatch(setloader(false));
    }
  };
  const vdcf = (arraye) => {
    arraye.map((val, ind) => {
      temptemlogo[val._id] = val.teamLogo;
    })
    // console.log(temptemlogo);
    setteamlogo(temptemlogo);
  }

  let tabledata = [];
  const [tablerow, settablerow] = useState([]);

  const funck = (allmatch) => {
    tabledata = [];
    // console.log(allmatch);
    allmatch.map((val, ind) => {
      val.points.map((value, indes) => {

        if (tabledata.length == 0) {
          let placepts = parseInt(rules.pointsystem[value.place] || 0);
          let killpts = value.kills * rules.killpoints;
          let total = placepts + killpts;
          let won = 0;
          if (value.place == 1) {
            won = 1;
          }
          let objecting = {
            teamname: value.team, placepoints: placepts, killpoints: killpts, teamid: value.teamid, matchplayed: 1, matchwon: won, total: total
          }
          tabledata.push(objecting);
        } else {
          let karnahai = true;
          tabledata.map((cf, frf) => {
            if (cf.teamid == value.teamid) {
              karnahai = false;
              cf.matchplayed = cf.matchplayed + 1;
              cf.placepoints = cf.placepoints + (parseInt(rules.pointsystem[value.place]) || 0);
              cf.killpoints = cf.killpoints + parseInt(value.kills * rules.killpoints);
              cf.total = cf.placepoints + cf.killpoints
              if (value.place == 1) {
                cf.matchwon = cf.matchwon + 1;
              }
            }
          })

          let plcpts = parseInt(rules.pointsystem[value.place] || 0);
          let kallpts = value.kills * rules.killpoints;
          let wona = 0;
          let totala = plcpts + kallpts;

          if (value.place == 1) {
            wona = 1;
          }

          karnahai && tabledata.push({
            teamname: value.team, placepoints: plcpts, killpoints: kallpts, teamid: value.teamid, matchplayed: 1, matchwon: wona, total: totala
          });
        }
      })
      return val;
    })
    // console.log(tabledata);
    // Sort the array using the custom comparator function
    tabledata.sort(comparePlayers);
    // console.log(tabledata);

    settablerow(tabledata);
  }

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

  const findtopplayer = (matches, teams) => {
    // console.log("teams:", teams);
    let topplayers = {};
    matches.map((match, ind) => {
      match.points.map((points, index) => {
        points.playerKills.map((player, hh) => {
          if (topplayers.hasOwnProperty(player.playerId)) {
            topplayers[player.playerId] += player.kills;
          } else {
            topplayers[player.playerId] = player.kills
          }
        })
      })
    })
    // console.log(topplayers);
    let complete = [];
    teams.map((team, ivfvf) => {
      team.player.map((player, vv) => {
        let dfvf = {
          team: team.teamName,
          name: player.inGameName,
          logo: player.playerLogo,
          id: player.playerId,
          kills: topplayers[player.playerId]
        }
        complete.push(dfvf);
      })
    })
    complete.sort((a, b) => {
      return b.kills - a.kills
    })
    settopplayer(complete)
    // console.log(complete);
  }
  const imagedownload = () => {
    const timenow = new Date();
    const rand = timenow.getMinutes()
    // console.log(quality);
    let quality = 3;
    const boxElement = document.querySelector('#wrapper');
    html2canvas(boxElement, { scale: quality, useCORS: true, })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL(); // Get the data URL of the canvas
        const anchor = document.createElement('a');
        anchor.href = dataUrl;
        anchor.download = `Stats @${rand}.png`; // Change the filename as needed
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  }

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
              <MenuItem value={"theme1"}>Red Carpet</MenuItem>
              <MenuItem value={"theme4"}>Royal Grey</MenuItem>
              <MenuItem value={"theme3"}>Droplets</MenuItem>
              <MenuItem value={"theme2"}>Red & White</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='conti' >
          <h3>Set Background</h3>
          <Button disabled className='btna' sx={{ mt: 1, width: "100%" }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
        <div className='conti'>
          <h3>Set Title</h3>
          <TextField size='small' sx={{ mt: 1, width: "100%" }} id="outlined-basic" label="Title" onChange={(e) => settitle(e.target.value)} value={title} variant="outlined" />
        </div>
      </div>}
      <Container id="wrapper" maxWidth="fixed" className={`conta ${theme}`}>
        <div>
          <img loading="lazy" src={kuch.tournment_logo ? kuch.tournment_logo : defaultlogo} alt="" />
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
                <td style={{ textAlign: "left" }}><span><img loading="lazy" src={teamlogo[row.teamid] ? teamlogo[row.teamid] : group}
                  alt="" /></span> <span>{row.teamname}</span> </td>
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
      {log.islogin &&
        <Button onClick={imagedownload} title='Download ' sx={{ mt: 1, width: "150px" }} component="label" variant="contained" startIcon={<CloudDownloadIcon />}>
          Download
        </Button>}
      <Fragger topplayer={topplayer} matches={matches} teamdeatil={teamdeatil} />
      <MatchTable rules={kuch} matches={matches} teamdeatil={teamdeatil} />
    </div>
  );
};

export default Stats;
