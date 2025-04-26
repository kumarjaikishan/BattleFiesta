import React, { useState } from "react";
import { useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Badge from '@mui/material/Badge';
import { header, setloader } from "../../store/login";
import { toast } from "react-toastify";
import { settournaid } from "../../store/api";
import { alltourna } from '../../store/api'
import swal from 'sweetalert';
import { Helmet } from "react-helmet-async";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { setcreatenewmodal } from "../../store/api";
import { motion } from 'framer-motion';
import Modalbox from "../../components/custommodal/Modalbox";
import { BsGearFill } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
import { IoMdRefresh } from "react-icons/io";
import { LuSaveAll } from "react-icons/lu";
import { MdGroups, MdDelete, MdOutlineContentCopy, MdOutlineAddShoppingCart, MdReadMore } from "react-icons/md";
import { TbMoodSad } from "react-icons/tb";
import tournlogo from '../../assets/logowebp_250.webp'

const Dashboard = () => {
  const dispatch = useDispatch();
  const [load, setload] = useState(false)
  const navigate = useNavigate();
  const userprofile = useSelector((state) => state.userprofile);
  const tournacenter = useSelector((state) => state.tournacenter);

  useEffect(() => {
    dispatch(header("Dashboard"));
    dispatch(setloader(false));
    tournacenter?.alltournaments && calc();
    // console.log(tournacenter.alltournaments);
  }, [tournacenter.alltournaments]);


  const setdata = (data) => {
    // console.log(data);
    if (data.type == 'tdm') {
      navigate(`/tdmsetting/${data._id}`)
    } else {
      dispatch(settournaid(data));
      navigate(`/setting/${data._id}`)
    }
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
          const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}torunadelete`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ tournaid })
          });
          const vfdvdf = await responsee.json();
          // console.log(vfdvdf);
          if (!responsee.ok) {
            return toast.update(id, { render: vfdvdf.message, type: "warning", isLoading: false, autoClose: 1600 });
          }

          dispatch(alltourna());
          toast.update(id, { render: vfdvdf.message, type: "success", isLoading: false, autoClose: 1600 });

        } catch (error) {
          console.log(error);
          toast.update(id, { render: error.message, type: "warning", isLoading: false, autoClose: 1600 });
        }

      } else {
        // swal('Your data is safe!');
      }
    });
  }

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
      const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}addtournament`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inp)
      });
      const res = await responsee.json();
      console.log(responsee);
      console.log(res);
      setload(false);
      if (!responsee.ok || responsee.status == 429 || responsee.status == 400) {
        // console.log("error wala");
        return toast.warn(res.message, { autoClose: 2100 })
      }
      toast.success(res.message, { autoClose: 1700 });
      console.log("isme kyu aa raha hai")
      dispatch(alltourna());
      dispatch(setcreatenewmodal(false))
      setinp(init);
    } catch (error) {
      console.log(error);
      toast.warn(error.message, { autoClose: 2100 })
      setload(false);
    }
  }
  const container = {
    // hidden: { opacity: 1, scale: 0 },
    visible: {
      // opacity: 1,
      // scale: 1,
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
    tournacenter.alltournaments && Funck();
  }, [tournastatus, tournacenter.alltournaments])

  function getTimeDifference(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    // const currentDate = new Date("2024-04-04");

    const differenceInMilliseconds = givenDate - currentDate;
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return days + 1;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard || BattleFiesta</title>
        <link rel="canonical" href={`${window.location.origin}/dashboard`} />
        <meta name="description"
          content="Access the BattleFiesta Dashboard to create, manage, and track PUBG, BGMI, and Free Fire tournaments. View real-time points tables, monitor rankings, and organize esports events effortlessly." />
      </Helmet>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={tournacenter.createnewmodal ? "Dashboard modalopen" : "Dashboard"}>
        <div className="controles">
          <div className="card">
            <div>
              <span>Total Tournament</span> <span>:</span><span>{count.total || "N/A"}</span>
            </div>
            <div>
              <span>Upcoming</span> <span>:</span><span>{count.upcoming || 0}</span>
            </div>
            <div>
              <span>Ongoing</span> <span>:</span><span>{count.ongoing || 0}</span>
            </div>
            <div>
              <span>Completed</span> <span>:</span><span>{count.completed || 0}</span>
            </div>
          </div>
          <div className="card">
            <div>
              <span>Plan</span> <span>:</span><span>{userprofile?.membership?.planid?.plan_name || 'N/A'}</span>
            </div>
            <div>
              <span>Tournament Limit</span> <span>:</span><span>{userprofile?.membership?.planid?.create_limit || 'N/A'}</span>
            </div>
            <div>
              <span>Expire In</span> <span>:</span><span>{userprofile?.membership?.expire_date && (getTimeDifference(userprofile.membership.expire_date) < 0 ? "Expired" : `${getTimeDifference(userprofile.membership.expire_date)} Days`)} </span>
            </div>
            {getTimeDifference(userprofile.membership.expire_date) < 0 &&
              <NavLink className='buy' to='/subscription'>
                <Button size="small" fullWidth variant="contained" startIcon={<MdOutlineAddShoppingCart />}> Buy Membership</Button>
              </NavLink>}

          </div>
          <div className="operator">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* <Button endIcon={<CircularProgress size={15} color="inherit" />} title="Create New Tournament"
                onClick={() => dispatch(setcreatenewmodal(true))} sx={{ width: '48%' }} variant="contained">New</Button> */}
              <Button endIcon={<GiConsoleController />} title="Create New Tournament"
                onClick={() => dispatch(setcreatenewmodal(true))} sx={{ width: '48%' }} variant="contained">New</Button>
              <LoadingButton
                loading={tournacenter.loading}
                // onClick={() => dispatch(alltourna())}
                onClick={async () => {
                  try {
                    await dispatch(alltourna()).unwrap();
                    toast.success('Refreshed!', { autoClose: 900 });
                  } catch (error) {
                    toast.error('Failed to refresh!');
                  }
                }}
                loadingPosition="end"
                sx={{ width: '48%' }}
                endIcon={<IoMdRefresh />}
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
          {filtered.length > 0 ?
            filtered.slice(0, howmany)?.map((val) => {
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
                <Badge badgeContent={1} key={val._id} color="error" invisible={!val.newEntry}>
                  <motion.div layout variants={item} className="card" key={val._id}>
                    <div className="img">
                      <img
                        loading="lazy"
                        src={val.tournment_logo ? val.tournment_logo : tournlogo}
                        alt="logo"
                      />
                      <span title={val.title}>{val.title}</span>
                    </div>
                    <span className={`status ${val.status}`}>{val.status}</span>
                    <h3 className="organiser">by {val.organiser} </h3>
                    <div className="time">
                      <span>ID- {val.tournid}
                        <MdOutlineContentCopy title="Copy Id" onClick={() => {
                          navigator.clipboard.writeText(val.tournid);
                          toast.success('Copied', { autoClose: 1000 })
                        }} /></span>
                      <span> {formattedDate}</span>
                    </div>
                    <div className="registered">
                      <span >{val.type}</span>
                      <span title={`${val.totalTeamsRegistered} out of ${val.slots} slots Registered (including Approved and Pending teams)`}> <MdGroups /> . {val.totalTeamsRegistered}/{val.slots} </span>
                    </div>
                    <div className="controller">
                      <Button startIcon={<BsGearFill />} size="small" onClick={() => setdata(val)} variant="contained">Manage</Button>
                      <MdDelete title="delete tournament" className="delete" onClick={() => deletee(val._id)} />
                    </div>
                  </motion.div>
                </Badge>
              )
            }) :
            <div className="notfound">
              <div>
                <TbMoodSad className="sad" />
                <h2>No Tournament Found</h2>
                <p>Please Add Tournament.</p>
              </div>
            </div>
          }

        </motion.div>

        {tournacenter?.alltournaments?.length > howmany &&
          <Button endIcon={<MdReadMore />} className="loadmore" onClick={() => sethowmany(howmany + 10)} variant="contained">Load More</Button>
        }

        <Modalbox
          shadow={false}
          open={tournacenter.createnewmodal}
          onClose={() => dispatch(setcreatenewmodal(false))}>
          <div className="dashboardbox"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dusxlxlvm/image/upload/v1717760858/battlefiesta/assets/formback3-B7itQDrI_f1svum.jpg')" }}
          >
            <header>Create Tournament</header>
            <form onSubmit={handleRegister}>
              <section>
                <TextField fullWidth required id="outlined-basic" onChange={handleChange} name="name" value={inp.name} label="Name" variant="outlined" />
              </section>
              <section>
                <TextField required fullWidth id="outlined-basic" onChange={handleChange} name="organiser" value={inp.organiser} label="Organiser" variant="outlined" />
              </section>
              <section>
                <TextField required fullWidth type="tel"
                  onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                  id="outlined-basic" onChange={handleChange} name="slots" value={inp.slots} label="Slots" variant="outlined"
                />
              </section>
              <section>
                <FormControl fullWidth>
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
                    <MenuItem value='classic'>Classic</MenuItem>
                    <MenuItem value='tdm'>TDM</MenuItem>
                  </Select>
                </FormControl>
              </section>
              <Stack spacing={2} direction="row" sx={{ mr: 2, mt: 2 }}>
                <LoadingButton
                  loading={load}
                  loadingPosition="start"
                  startIcon={<LuSaveAll />}
                  variant="contained"
                  type="submit"
                >
                  CREATE
                </LoadingButton>
                <Button variant="outlined" onClick={() => dispatch(setcreatenewmodal(false))}>Cancel</Button>
              </Stack>
            </form>
          </div>
        </Modalbox>
      </motion.div>
    </>
  );
};

export default Dashboard;