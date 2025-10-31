import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import './pointsystem.css';
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
  const [setting, setseting] = useState(classic.classicdetail);
  const dispatch = useDispatch();

  const [points, setpoints] = useState('');
  const [isloading, setisloading] = useState(false);
  const [formData, setFormData] = useState({
    tiepreference: true,
    killpoints: 1
  });
  const [errorState, setErrorState] = useState(false); // 🚨 for red border state

  const realobj = {
    1: "25", 2: "14", 3: "10", 4: "8",
    5: "7", 6: "6", 7: "5", 8: "4", 9: "3",
    10: "2", 11: "1", 12: "1", 13: "1", 14: "1", 15: "1", 16: "1"
  };

  useEffect(() => {
    // console.log(setting)
    // console.log(tournacenter)
    convertObjectToString(setting.pointsystem);
    setFormData({
      tiepreference: setting.eachkillcount,
      killpoints: setting.killpoints
    });
  }, [setting]);


  let obj = {};
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
    setisloading(true);
    errorcheck();

    if (iserror) {
      setisloading(false);
      return; // stop if validation failed
    }

    const id = toast.loading("Please wait...");
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
      });

      const result = await rese.json();
      setisloading(false);

      if (!rese.ok) {
        return toast.update(id, { render: result.message, type: "warning", isLoading: false, autoClose: 1600 });
      }

      dispatch(alltourna());
      toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose: 1600 });

    } catch (error) {
      console.log(error);
      setisloading(false);
      toast.update(id, { render: "Failed", type: "warning", isLoading: false, autoClose: 1600 });
    }
  };

  const handleRankInputChange = (event) => {
    const val = event.target.value;
    setpoints(val);
    validatePoints(val);
  };

  // ✅ live validation check
  const validatePoints = (text) => {
    const validPattern = /^(\s*\d+(-\d+)?\s*=\s*\d+\s*,?\s*\n?)*$/;
    if (!validPattern.test(text.trim())) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
  };

  const errorcheck = () => {
    obj = {};
    iserror = false;
    let pointstrimmed = points.trim();
    if (pointstrimmed.charAt(pointstrimmed.length - 1) === ",") {
      pointstrimmed = pointstrimmed.slice(0, -1);
    }

    const val = pointstrimmed;
    const sorted = val.split(',\n');

    sorted.forEach((vale) => {
      if (!vale.includes("=")) {
        setErrorState(true);
        iserror = true;
        toast.warn(`Invalid format near "${vale}"`, { autoClose: 2500 });
        return;
      }

      const splited = vale.split('=');
      const position = splited[0].trim();
      const points = splited[1]?.trim();

      if (!position || !points || isNaN(points)) {
        iserror = true;
        setErrorState(true);
        toast.warn(`Invalid entry "${vale}"`, { autoClose: 2500 });
        return;
      }

      if (position.includes("-")) {
        const [from, to] = position.split('-').map(Number);
        if (from > to || isNaN(from) || isNaN(to)) {
          iserror = true;
          setErrorState(true);
          toast.warn(`Invalid range: ${position}`, { autoClose: 2500 });
          return;
        }
        for (let i = from; i <= to; i++) {
          if (obj[i]) {
            iserror = true;
            setErrorState(true);
            toast.warn(`Rank ${i} is repeated`, { autoClose: 2500 });
            return;
          }
          obj[i] = points;
        }
      } else {
        const rankNum = Number(position);
        if (isNaN(rankNum)) {
          iserror = true;
          setErrorState(true);
          toast.warn(`Invalid rank: ${position}`, { autoClose: 2500 });
          return;
        }
        if (obj[rankNum]) {
          iserror = true;
          setErrorState(true);
          toast.warn(`Rank ${rankNum} is repeated`, { autoClose: 2500 });
          return;
        }
        obj[rankNum] = points;
      }
    });

    if (!iserror) setErrorState(false);
  };

  const convertObjectToString = (obj) => {
    let result = '';
    let startKey = null;
    let prevValue = null;

    for (let key in obj) {
      key = Number(key);
      if (obj[key] !== prevValue) {
        if (startKey !== null) {
          result += startKey !== key - 1 ? ` ${startKey}-${key - 1} = ${prevValue},` : ` ${startKey} = ${prevValue},`;
        }
        startKey = key;
      }
      prevValue = obj[key];
    }

    result += startKey !== Math.max(...Object.keys(obj).map(Number))
      ? ` ${startKey}-${Math.max(...Object.keys(obj).map(Number))} = ${prevValue}`
      : ` ${startKey} = ${prevValue}`;

    const split = result.split(',');
    result = split.join(',\n');
    setpoints(result);
    return result;
  };

  const resetPoints = () => {
    setpoints(convertObjectToString(realobj));
    setErrorState(false);
    setFormData({
      tiepreference: true,
      killpoints: 1
    })
    toast.info("Points reset to default", { autoClose: 2000 });
  };

  return (
    <div className='pointsystem scroll' component="main">
      <div className='instruction'>
        <p><b>Format:</b></p>
        <p>Rank = Place Points</p>
        <br />
        <p>Rank can be a single or a range. Separate using commas.</p>
        <p><b>Example:</b></p>
        <p>1 = 20,</p>
        <p>2 = 14,</p>
        <p>3-5 = 10</p>
        <p>Here from 6th, everyone will get 0</p>
      </div>

      <form onSubmit={handleSubmit} className='grid'>
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Place Points"
          multiline
          value={points}
          rows={8}
          name='points'
          onChange={handleRankInputChange}
          required
          error={errorState}
          sx={{ mb: 3 }}
          helperText={
            errorState
              ? "⚠ Please check your format (missing comma or =)!"
              : "We added the most common point system. Modify as you please.All points must be seperated by Comma"
          }
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
            <MenuItem value={false}>Place Points</MenuItem>
          </Select>
          <FormHelperText>Preference to be given in case of a Tie</FormHelperText>
        </FormControl>

        <TextField
          label="Points Per Kill"
          variant="outlined"
          type='tel'
          fullWidth
          size='small'
          onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) event.preventDefault(); }}
          name="killpoints"
          required
          value={formData.killpoints}
          onChange={handleChange}
          helperText="Points to be awarded for each kill"
        />

        <div className="flex gap-3 mt-3">
          <Button
            fullWidth
            type="submit"
            disabled={isloading}
            variant="contained"
            startIcon={<FaSave />}
          >
            {isloading ? "Saving..." : "SUBMIT"}
          </Button>

          <Button
            fullWidth
            color="warning"
            variant="outlined"
            onClick={resetPoints}
          >
            Reset Points
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Pointsystem;
