import React, { useState } from "react";
import { useEffect } from "react";
import "./dashboard1.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { header, setloader } from "../../store/login";
import apiWrapper from "../../store/apiWrapper";
import tournlogo from '../../assets/pubg.webp'
import { toast } from "react-toastify";
import { settournaid } from "../../store/api";
import { alltourna } from '../../store/api'
import DeleteIcon from "@mui/icons-material/Delete";
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
  const tournacenter = useSelector((state) => state.tournacenter);
  useEffect(() => {
    dispatch(header("Dashboard"));
    dispatch(setloader(false));
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

    const url = `${tournacenter.apiadress}/addtournament`;
    const method = 'POST';
    const body = { name, type, slots, organiser };

    const successAction = (data) => {
      toast.success(data.msg, { autoClose: 1300 });
      dispatch(alltourna());
      dispatch(setcreatenewmodal(false))
      setinp(init);
      setload(false);
    };

    // const loaderAction = (isLoading) => dispatch(setloader(isLoading));

    await apiWrapper(url, method, body, successAction);
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

  const [howmany, sethowmany] = useState(10);

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
          <LoadingButton
            loading={tournacenter.loading}
            onClick={() => dispatch(alltourna())}
            loadingPosition="start"
            endIcon={<RefreshIcon />}
            variant="contained"
            type="submit"
          >
            REFRESH
          </LoadingButton>
        </div>
        <motion.div  layout className="cards">
          {tournacenter.alltournaments &&
            tournacenter.alltournaments.slice(0, howmany).map((val) => {
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
                <motion.div layout  variants={item} className="card" key={val._id}>

                  <div className="img">
                    <img
                      src={val.tournment_logo ? val.tournment_logo : tournlogo}
                      alt="logo"
                    />
                    <span>{val.title}</span>
                  </div>
                  <h3 className="organiser">by {val.organiser}</h3>
                  <div className="time">
                    {formattedDate}, {formattedTime}
                  </div>
                  <div className="controller">
                    <Stack spacing={2} direction="row" sx={{ ml: 2 }}>
                      <Button size="small" onClick={() => setdata(val)} variant="contained">Manage</Button>
                      <p className="status">{val.status}</p>
                      <DeleteIcon titleAccess="delete tournament" className="delete" onClick={() => deletee(val._id)} />
                    </Stack>
                  </div>
                </motion.div>
              )
            })
          }
        </motion.div>

        {tournacenter.alltournaments.length > howmany &&
        <Button endIcon={<Forward10Icon />} className="loadmore" onClick={() => sethowmany(howmany + 10)} variant="contained">Load More</Button>
        }
        {tournacenter.createnewmodal && <div className="modal">
          <motion.div
            initial={{ x: 700, y: -300, scale: 0.1 }}
            animate={{ x: 0, y: 0, scale: 1 }}
            transition={{ duration: .5, delay: .2, type: 'spring', bounce: .5 }}
            className="box">
            <header>Create Tournament</header>
            <form onSubmit={handleRegister}>
              <section>
                <TextField required sx={{ minWidth: "90%" }} id="outlined-basic" onChange={handleChange} name="name" value={inp.name} label="Name" variant="outlined" />
              </section>
              <section>
                <TextField required sx={{ minWidth: "90%" }} id="outlined-basic" onChange={handleChange} name="organiser" value={inp.organiser} label="Organiser" variant="outlined" />
              </section>
              <section>
                <TextField required sx={{ minWidth: "90%" }} type="tel"
                  onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                  id="outlined-basic" onChange={handleChange} name="slots" value={inp.slots} label="Slots" variant="outlined"
                />
              </section>
              <section>
                <FormControl sx={{ minWidth: "90%" }}>
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
              <Stack spacing={2} direction="row" sx={{ m: 2 }}>
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
        </div>}
      </motion.div>
    </>
  );
};

export default Dashboard;