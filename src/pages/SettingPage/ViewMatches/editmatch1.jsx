import {
    Paper, TableRow, TableHead, TableContainer, TableCell, tableCellClasses, TableBody,
    Table, Autocomplete, TextField, Button, styled, Divider, Box,
    Select, FormControl, MenuItem, InputLabel
} from '@mui/material';
import './enterresult.css'
import { useParams } from "react-router-dom";
import { FaUndoAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { classicfetch } from '../../../store/classic';


const EditEnterResult = ({ match, feteche, setcalleditmatch }) => {
    const classic = useSelector((state) => state.classic);
    const [setting, setseting] = useState(classic.classicdetail)
    const [player, setplayer] = useState([]);
    const [map, setmap] = useState('');
    const [teamlist, setteamlist] = useState([]);
    const [selectedTeam, setselectedTeam] = useState();
    const [rows, setRows] = useState([]);
    const [forupload, setforupload] = useState([]);
    const [isloading, setisloading] = useState(false);
    const { tid } = useParams();
    const dispatch = useDispatch(tid);


    // return console.log("from edited match", match)
    const pointssystem = {
        killpts: setting.killpoints || 1,
        placepoints: setting.pointsystem,
        tiepreference: setting.tiepreference
    }
    useEffect(() => {
        // fetderfreche();
    }, [player])

    useEffect(() => {
        setRows(match.points)
        setmap(match.map)
        const finest = classic.classicplayers.filter((val) => val.status == 'approved').map((item, ind) => {
            return {
                place: ind + 1,
                label: item.teamName,
                teamid: item._id,
                players: item.player.map((val, ind) => {
                    return { id: ind, kills: 0, inGameName: val.inGameName, playerId: val.playerId }
                })
            }
        })

        const removeaddedtotable = finest.filter((val) => {
            return !match.points.some(point => point.teamid === val.teamid);
        });
        // console.log(removeaddedtotable)
        setteamlist(removeaddedtotable);
    }, [])

    useEffect(() => {
        sortplayerdata(classic.classicplayers)
    }, [classic.classicplayers])


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
            setteamlist(vcvdv);
        }

    }
    const [indexe, setindexe] = useState(1);

    const handleffff = (e, val) => {
        setselectedTeam(val);
    }


    function createData(team, place, kills, teamid, playerKills) {
        return { team, place, kills, teamid, playerKills };
    }
    function createDataforupload(place, team, kills, teamid, playerKills) {
        return { place, team, kills, teamid, playerKills };
    }

    const updown = (up, ind) => {
        if (up) {
            const old = ind;
            const newpo = ind - 1;
            setRows((prevItems) => {
                const newItems = [...prevItems];
                [newItems[old], newItems[newpo]] = [newItems[newpo], newItems[old]];
                // console.log(newItems)
                return newItems;
            });
        } else {
            const old = ind;
            const newpo = ind + 1;
            setRows((prevItems) => {
                const newItems = [...prevItems];
                [newItems[old], newItems[newpo]] = [newItems[newpo], newItems[old]];
                return newItems;
            });
        }
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

        let kills = selectedTeam.players.reduce((total, player) => total + (player.kills || 0), 0);


        // Generate a new row data
        const newRow = createData(
            selectedTeam.label,  // Team name
            indexe,
            kills,
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
        setRows(temparray);
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

    const removefromTable = (inde) => {
        const last = rows[inde];

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
        // setindexe(indexe - 1);
        // console.log("retrive back 2nd", fgfb);
    }
    const deletee = (index) => {
        setRows(rows.filter((val, ind) => ind != index));
        removefromTable(index)
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

        const newpoints = rows.map((team, ind) => {
            return { ...team, place: ind + 1, kills: team.playerKills.reduce((accum, val) => accum + (val.kills || 0), 0) }
        })

        const final = { ...match }
        final.map = map;
        final.points = newpoints;

        // return console.log(final)
        try {
            const id = toast.loading("Please wait...")
            const token = localStorage.getItem("token");
            const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}editmatch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    match: final
                })
            })

            const result = await rese.json();

            if (!rese.ok) {
                return toast.update(id, { render: result.message, type: "warning", isLoading: false, autoClose: 1600 });
            }
            feteche();
            dispatch(classicfetch(tid));
            toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose: 1600 });
            // console.log(result);
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
            <div className="enterresult matchedit">
                <div className="box">
                    <h2>Edit Match Info</h2>
                    <p style={{
                        fontStyle: 'italic',
                        color: '#666',
                        display: 'block',
                        marginTop: '10px',
                        fontSize: '13px',
                        width: '100%',
                        textAlign: 'center'
                    }}
                    >
                        *Note: Drag the team name to change its position (this affects only the position points).<br />
                        Final rankings are calculated based on position and kill points after saving.
                    </p>
                    <FormControl sx={{ mb: 2, mt: 4, minWidth: '88%' }} size="small">
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

                            {rows && rows.map((team, teamIndex) => {
                                return (
                                    <div key={teamIndex} className="teamdetail">
                                        <h3>Team: {team.team}</h3>
                                        <div>
                                            <span>Place : {teamIndex + 1}</span>
                                            <span>Total Kills: {team.playerKills?.reduce((accum, val) => accum + (val.kills || 0), 0)}</span>
                                            <span>
                                                <FaArrowUp
                                                    title="Move Up"
                                                    onClick={teamIndex > 0 ? () => updown(true, teamIndex) : null}
                                                    style={{
                                                        marginRight: "9px",
                                                        color: teamIndex > 0 ? "inherit" : "grey",
                                                        cursor: teamIndex > 0 ? "pointer" : "not-allowed",
                                                    }}
                                                />
                                                <FaArrowDown
                                                    title="Move Down"
                                                    onClick={teamIndex < rows.length - 1 ? () => updown(false, teamIndex) : null}
                                                    style={{
                                                        color: teamIndex < rows.length - 1 ? "inherit" : "grey",
                                                        cursor: teamIndex < rows.length - 1 ? "pointer" : "not-allowed",
                                                    }}
                                                />
                                            </span>
                                            <span>
                                                <MdDelete onClick={() => deletee(teamIndex)} />
                                            </span>
                                        </div>
                                        <div>Player Kills : ↴</div>
                                        <div>
                                            {team?.playerKills?.map((player, playerIndex) => {
                                                return (
                                                    <TextField
                                                        key={playerIndex}
                                                        helperText="Leave Empty for 0"
                                                        type="tel"
                                                        size="small"
                                                        value={player.kills}
                                                        onPaste={(event) => {
                                                            const pasteData = event.clipboardData.getData("Text");
                                                            if (!/^[0-9]*$/.test(pasteData)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                        sx={{ mt: 1, maxWidth: 140 }}
                                                        label={player.inGameName}
                                                        variant="outlined"
                                                        onChange={(e) => {
                                                            const updatedRows = [...rows]; // Create a copy of the rows array
                                                            updatedRows[teamIndex].playerKills[playerIndex].kills = parseInt(e.target.value) || 0; // Update the specific kill count
                                                            setRows(updatedRows); // Update the state
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <Divider variant="middle" />
                        <div style={{ background: 'rgb(241, 240, 239)', borderRadius: '5px', padding: '2px' }}>
                            <h2>Add Team</h2>
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
                        </div>
                        <Divider variant="middle" />
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <Button
                                sx={{ m: 1, minWidth: 110 }}
                                onClick={savecloud}
                                loading={isloading}
                                loadingPosition="start"
                                startIcon={<MdCloudUpload />}
                                variant="contained"
                                size='small'
                            >
                                Save Changes
                            </Button>
                            <Button size='small' startIcon={<FaUndoAlt />} onClick={reset} variant="outlined" color="warning" sx={{ m: 1, maxWidth: 110 }} >Reset</Button>
                            <Button size='small' onClick={() => setcalleditmatch(false)} variant="contained" color="secondary" sx={{ m: 1, maxWidth: 110 }} >Go Back</Button>
                        </Box>
                    </FormControl>
                </div>
            </div>
        </>
    )
}
export default EditEnterResult;