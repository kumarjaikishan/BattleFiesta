import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MatchTable = ({ rules, matches, teamdeatil }) => {
    const [row, setrow] = useState([]);
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'
   
    useEffect(() => {
        // console.log("matches -", matches);
       matches?.length > 0 && handlee(matches[0])
    }, [matches])
    const [currentmatch, setcurrentmatch] = useState("");

    const handleChange = (event) => {
        // console.log(event.target.value);
        handlee(matches[event.target.value])
        setcurrentmatch(event.target.value);
    };
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
            <div className="matchtable">
                <h1>Match Stats</h1>
              {matches?.length > 0 ? <>
                <div>
                    <FormControl  sx={{width:'350px'}}>
                        <h3> Select Match :</h3>
                       <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentmatch}
                            label="Select Match"
                            className="selected"
                            onChange={handleChange}
                            sx={{ minWidth: 250 }}
                        >
                        <MenuItem value="" disabled>Select Match</MenuItem>
                            {matches.map((match, ind) => {
                                const originalDate = new Date(match.createdAt);
                                const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

                                const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(originalDate);
                                return <MenuItem key={ind} value={ind}>Match #{ind + 1} - {match.map || "N/A"} - {formattedDate}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
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
              </>: <div><h3>No Match Found</h3></div> }  
            </div>
        </>
    )
}
export default MatchTable;