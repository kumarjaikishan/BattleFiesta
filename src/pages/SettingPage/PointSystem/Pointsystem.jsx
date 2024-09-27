import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import FormHelperText from '@mui/material/FormHelperText';
import './pointsystem.css'
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { alltourna } from '../../../store/api';
import { FaSave } from "react-icons/fa";

const Pointsystem = () => {
  const tournacenter = useSelector((state) => state.tournacenter);
  const classic = useSelector((state) => state.classic);
  const [setting, setseting] = useState(classic.classicdetail)
  const dispatch = useDispatch();
  let obj = {};
  const [points, setpoints] = useState('');
  const [isloading, setisloading] = useState(false)
  const [formData, setFormData] = useState({
    tiepreference: '',
    killpoints: ''
  });
  const realobj = {
    1: "25", 2: "14", 3: "10", 4: "8",
    5: "7", 6: "6", 7: "5", 8: "4", 9: "3",
    10: "2", 11: "1", 12: "1", 13: "1", 14: "1", 15: "1", 16: "1"
  }
  useEffect(() => {
    // console.log(setting);
    convertObjectToString(setting.pointsystem);
    setFormData({
      tiepreference: tournacenter.current_tourna_details.tiepreference,
      killpoints: tournacenter.current_tourna_details.killpoints
    })
  }, [setting])
  let iserror = false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisloading(true)
    errorcheck();
    // console.log(obj);
    if (iserror) {
      // return console.log("not submitted");
    } else {
      // console.log(formData);
      const id = toast.loading("Please wait...")
      try {
        const token = localStorage.getItem("token");
        const rese = await fetch(`${import.meta.env.VITE_API_ADDRESS}pointsystem`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            tid: setting._id,
            tieprefer: formData.tiepreference,
            killpoints: formData.killpoints,
            placepoint: obj
          })
        })

        const result = await rese.json();
        // console.log(result);
        setisloading(false)
        if (!rese.ok) {
          return toast.update(id, { render: result.message, type: "warning", isLoading: false, autoClose: 1600 });
        }

        dispatch(alltourna());
        toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose: 1600 });


      } catch (error) {
        // console.log(error);
        setisloading(false)
        toast.update(id, { render: "Failed", type: "warning", isLoading: false, autoClose: 1600 });
      }
    }
  };

  const handleRankInputChange = (event) => {
    // Perform validation or any other processing here
    let val = event.target.value;
    setpoints(val);
  };

  const errorcheck = () => {
    // console.log(points);
    obj = {};
    iserror = false;
    let pointstrimmed = points.trim();
    //  console.log(dffdf.charAt(dffdf.length-1));
    if (pointstrimmed.charAt(pointstrimmed.length - 1) == ",") {
      pointstrimmed = pointstrimmed.substring(0, pointstrimmed.length - 1);
    }

    let val = pointstrimmed;
    let sorted = val.split(',\n');


    sorted.map((vale) => {
      let splited = vale.split('=');
      let position = splited[0].trim();
      let points = splited[1].trim();
      // console.log(position.indexOf("-"));
      if (position.indexOf("-") > 0) {
        let fdf = position.split('-');
        let from = parseInt(fdf[0]);
        let to = parseInt(fdf[1]);
        for (let i = from; i <= to; i++) {
          if (obj.hasOwnProperty(i)) {
            obj = {};
            iserror = true;
            return toast.warn(`Ranke ${i} is Repeated`, { autoClose: 2000 })
          } else {
            obj[i] = points;
          }
        }
        // console.log("-searched", position);
      } else {
        if (obj.hasOwnProperty(position)) {
          obj = {};
          iserror = true;
          return toast.warn(`Rank ${position} is Repeated`, { autoClose: 2000 })
        } else {
          obj[position] = points;
        }
      }
      // console.log(position,":",points);
    })
    // console.log(obj);
  }

  const convertObjectToString = (obj) => {
    let result = '';
    let startKey = null;
    let prevValue = null;

    for (let key in obj) {
      key = Number(key); // Convert key to number
      if (obj[key] !== prevValue) {
        if (startKey !== null) {
          result += startKey !== key - 1 ? ` ${startKey}-${key - 1} = ${prevValue},` : ` ${startKey} = ${prevValue},`;
        }
        startKey = key;
      }
      prevValue = obj[key];
    }

    // Add the last range or value
    result += startKey !== Math.max(...Object.keys(obj).map(Number)) ? ` ${startKey}-${Math.max(...Object.keys(obj).map(Number))} = ${prevValue}` : ` ${startKey} = ${prevValue}`;

    // Remove ranges of one key
    // result = result.replace(/(\d+)-\1/g, '$1'); not required anymore now
    // console.log(result);
    let split = result.split(',');
    result = split.join(',\n');
    setpoints(result)
    return result;
  }

  return (
    <div className='pointsystem scroll' component="main"   >
      <div className='instruction'>
        <p>Format:</p>
        <p> Rank = Place Points </p>
        <br />
        <p>Rank can be a single ora Range. Seperate using commas</p>
        <p>Example:</p>
        <p>1 = 20,</p>
        <p>2 = 14,</p>
        <p>3-5 = 10</p>
        <p>Here from 6th, everyone will get 0</p>
      </div>
      <form onSubmit={handleSubmit} className='grid'>
        <TextField
          id="outlined-multiline-static"
          label="Place Points"
          multiline
          value={points}
          rows={8}
          name='points'
          onChange={handleRankInputChange}
          required
          sx={{ mb: 3 }}
          helperText="We have added the most common point system. Fell free to modify as you please."
        />


        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Tie Preference</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formData.tiepreference}
            name='tiepreference'
            label="Tie Preference"
            required
            size='small'
            onChange={handleChange}
          >
            <MenuItem value={true}>Kill points</MenuItem>
            <MenuItem value={false}> Place Points</MenuItem>
          </Select>
          <FormHelperText>Preference to be given in case of a Tie</FormHelperText>
        </FormControl>

        <TextField
          label="Points Per Kill"
          variant="outlined"
          type='tel'
          fullWidth
          size='small'
          onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
          name="killpoints"
          required
          value={formData.killpoints}
          onChange={handleChange}
          helperText="Points to be awarded for each kill"
        />

        <LoadingButton
          sx={{ mt: 3 }}
          fullWidth
          type="submit"
          loading={isloading}
          startIcon={<FaSave />}
          loadingPosition="start"
          variant="contained"
        >
          SUBMIT
        </LoadingButton>

      </form>
    </div>
  );
};

export default Pointsystem;
