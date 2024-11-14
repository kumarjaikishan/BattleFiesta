import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { IoCloudDownloadOutline } from "react-icons/io5";

const MatchTable = ({ rules, matches, isDesktopMode, tournamentOwner, teamdeatil, log, disable, imagedownload }) => {
    const [row, setrow] = useState([]);
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'

    useEffect(() => {
        // console.log("matches -", matches);
        matches?.length > 0 && handlee(matches[0])
        matches?.length > 0 && settitle(`${matches[0].map} - ${formtdate(0)}`)
    }, [matches])
    const [currentmatch, setcurrentmatch] = useState("");
    const [title, settitle] = useState(null)

    const handleChange = (event) => {

        // console.log(matches[event.target.value]);
        settitle(`${matches[event.target.value].map} - ${formtdate(event.target.value)}`)
        handlee(matches[event.target.value])
        setcurrentmatch(event.target.value);
    };
    const formtdate = (inde) => {
        const originalDate = new Date(matches[inde].createdAt);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(originalDate);
        return formattedDate;
    }
    const handlee = (sdvdf) => {
        // console.log(sdvdf);
        let matchlist = [];
        if (!sdvdf) {
            return;
        }
        sdvdf && sdvdf.points.map((vdfd, vff) => {
            let killpts = vdfd.kills * rules.killpoints;
            let placepts = parseInt(rules.pointsystem[vdfd.place]) || 0;
            let fvfvf = {
                team: vdfd.team,
                killpts,
                placepts,
                total: killpts + placepts,
                teamid: vdfd.teamid
            }
            matchlist.push(fvfvf);
        })
        matchlist.sort((a, b) => {
            b.total - a.total
        })
        matchlist.map((ggh, yu) => {
            teamdeatil.map((fdfggh, fggf) => {
                if (ggh.teamid == fdfggh._id) {
                    ggh.logo = fdfggh.teamLogo
                }
            })
        })
        setcurrentmatch(0);
        setrow(matchlist)
    }

    return (
        <>
            <div className={`${isDesktopMode ? 'matchtable desktop-mode' : 'matchtable'}`} id="matchtable">
                <h1>Match Stats</h1>
                {matches?.length > 0 ? <>
                    <div>
                        {!isDesktopMode &&
                            <FormControl size="small" sx={{ width: '350px', mt: 1 }}>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    sx={{
                                        color: 'white', // Customize label color
                                        '&.Mui-focused': {
                                            color: 'white', // Color when label is focused
                                        },
                                    }}
                                >
                                    Select Match
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currentmatch}
                                    label="Select Match"
                                    onChange={handleChange}
                                    sx={{
                                        minWidth: 250,
                                        color: 'white', // Customize text color
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        '& .MuiSelect-icon': {
                                            color: 'white', // Customize dropdown arrow icon color
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white', // Outline color when focused
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white', // Default outline color
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white', // Outline color on hover
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select Match
                                    </MenuItem>
                                    {matches.map((match, ind) => {
                                        const originalDate = new Date(match.createdAt);
                                        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
                                        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(originalDate);

                                        return (
                                            <MenuItem key={ind} value={ind}>
                                                Match #{ind + 1} - {match.map || 'N/A'} - {formattedDate}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        }
                    </div>
                    <p> Match #{currentmatch + 1}-{title && title} </p>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Team</th>
                                    <th>Place Pts</th>
                                    <th>Kill Pts</th>
                                    <th>Total Pts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {row.map((team, ind) => {
                                    return <tr key={ind}>
                                        <td style={{ textAlign: "left" }}> <span>#{ind + 1}</span><span> <img src={team.logo ? team.logo : group} alt="" /> </span><span> {team.team}</span></td>
                                        <td>{team.placepts}</td>
                                        <td>{team.killpts}</td>
                                        <td>{team.total}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </> : <div><h3>No Match Found</h3></div>}

            </div>
            {log?.islogin && tournamentOwner &&
                <div style={{ textAlign: 'center' }}>
                    <Button disabled={disable} onClick={() => imagedownload('#matchtable', `Match #${currentmatch + 1} - ${title}`)} title='Download Fraggers Stat' sx={{ mt: 0.3 }} component="label" variant="contained" startIcon={<IoCloudDownloadOutline />}>
                        Match
                    </Button>
                </div>
            }
        </>
    )
}
export default MatchTable;