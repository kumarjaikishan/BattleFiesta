import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
import { setloader } from "../../../store/login";
import './viewmatches.css'
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import { TbMoodSad } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import EditEnterResult from './editmatch';

const PointSystem = () => {
  const dispatch = useDispatch();
  const classic = useSelector((state) => state.classic);
  const [isloading, setisloading] = useState(false)
  const [matches, setmatches] = useState([]);
  const [rules, setrules] = useState([])
  const [calleditmatch, setcalleditmatch] = useState(false);
  const [editmatchinfo, seteditmatchinfo] = useState([]);
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
      dispatch(setloader(false));
      if (!response.ok) {
        return toast.warn(responseData.message, { autoClose: 1700 })
      }
      setmatches(responseData.matches)
      setrules(responseData.rules)
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

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Match!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
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
    })
  }
  const edit = (data) => {
    // console.log(data);
    setcalleditmatch(true);
    seteditmatchinfo(data)
  }

  return (
    <>
      {!calleditmatch ? <div className='viewmatches'>
        <h2>Matches List</h2>
        {matches.length < 1 &&
          <div className="notfound">
            <div>
              <TbMoodSad className="sad" />
              <h2>No Match Found for this Tournament</h2>
              <p>Please Add Matches First in 'Enter Results' Section.</p>
            </div>
          </div>}
        {matches.map((match, ind) => {
          const originalDate = new Date(match.createdAt);
          const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

          const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(originalDate);
          return <Accordion key={ind} className=''>
            <AccordionSummary
              expandIcon={<MdKeyboardArrowDown />}
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
                <Button variant="outlined"
                  onClick={() => edit(match)}
                  startIcon={<IoMdCreate />}>
                  Edit
                </Button>
                <LoadingButton
                  onClick={() => deletee(match._id)}
                  loading={isloading}
                  color='error'
                  loadingPosition="start"
                  startIcon={<MdDelete />}
                  variant="outlined"
                  type="submit"
                >
                  DELETE
                </LoadingButton>
              </Stack>
            </AccordionDetails>
          </Accordion>
        })}

      </div> :
        <EditEnterResult match={editmatchinfo} />}
    </>);
};



export default PointSystem;




