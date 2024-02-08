import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  styled
} from '@mui/material';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import group from '../../assets/group.webp'
import './stats.css'
import './theme/theme1.css'
import './theme/theme2.css'
import './theme/theme3.css'
import './theme/theme4.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Fragger from './fragger/fragger';
import MatchTable from './fragger/matchtable';
import { setloader } from '../../store/login';

const Stats = () => {
  const dispatch = useDispatch();
  const { tid } = useParams();
  const [matches, setmatches] = useState([]);
  useEffect(() => {
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
  const tournacenter = useSelector((state) => state.tournacenter);
  const [teamlogo, setteamlogo] = useState({});
  const [teamdeatil, setteamdeatil] = useState([]);
  let temptemlogo = {};
  const fetche = async (id) => {
    try {
      const rese = await fetch(`${tournacenter.apiadress}/getmatches`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tid: id })
      });
      const result = await rese.json();
      // console.log(result);
      if (rese.ok) {
        rules = result.rules
        setkuch(result.rules);
        funck(result.matches);
        setmatches(result.matches);
        findtopplayer(result.matches, result.teamdeatil)
        vdcf(result.teamdeatil);
        setteamdeatil(result.teamdeatil);
        dispatch(setloader(false));
      }
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
    console.log(allmatch);
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
    console.log(tabledata);

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

  return (
    <div className='stats'>
      <div className='controls'>
        <Grid sx={{Width:'100%', justifyContent: "space-between"}} container spacing={2}>
          <Grid  xs={3}>
            <h3>Select Theme</h3>
            <FormControl sx={{ mt: 1 , width:"100%" }} size='small' >
              <InputLabel  id="demo-simple-select-label">Theme</InputLabel>
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
          </Grid>
          <Grid xs={3} >
            <h3>Set Background</h3>
            <Button className='btna'  sx={{ mt: 1, width:"100%" }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid>
          <Grid xs={3}>
            <h3>Set Title</h3>
            <TextField size='small' sx={{ mt: 1 ,width:"100%"}} id="outlined-basic" label="Title" onChange={(e) => settitle(e.target.value)} value={title} variant="outlined" />
          </Grid>
        </Grid>
      </div>
      <Container maxWidth="fixed" className={`conta ${theme}`}>
        <div>
          <img src={kuch.tournment_logo} alt="" />
        </div>
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
            {tablerow.map((row, ind) => {
              return <tr key={ind}>
                <td>{ind + 1}</td>
                <td style={{ textAlign: "left" }}><span><img src={teamlogo[row.teamid] ? teamlogo[row.teamid] : group}
                  alt="" /></span> <span>{row.teamname}</span> </td>
                <td>{row.matchplayed}</td>
                <td>{row.matchwon}</td>
                <td>{row.placepoints}</td>
                <td>{row.killpoints}</td>
                <td>{row.total}</td>
              </tr>
            })}
          </tbody>
        </table>
      </Container>
      <Fragger topplayer={topplayer} matches={matches} teamdeatil={teamdeatil} />
      <MatchTable rules={kuch} matches={matches} teamdeatil={teamdeatil} />
    </div>
  );
};

export default Stats;
