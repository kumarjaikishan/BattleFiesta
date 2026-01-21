import {
    Paper, TableCell, tableCellClasses,
    Autocomplete, TextField, Button, styled, Divider, Box,
    Select, FormControl, MenuItem, InputLabel
} from '@mui/material';
import './enterresult.css';
import {  useParams } from "react-router-dom";
import { FaUndoAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { Reorder } from "framer-motion";
import { classicfetch } from '../../../store/classic';

const EditEnterResult = ({ match, setcalleditmatch,feteche }) => {
    const classic = useSelector((state) => state.classic);
    const [setting, setseting] = useState(classic.classicdetail);
    const [player, setplayer] = useState([]);
    const [map, setmap] = useState('');
    const [teamlist, setteamlist] = useState([]);
    const [selectedTeam, setselectedTeam] = useState();
    const [rows, setRows] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [indexe, setindexe] = useState(1);
    const { tid } = useParams();
    const dispatch = useDispatch(tid);

    const pointssystem = {
        killpts: setting.killpoints || 1,
        placepoints: setting.pointsystem,
        tiepreference: setting.tiepreference
    };

    useEffect(() => {
        setRows(match.points);
        setmap(match.map);
        const finest = classic.classicplayers.filter((val) => val.status === 'approved').map((item, ind) => ({
            place: ind + 1,
            label: item.teamName,
            teamid: item._id,
            players: item.player.map((val, ind) => ({
                id: ind,
                kills: 0,
                inGameName: val.inGameName,
                playerId: val.playerId
            }))
        }));
        const removeaddedtotable = finest.filter((val) => !match.points.some(point => point.teamid === val.teamid));
        setteamlist(removeaddedtotable);
    }, []);

    useEffect(() => {
        sortplayerdata(classic.classicplayers);
        // console.log(classic.classicplayers);
        // console.log(match)
    }, [classic.classicplayers]);

    const handleChange = (event) => {
        setmap(event.target.value);
    };

    const sortplayerdata = (data) => {
        const appro = data.filter(val => val.status === "approved");
        setplayer(appro);
    };

    const handleffff = (e, val) => {
        setselectedTeam(val);
    };

    const addToTable = () => {
        if (!selectedTeam) {
            toast.error("Please select a team");
            return;
        }

        const removeaddedtotable = teamlist.filter((val) => val.teamid !== selectedTeam.teamid);
        setteamlist(removeaddedtotable);

        const kills = selectedTeam.players.reduce((total, player) => total + (player.kills || 0), 0);

        const newRow = {
            team: selectedTeam.label,
            place: indexe,
            kills,
            teamid: selectedTeam.teamid,
            playerKills: selectedTeam.players
        };

        setRows(prev => [...prev, newRow]);
        setselectedTeam(null);
        setindexe(indexe + 1);
    };

    const deletee = (index) => {
        const last = rows[index];
        const retrieved = player.find(val => val._id === last.teamid);

        if (retrieved) {
            const restored = {
                label: retrieved.teamName,
                teamid: retrieved._id,
                players: retrieved.player.map((val, ind) => ({
                    id: ind,
                    kills: 0,
                    inGameName: val.inGameName,
                    playerId: val.playerId
                }))
            };
            setteamlist([...teamlist, restored]);
        }

        setRows(rows.filter((_, ind) => ind !== index));
    };

    const savecloud = async () => {
        const updatedPoints = rows.map((team, ind) => ({
            ...team,
            place: ind + 1,
            kills: team.playerKills.reduce((acc, val) => acc + (val.kills || 0), 0)
        }));

        const final = { ...match, map, points: updatedPoints };

        try {
            const id = toast.loading("Please wait...");
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}editmatch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ match: final })
            });

            const result = await response.json();
            if (!response.ok) {
                return toast.update(id, { render: result.message, type: "warning", isLoading: false, autoClose: 1600 });
            }
            feteche();
            dispatch(classicfetch(tid));
            toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose: 1600 });
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const reset = () => {
        setindexe(1);
        setRows([]);
        sortplayerdata(classic.classicplayers);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <div className="enterresult matchedit">
            <div className="box">
                <h2>Edit Match Info</h2>
                <FormControl sx={{ mb: 2, mt: 4, minWidth: '88%' }} size="small">
                    <InputLabel id="map-label">Map</InputLabel>
                    <Select
                        labelId="map-label"
                        id="map-select"
                        value={map}
                        label="Map"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>-- Select Map --</em></MenuItem>
                        <MenuItem value="Erangle">Erangle</MenuItem>
                        <MenuItem value="Livik">Livik</MenuItem>
                        <MenuItem value="Miramar">Miramar</MenuItem>
                        <MenuItem value="Vikendi">Vikendi</MenuItem>
                        <MenuItem value="Sanhok">Sanhok</MenuItem>
                    </Select>
                </FormControl>

                <span style={{
                    fontStyle: 'italic',
                    color: '#666',
                    display: 'block',
                    marginTop: '10px',
                    fontSize: '14px',
                    width: '100%',
                    textAlign: 'center'
                }}
                >
                *Note: Drag the team name to change its position (this affects only the position points).<br />
                Final rankings are calculated based on position and kill points after saving.
                </span>

                <Reorder.Group axis="y" values={rows} onReorder={setRows}>
                    {rows.map((team, teamIndex) => (
                        <Reorder.Item key={team.teamid} value={team} className="teamdetail">
                            <h3>Team: {team.team}</h3>
                            <div>
                                <span>Place: {teamIndex + 1}</span>
                                <span>Total Kills: {team.playerKills?.reduce((acc, val) => acc + (val.kills || 0), 0)}</span>
                                <span>
                                    <MdDelete title='Delete Team' onClick={() => deletee(teamIndex)} style={{ cursor: 'pointer' }} />
                                </span>
                            </div>
                            <div>Player Kills: ↴</div>
                            <div>
                                {team.playerKills.map((player, playerIndex) => (
                                    <TextField
                                        key={playerIndex}
                                        helperText="Leave Empty for 0"
                                        type="tel"
                                        size="small"
                                        value={player.kills}
                                        onPaste={(e) => !/^[0-9]*$/.test(e.clipboardData.getData("Text")) && e.preventDefault()}
                                        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                        sx={{ m: 1, mb: 0, maxWidth: 140 }}
                                        label={player.inGameName}
                                        variant="outlined"
                                        onChange={(e) => {
                                            const updated = [...rows];
                                            updated[teamIndex].playerKills[playerIndex].kills = parseInt(e.target.value) || 0;
                                            setRows(updated);
                                        }}
                                    />
                                ))}
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                <Divider variant="middle" />
                <div style={{ background: 'rgb(241, 240, 239)', borderRadius: '5px', padding: '2px' }}>
                    <h3>Add Remaining Team</h3>
                    <Autocomplete
                        disablePortal
                        options={teamlist}
                        getOptionLabel={(option) => option.label}
                        onChange={handleffff}
                        size='small'
                        sx={{ mt: 1, width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Team Name" />}
                    />
                    {selectedTeam && (
                        <Box>
                            <h4>Players</h4>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {selectedTeam.players.map((each, ind) => (
                                    <TextField
                                        key={ind}
                                        helperText="Leave Empty for 0"
                                        type="tel"
                                        sx={{ m: 1, maxWidth: 140 }}
                                        size='small'
                                        label={each.inGameName}
                                        variant="outlined"
                                        onChange={(e) => {
                                            const updatedPlayers = selectedTeam.players.map((player, index) =>
                                                index === ind ? { ...player, kills: parseInt(e.target.value) || 0 } : player
                                            );
                                            setselectedTeam({ ...selectedTeam, players: updatedPlayers });
                                        }}
                                    />
                                ))}
                            </Box>
                            <Button onClick={addToTable} variant="contained" startIcon={<IoMdAdd />}>Add</Button>
                        </Box>
                    )}
                </div>
                <Divider variant="middle" />
                <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <Button
                        onClick={savecloud}
                        loading={isloading}
                        loadingPosition="start"
                        startIcon={<MdCloudUpload />}
                        variant="contained"
                        size='small'
                        sx={{ m: 1 }}
                    >
                        Save Changes
                    </Button>
                    <Button size='small' startIcon={<FaUndoAlt />} onClick={reset} variant="outlined" color="warning" sx={{ m: 1 }}>Reset</Button>
                    <Button size='small' onClick={() => setcalleditmatch(false)} variant="contained" color="secondary" sx={{ m: 1 }}>Go Back</Button>
                </Box>
            </div>
        </div>
    );
};

export default EditEnterResult;
