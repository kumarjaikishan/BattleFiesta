import {
  Paper, TableRow, TableHead, TableContainer, TableCell, tableCellClasses, TableBody,
  Table, Autocomplete, TextField, Button, styled, Divider, Box,
  Select, FormControl, MenuItem, InputLabel
} from '@mui/material';
import { FaUndoAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import { useEffect, useState } from 'react';
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector } from 'react-redux';

const EnterResult = ({ setting }) => {
  const [player, setplayer] = useState([]);
  const tournacenter = useSelector((state) => state.tournacenter);
  const tid = setting._id;
  const [map, setmap] = useState('');
  const [teamlist, setteamlist] = useState([]);
  const [selectedTeam, setselectedTeam] = useState();
  const [rows, setRows] = useState([]);
  const [forupload, setforupload] = useState([]);
  const [isloading, setisloading] = useState(false)

  const pointssystem = {
    killpts: setting.killpoints || 1,
    placepoints: setting.pointsystem,
    tiepreference: setting.tiepreference
  }

  useEffect(() => {
    // console.log(setting);
    // console.log(pointssystem.placepoints[5]);
    fetche();
  }, [])

  useEffect(() => {
    fetderfreche();
  }, [player])


  const handleChange = (event) => {
    setmap(event.target.value);
  };

  var top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const fetche = async () => {
    const url = `${import.meta.env.VITE_API_ADDRESS}tournamentform`;
    const method = 'POST';
    const body = { tid };

    const successAction = (data) => {
      // console.log(data.entry);
      let filterapproved = data.entry.filter((val) => {
        return val.status == "approved";
      })
      setplayer(filterapproved);
      // toast.success(data.message, { autoClose: 1300 });
      // const actualdata = data.data;
    };

    // const loaderAction = (isLoading) => dispatch(setloader(isLoading));

    await apiWrapper(url, method, body, successAction);
  }

  const fetderfreche = () => {
    if (player.length > 0) {
      const vcvdv = player.map((item) => {
        return {
          label: item.teamName,
          teamid: item._id,
          players: item.player.map((val, ind) => {
            return { id: ind, kills: 0, inGameName: val.inGameName, playerId: val.playerId }
          })
        }
      })
      // console.log('teamlist:', vcvdv);
      setteamlist(vcvdv);
    }

  }
  const [indexe, setindexe] = useState(1);

  const handleffff = (e, val) => {
    setselectedTeam(val);
  }


  function createData(team, place, placepts, killpts, total, teamid, playerKills) {
    return { team, place, placepts, killpts, total, teamid, playerKills };
  }
  function createDataforupload(place, team, kills, teamid, playerKills) {
    return { place, team, kills, teamid, playerKills };
  }


  const addToTable = async () => {
    // console.log(selectedTeam);
    if (!selectedTeam) {
      toast.error("Please select a team");
      return;
    }
    const removeaddedtotable = teamlist.filter((val) => {
      return val.teamid != selectedTeam.teamid
    })

    setteamlist(removeaddedtotable);

    // Calculate total kill points for the team
    let totalKillPoints = selectedTeam.players.reduce((total, player) => total + (player.kills || 0), 0);
    totalKillPoints = totalKillPoints * pointssystem.killpts;

    let total = totalKillPoints + parseInt(pointssystem.placepoints[indexe])
    let placepts = parseInt(pointssystem.placepoints[indexe])

    // Generate a new row data
    const newRow = createData(
      selectedTeam.label,  // Team name
      indexe,  // Increase # tag position
      placepts,
      totalKillPoints,  // Total kill points for the team
      total,
      selectedTeam.teamid,// Total points (place points + kill points)
      selectedTeam.players
    );
    // console.log("newly generated", newRow);

    const totalKillPointse = selectedTeam.players.reduce((total, player) => total + (player.kills || 0), 0);
    // Generate a new row data
    const foruploading = createDataforupload(
      indexe,  // Increase # tag position
      selectedTeam.label,  // Team name
      totalKillPointse,  // Total kill points for the team
      selectedTeam.teamid,// Total points (place points + kill points)
      selectedTeam.players
    );

    setforupload([...forupload, foruploading]);

    let temparray = [...rows, newRow];
    let sortinge = temparray.sort(comparePlayers);
    setRows(sortinge);
    // Clear the selected team
    setselectedTeam(null);

    // Increase the indexe for the next row
    setindexe(indexe + 1);
  };

  function comparePlayers(playerA, playerB) {
    // Compare total points first
    if (playerA.total !== playerB.total) {
      return playerB.total - playerA.total; // Higher total points get higher rank
    }

    // If total points are the same, compare kill points
    if (pointssystem.tiepreference) {
      return playerB.killpts - playerA.killpts; // Higher kill points get higher rank
    } else {
      return playerA.killpts - playerB.killpts; // Higher kill points get higher rank
    }
  }

  const removefromTable = () => {
    const last = rows[rows.length - 1];

    const dffd = rows.filter((val, ind) => {
      return ind != rows.length - 1;
    })
    setRows(dffd);

    const dffd2 = forupload.filter((val, ind) => {
      return ind != forupload.length - 1;
    })
    setforupload(dffd2);

    const deerfg = player.filter((val) => {
      return val._id == last.teamid
    })
    const fgfb = {
      label: deerfg[0].teamName,
      teamid: deerfg[0]._id,
      players: deerfg[0].player.map((val, ind) => {
        return { id: ind, kills: 0, inGameName: val.inGameName, playerId: val.playerId }
      })
    }

    setteamlist([...teamlist, fgfb])
    setindexe(indexe - 1);
    // console.log("retrive back 2nd", fgfb);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const savecloud = async () => {
    const tid = setting._id;
    const userid = setting.userid
    const matchmap = map;
    const points = forupload;
    if (!matchmap) {
      return toast.warn("Select Map", { autoClose: 1500 })
    }
    // console.log(forupload);
    try {
      setisloading(true)
      const id = toast.loading("Please wait...")
      const token = localStorage.getItem("token");
      const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}addmatches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          tid, userid, map: matchmap, points
        })
      })

      const result = await rese.json();
      console.log(result);
      if (rese.ok) {
        toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose: 1600 });
      }
      setisloading(false)
    } catch (error) {
      console.log(error);
      setisloading(false)
      toast.update(id, { render: "Failed", type: "warn", isLoading: false, autoClose: 1600 });
    }
  }

  const reset = () => {
    setindexe(1);
    fetderfreche();
    setRows([]);
  }

  return (
    <>
      <div className="enterresult">
        <div className="box">
          <h2>Match Info</h2>
          <FormControl sx={{ m: 1, minWidth: '98%' }} size="small">
            <InputLabel id="demo-select-small-label">Map</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={map}
              label="Map"
              // size='small'
              required
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"erangle"}>Erangle</MenuItem>
              <MenuItem value={"livik"}>Livik</MenuItem>
              <MenuItem value={"miramar"}>Miramar</MenuItem>
              <MenuItem value={"Vikendi"}>Vikendi</MenuItem>
              <MenuItem value={"sanhok"}>Sanhok</MenuItem>
              <MenuItem value={"Karakin"}>Karakin</MenuItem>
              <MenuItem value={"Nusa"}>Nusa</MenuItem>
            </Select>
            <Divider variant="middle" />
            <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
              <h2>Current Match Standings</h2>
              <Table sx={{ maxWidth: '98%' }} aria-label="simple table">
                <TableHead sx={{ color: "grey", background: "red", colorAdjust: "white" }}>
                  <TableRow >
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align="left">Team</StyledTableCell>
                    <StyledTableCell align="center">Place</StyledTableCell>
                    <StyledTableCell align="center">Place Pts</StyledTableCell>
                    <StyledTableCell align="center">Kill Pts</StyledTableCell>
                    <StyledTableCell align="center">Total</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {rows.map((row, ind) => (
                    <TableRow
                      key={ind}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" >
                        {ind + 1}
                      </TableCell>
                      <TableCell align="left">{row.team}</TableCell>
                      <TableCell align="center">{row.place}</TableCell>
                      <TableCell align="center">{row.placepts}</TableCell>
                      <TableCell align="center">{row.killpts}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {rows.length > 0 && <Button onClick={removefromTable} variant="contained" sx={{ m: 1, maxWidth: 110, background: "black" }} startIcon={<FaUndoAlt />}>UNDO</Button>}
            </TableContainer>
            <Divider variant="middle" />
            <h2>Enter Results</h2>
            <h2>PLACE #{indexe}</h2>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={teamlist}
              sx={{ mt: 1, width: 300 }}
              onChange={handleffff}
              noValidate
              renderInput={(params) => <TextField {...params} label="Team Name" />}
            />
            <br />
            {selectedTeam && <h3>Players:</h3>}
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch', mb: 2 },
              }}
              noValidate
              autoComplete="off"
            >
              {
                selectedTeam &&
                selectedTeam.players.map((each, ind) => (
                  <TextField
                    key={ind}
                    helperText="Leave Empty for 0"
                    type='tel'
                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                    sx={{ m: 1, maxWidth: 140 }}
                    label={each.inGameName}
                    variant="outlined"
                    onChange={(e) => {
                      // Update the killPoints for the corresponding player
                      const updatedPlayers = selectedTeam.players.map((player, index) => {
                        if (index === ind) {
                          return { ...player, kills: parseInt(e.target.value) };
                        }
                        return player;
                      });
                      setselectedTeam({ ...selectedTeam, players: updatedPlayers });
                    }}
                  />
                ))
              }
            </Box>
            {selectedTeam && <Button onClick={addToTable} variant="contained" sx={{ m: 1, maxWidth: 110 }} startIcon={<IoMdAdd />}>Add</Button>}
            <Divider variant="middle" />
            <Box display="flex"
              justifyContent="center"
              alignItems="center">
              <LoadingButton
                sx={{ m: 1, minWidth: 110 }}
                onClick={savecloud}
                loading={isloading}
                loadingPosition="start"
                startIcon={<MdCloudUpload />}
                variant="contained"
                size='small'
              >
                Save To Cloud
              </LoadingButton>
              <Button size='small' onClick={reset} variant="outlined" color="warning" sx={{ m: 1, maxWidth: 110 }} >Reset</Button>
            </Box>
          </FormControl>
        </div>
      </div>
    </>
  )
}
export default EnterResult;