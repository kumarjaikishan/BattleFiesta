import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
import { setloader } from "../../../store/login";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './viewmatches.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';

const PointSystem = () => {
  const dispatch = useDispatch();
  const classic = useSelector((state) => state.classic);
  const [isloading, setisloading] = useState(false)
  const [matches, setmatches] = useState([]);
  const [rules, setrules] = useState([])
  useEffect(() => {
    feteche();
  }, []);
  const feteche = async () => {
    const tid = classic.classicdetail._id;

    try {
      dispatch(setloader(true));
      const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}getmatches`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ tid })
      });

      const responseData = await response.json();
      // console.log(responseData);
      if (response.ok) {
        setmatches(responseData.matches)
        setrules(responseData.rules)
        dispatch(setloader(false));
      }
    } catch (error) {
      console.error(error);
      dispatch(setloader(false));
    }
  }

  function createData(team, place, placepts, killpts, total, teamid) {
    return { team, place, placepts, killpts, total, teamid };
  }

  function comparePlayers(playerA, playerB) {
    // Compare total points first
    if (playerA.total !== playerB.total) {
      return playerB.total - playerA.total; // Higher total points get higher rank
    }

    // If total points are the same, compare kill points
    if (rules.tiepreference) {
      return playerB.killpts - playerA.killpts; // Higher kill points get higher rank
    } else {
      return playerA.killpts - playerB.killpts; // Higher kill points get higher rank
    }
  }

  const sabthikhai = (array) => {
    let temparray = [];
    array.map((val, ind) => {
      let placepoints = rules.pointsystem[val.place];
      let killpoints = val.kills * rules.killpoints;
      let total = parseInt(placepoints) + killpoints;

      let dffg = createData(
        val.team, val.place, placepoints, killpoints, total, val.teamid
      )
      temparray.push(dffg);
      let sorted = temparray.sort(comparePlayers);
      temparray = sorted;
    })
    // console.log("temparray", temparray);
    return temparray;
  }
  const deletee = async (matchid) => {
    try {
      setisloading(true)
      const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}deletematch`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ matchid })
      });

      const responseData = await response.json();
      // console.log(responseData);
      if (response.ok) {
        toast.success(responseData.message, { autoClose: 1500 });
        feteche();
      }
      setisloading(false)
    } catch (error) {
      console.error(error);
      setisloading(false)
    }
  }

  return (
    <div className='viewmatches'>
      <h2>Matches List</h2>
      {matches.length < 1 && <div className="notfound">
        <div>
          <SentimentDissatisfiedIcon className="sad" />
          <h2>No Matches Found for this Tournament</h2>
          <p>Please Add Matches First.</p>
        </div>
      </div>}
      {matches.map((match, ind) => {
        const originalDate = new Date(match.createdAt);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(originalDate);
        return <Accordion key={ind} className=''>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className='panelheader'
          >
            <span className='title'>
              <span>Match #{ind + 1} - {match.map ? match.map : "N/A"}</span>
              <span>{formattedDate}</span>
            </span>
          </AccordionSummary>
          <AccordionDetails className='tablehead'>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Place</th>
                  <th>Place Pts</th>
                  <th>Kill Pts</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {sabthikhai(match.points).map((val, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.team}</td>
                    <td>{val.place}</td>
                    <td>{val.placepts}</td>
                    <td>{val.killpts}</td>
                    <td>{val.total}</td>
                  </tr>
                })}
              </tbody>
            </table>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<CreateIcon />}>
                Edit
              </Button>
              <LoadingButton
                onClick={() => deletee(match._id)}
                loading={isloading}
                color='warning'
                loadingPosition="start"
                startIcon={<DeleteIcon />}
                variant="outlined"
                type="submit"
              >
                DELETE
              </LoadingButton>
            </Stack>
          </AccordionDetails>
        </Accordion>
      })}

    </div>
  );
};



export default PointSystem;




