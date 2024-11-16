import {
    Paper, TableRow, TableHead, TableContainer, TableCell, tableCellClasses, TableBody,
    Table, Autocomplete, TextField, Button, styled, Divider, Box,
    Select, FormControl, MenuItem, InputLabel
} from '@mui/material';
import './enterresult.css'
import { FaUndoAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector } from 'react-redux';

const EditEnterResult = ({ match_id }) => {
    const classic = useSelector((state) => state.classic);
    const [setting, setseting] = useState(classic.classicdetail)
    const [player, setplayer] = useState([]);
    const tid = setting._id;
    const [map, setmap] = useState('');
    const [teamlist, setteamlist] = useState([]);
    const [selectedTeam, setselectedTeam] = useState();
    const [rows, setRows] = useState([]);
    const [forupload, setforupload] = useState([]);
    const [isloading, setisloading] = useState(false)


    // return console.log("from edited match", match)
    const pointssystem = {
        killpts: setting.killpoints || 1,
        placepoints: setting.pointsystem,
        tiepreference: setting.tiepreference
    }

    useEffect(() => {
        fetchee(match_id);
    }, [])

    useEffect(() => {
        sortplayerdata(classic.classicplayers)
    }, [classic.classicplayers])

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

    const sortplayerdata = (data) => {
        let appro = data.filter((val, ind) => {
            return val.status == "approved"
        })
        setplayer(appro);
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

    const fetchee = async (tid) => {
      
        try {
            const token = localStorage.getItem("token");
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}editmatch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    tid
                })
            })

            const result = await rese.json();
            console.log(result);
           } catch (error) {
            console.log(error);
            setisloading(false)
            toast.update(id, { render: error.message, type: "warning", isLoading: false, autoClose: 1600 });
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
                    <h2>Edit Match Info</h2>
                    <p>The Teams are sorted in accordance to their places (not points).
                        Use arrow bottons to change their place.</p>
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
                            <MenuItem disabled value="">
                                <em>-------PUBG/BGMI Maps-------</em>
                            </MenuItem>
                            <MenuItem value={"Erangle"}>Erangle</MenuItem>
                            <MenuItem value={"Livik"}>Livik</MenuItem>
                            <MenuItem value={"Miramar"}>Miramar</MenuItem>
                            <MenuItem value={"Vikendi"}>Vikendi</MenuItem>
                            <MenuItem value={"Sanhok"}>Sanhok</MenuItem>
                            <MenuItem value={"Karakin"}>Karakin</MenuItem>
                            <MenuItem value={"Nusa"}>Nusa</MenuItem>
                            <MenuItem disabled value="">
                                <em>-------FreeFire Maps-------</em>
                            </MenuItem>
                            <MenuItem value={"Bermuda"}>Bermuda</MenuItem>
                            <MenuItem value={"Purgatory"}>Purgatory</MenuItem>
                            <MenuItem value={"Kalahari"}>Kalahari</MenuItem>
                            <MenuItem value={"Alpine"}>Alpine</MenuItem>
                            <MenuItem value={"Nexterra"}>Nexterra</MenuItem>
                            <MenuItem disabled value="">
                                <em>-------PUBG LITE Maps-------</em>
                            </MenuItem>
                            <MenuItem value={"VARENGA"}>VARENGA</MenuItem>
                            <MenuItem value={"GOLDEN WOODS"}>GOLDEN WOODS</MenuItem>
                        </Select>
                        <Divider variant="middle" />
                        <div component={Paper} sx={{ mt: 2, mb: 2 }}>

                            {rows && rows?.map((team, ind) => {
                                return <div key={ind} className="teamdetail">
                                    <h2>Team name</h2>
                                    <div>
                                        <span>Place : {ind + 1}</span>
                                        <span> Total Kills: 9</span>
                                        <span> <FaArrowUp />
                                            <FaArrowDown /> </span>
                                        <span><MdDelete /> </span>
                                    </div>
                                    <div>Player Kills</div>
                                    <div>
                                        {team?.points?.map((each, ind) => {
                                            return <TextField
                                                key={ind}
                                                helperText="Leave Empty for 0"
                                                type='tel'
                                                size='small'
                                                onPaste={(event) => {
                                                    const pasteData = event.clipboardData.getData('Text');
                                                    if (!/^[0-9]*$/.test(pasteData)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                sx={{ m: 1, maxWidth: 140 }}
                                                label={each.team}
                                                variant="outlined"
                                            // onChange={(e) => {
                                            //     const updatedPlayers = selectedTeam.players.map((player, index) => {
                                            //         if (index === ind) {
                                            //             return { ...player, kills: parseInt(e.target.value) };
                                            //         }
                                            //         return player;
                                            //     });
                                            //     setselectedTeam({ ...selectedTeam, players: updatedPlayers });
                                            // }}
                                            />
                                        })}

                                    </div>
                                </div>
                            })}

                        </div>
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
                                        onPaste={(event) => {
                                            const pasteData = event.clipboardData.getData('Text');
                                            if (!/^[0-9]*$/.test(pasteData)) {
                                                event.preventDefault();
                                            }
                                        }}
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
                                // onClick={savecloud}
                                loading={isloading}
                                loadingPosition="start"
                                startIcon={<MdCloudUpload />}
                                variant="contained"
                                size='small'
                            >
                                Save To Cloud
                            </LoadingButton>
                            <Button size='small' startIcon={<FaUndoAlt />} onClick={reset} variant="outlined" color="warning" sx={{ m: 1, maxWidth: 110 }} >Reset</Button>
                        </Box>
                    </FormControl>
                </div>
            </div>
        </>
    )
}
export default EditEnterResult;