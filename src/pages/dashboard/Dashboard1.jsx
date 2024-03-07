import React, { useState } from "react";
import { useEffect } from "react";
import "./dashboard1.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { header, setloader } from "../../store/login";
import tournlogo from '../../assets/logopng250.webp'
import { toast } from "react-toastify";
import { settournaid } from "../../store/api";
import { alltourna } from '../../store/api'
import DeleteIcon from "@mui/icons-material/Delete";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import FormControl from '@mui/material/FormControl';
import Dialogbox from "../utils/dialogbox";
import { setcreatenewmodal } from "../../store/api";
import { motion } from 'framer-motion';
import Forward10Icon from '@mui/icons-material/Forward10';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Dashboard = () => {
  const log = useSelector((state) => state.login);
  if (!log.islogin) {
    return <Navigate to='/login' />
  }
  const dispatch = useDispatch();
  const [load, setload] = useState(false)
  const navigate = useNavigate();
  const userprofile = useSelector((state) => state.userprofile);
  const tournacenter = useSelector((state) => state.tournacenter);
  useEffect(() => {
    dispatch(header("Dashboard"));
    dispatch(setloader(false));
    calc();
    console.log(userprofile.membership);
  }, []);


  const setdata = (data) => {
    dispatch(settournaid(data));
    navigate('/setting')
  };

  const deletee = (tournaid) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Tournament!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const token = localStorage.getItem("token");
        const id = toast.loading("Please wait...")
        try {
          const responsee = await fetch(`${tournacenter.apiadress}/torunadelete`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ tournaid })
          });
          const vfdvdf = await responsee.json();
          // console.log(vfdvdf);
          if (responsee.ok) {
            dispatch(alltourna());
            toast.update(id, { render: vfdvdf.msg, type: "success", isLoading: false, autoClose: 1600 });
          }
        } catch (error) {
          console.log(error);
          toast.update(id, { render: error, type: "warn", isLoading: false, autoClose: 1600 });
        }

      } else {
        // swal('Your data is safe!');
      }
    });
  }
  let defaultlogo = "https://res.cloudinary.com/dusxlxlvm/image/upload/v1699090690/just_yoljye.png";

  const init = {
    name: "",
    organiser: "",
    slots: "",
    type: ""
  }
  const [inp, setinp] = useState(init);
  const handleChange = (e) => {
    let naam = e.target.name;
    let value = e.target.value;
    setinp({
      ...inp, [naam]: value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setload(true);
    const { name, organiser, slots, type } = inp;
    const token = localStorage.getItem("token");

    try {
      const responsee = await fetch(`${tournacenter.apiadress}/addtournament`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inp)
      });
      const res = await responsee.json();
      // console.log(res);
      if (!responsee || responsee.status == 429 || responsee.status == 400) {
        setload(false);
        // console.log("error wala");
        return toast.warn(res.msg, { autoClose: 1700 })
      }
      toast.success(res.msg, { autoClose: 1300 })
      dispatch(alltourna());
      dispatch(setcreatenewmodal(false))
      setinp(init);
      setload(false);
    } catch (error) {
      console.log(error);
      toast.warn(res.msg, { autoClose: 1700 })
      setload(false);
    }
  }
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { x: -80, y: 80, opacity: 0, scale: 0 },
    visible: { y: 0, x: 0, scale: 1, opacity: 1 }
  };
  const [count, setcount] = useState({
    total: '',
    upcoming: '',
    ongoing: "",
    completed: ''
  })
  const calc = () => {
    let total = 0;
    let upcoming = 0;
    let ongoing = 0;
    let completed = 0
    tournacenter.alltournaments.map((val) => {
      val.status === 'upcoming' && upcoming++;
      val.status === 'ongoing' && ongoing++;
      val.status === 'completed' && completed++;
      total++;
    })
    setcount({
      total: total,
      upcoming: upcoming,
      ongoing: ongoing,
      completed: completed
    })
  }

  const [howmany, sethowmany] = useState(10);

  const [tournastatus, settournastatus] = useState('all');

  const handleChangee = (event) => {
    settournastatus(event.target.value);
  };
  const [filtered, setfiltered] = useState(tournacenter.alltournaments);
  const Funck = () => {
    let fgg = tournacenter.alltournaments.filter((val, ind) => {
      if (tournastatus != 'all') {
        return val.status == tournastatus;
      }
      return val
    })
    // console.log(fgg);
    setfiltered(fgg)
  }
  useEffect(() => {
    Funck();
  }, [tournastatus])

  function getTimeDifference(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInMilliseconds = Math.abs(currentDate - givenDate);
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return days;
  }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={tournacenter.createnewmodal ? "Dashboard modalopen" : "Dashboard"}>
        {tournacenter.alltournaments.length < 1 && <div className="notfound">
          <div>
            <SentimentDissatisfiedIcon className="sad" />
            <h2>No Tournament Found</h2>
            <p>Please Add Tournament.</p>
          </div>
        </div>}
        <div className="controles">
          <div className="card">
            <div>
              <span>Total Tournament</span> <span>:</span><span>{count.total}</span>
            </div>
            <div>
              <span>Upcoming</span> <span>:</span><span>{count.upcoming}</span>
            </div>
            <div>
              <span>Ongoing</span> <span>:</span><span>{count.ongoing}</span>
            </div>
            <div>
              <span>Completed</span> <span>:</span><span>{count.completed}</span>
            </div>
          </div>
          <div className="card">
            <div>
              <span>Plan</span> <span>:</span><span>{userprofile.membership.planid.plan_name ? userprofile.membership.planid.plan_name:'N/A'}</span>
            </div>
            <div>
              <span>Tournament Limit</span> <span>:</span><span>{userprofile.membership.planid.create_limit ? userprofile.membership.planid.create_limit: 0}</span>
            </div>
            <div>
              <span>Expire In</span> <span>:</span><span>{userprofile.membership.expire_date ? getTimeDifference(userprofile.membership.expire_date):'N/A'} Days</span>
            </div>
            <div>
              <span>Completed</span> <span>:</span><span>{count.completed}</span>
            </div>
          </div>
          <div className="operator">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button endIcon={<SportsEsportsIcon />} title="Create New Tournament"
                onClick={() => dispatch(setcreatenewmodal(true))} sx={{ width: '48%' }} variant="contained">New</Button>
              <LoadingButton
                loading={tournacenter.loading}
                onClick={() => dispatch(alltourna())}
                loadingPosition="end"
                sx={{ width: '48%' }}
                endIcon={<RefreshIcon />}
                variant="outlined"
                type="submit"
              // size="small"
              >
                REFRESH
              </LoadingButton>
            </div>
            <FormControl size="small" sx={{ width: "100%", mt: 1 }}>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tournastatus}
                label="Filter"
                onChange={handleChangee}
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                <MenuItem value={'ongoing'}>Ongoing</MenuItem>
                <MenuItem value={'completed'}>Completed</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <motion.div layout className="cards">
          {filtered &&
            filtered.slice(0, howmany).map((val) => {
              // Format the date
              const formattedDate = new Date(val.createdAt).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              );

              // Format the time
              const formattedTime = new Date(val.createdAt).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                }
              );
              return (
                <motion.div layout variants={item} className="card" key={val._id}>
                  <div className="img">
                    <img
                      loading="lazy"
                      src={val.tournment_logo ? val.tournment_logo : tournlogo}
                      alt="logo"
                    />
                    <span>{val.title}</span>
                  </div>
                  <span className={`status ${val.status}`}>{val.status}</span>
                  <h3 className="organiser">by {val.organiser}</h3>
                  <div className="time">
                    {formattedDate}, {formattedTime}
                  </div>
                  <div className="controller">
                    <Button size="small" onClick={() => setdata(val)} variant="contained">Manage</Button>
                    <DeleteIcon titleAccess="delete tournament" className="delete" onClick={() => deletee(val._id)} />
                  </div>
                </motion.div>
              )
            })
          }
        </motion.div>

        {tournacenter.alltournaments.length > howmany &&
          <Button endIcon={<Forward10Icon />} className="loadmore" onClick={() => sethowmany(howmany + 10)} variant="contained">Load More</Button>
        }

        <Dialogbox
          className="modale"
          open={tournacenter.createnewmodal}
          onClose={() => dispatch(setcreatenewmodal(false))}
        >
          <motion.div
            initial={{ scale: 0.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: .5, delay: .2 }}
            className="dashboardbox">
            <header>Create Tournament</header>
            <form onSubmit={handleRegister}>
              <section>
                <TextField required sx={{ minWidth: "100%" }} id="outlined-basic" onChange={handleChange} name="name" value={inp.name} label="Name" variant="outlined" />
              </section>
              <section>
                <TextField required sx={{ minWidth: "100%" }} id="outlined-basic" onChange={handleChange} name="organiser" value={inp.organiser} label="Organiser" variant="outlined" />
              </section>
              <section>
                <TextField required sx={{ minWidth: "100%" }} type="tel"
                  onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                  id="outlined-basic" onChange={handleChange} name="slots" value={inp.slots} label="Slots" variant="outlined"
                />
              </section>
              <section>
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">Type*</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={inp.type}
                    name="type"
                    required
                    label="type"
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>Select Type</MenuItem>
                    <MenuItem value={1}>SOLO</MenuItem>
                    <MenuItem value={2}>DUO</MenuItem>
                    <MenuItem value={4}>SQUAD</MenuItem>
                  </Select>
                </FormControl>
              </section>
              <Stack spacing={2} direction="row" sx={{ mr: 2, mt: 2 }}>
                <LoadingButton
                  loading={load}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  type="submit"
                >
                  CREATE
                </LoadingButton>
                <Button variant="outlined" onClick={() => dispatch(setcreatenewmodal(false))}>Cancel</Button>
              </Stack>
            </form>
          </motion.div>
        </Dialogbox>
      </motion.div>
    </>
  );
};

export default Dashboard;