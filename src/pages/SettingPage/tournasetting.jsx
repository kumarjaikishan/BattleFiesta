
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./tournasetting.css";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiWrapper from '../../store/apiWrapper';
import Detail from './Manageforms/detail';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DescriptionIcon from '@mui/icons-material/Description';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupIcon from '@mui/icons-material/Group';
import Registerform from './basicSetting/registerform';
import EnterResult from './Enterresult/Enterresult';
import ManageTeam from './ManageTeams/ManageTeam';
import Pointsystem from './PointSystem/Pointsystem';
import ViewMatches from './ViewMatches/ViewMatches';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Imagemodal from './basicSetting/imagemodal';
import { setloader,header } from '../../store/login';
import useImageUpload from "../utils/imageresizer";

const Tournasetting = () => {
  const log = useSelector((state) => state.login);
  if (!log.islogin) {
    toast.warn("You are not Logged In", { autoClose: 1300 })
    return <Navigate to='/login' />
  }
  const dispatch = useDispatch();
  const { handleImage } = useImageUpload();
  const tournacenter = useSelector((state) => state.tournacenter);
  const [setting, setsetting] = useState(tournacenter.current_tourna_details);
  const [showmodal, setshowmodal] = useState(false);
  const [paymentss, setpaymentss] = useState('');

  const init = {
    tid: "",
    title: "",
    organiser: "",
    slots: "",
    type: "",
    banner: "",
    logo: "",
    status: "",
    visibility: "",
    label: ""
  }
  const [inp, setinp] = useState(init);
  const [loading, setLoading] = useState(false);
  const [active, setactive] = useState(0);
  useEffect(() => {
    dispatch(header('Setting'))
    // console.log("SETTING",tournacenter.current_tourna_details);
    setinp({
      tid: setting._id,
      title: setting.title,
      organiser: setting.organiser,
      slots: setting.slots,
      type: setting.type,
      banner: setting.tournment_banner,
      logo: setting.tournment_logo,
      status: setting.status,
      visibility: setting.visibility,
      label: setting.label
    })
  }, [])
  const handleChange = (e) => {
    let naam = e.target.name;
    let value = e.target.value;
    setinp({
      ...inp, [naam]: value
    })
  }
  const submit = async () => {
    setLoading(true);
    const url = `${tournacenter.apiadress}/settournament`;
    const method = "POST";
    // const body = { tid, title, organiser, slots, type, status, visibility, label };
    const body = inp;

    const successAction = (data) => {
      toast.success(data.msg, { autoClose: 1300 });
      setLoading(false);
      console.log(data.data);
    };

    // const loaderAction = (isLoading) => dispatch(setloader(isLoading));

    await apiWrapper(url, method, body, successAction);
  }

  const upload = async (id) => {
    setLoading(true);
    let konsa = 0;
    let oldimage = "";
    id == "tournbanner" ? konsa = 1 : konsa = 2;
    let newimage = document.querySelector(`#${id}`).files[0];

    if (konsa == 2){
       newimage = await handleImage(280, newimage);
    }

    if (konsa == 1) {
      oldimage = inp.banner;
    } else {
      oldimage = inp.logo
    }
    let data = new FormData();

    data.append('tid', setting._id)
    data.append('filed', id)
    data.append('image', newimage)
    data.append('oldimage', oldimage)
    // console.log("sseing",data.tid);

    const token = localStorage.getItem("token");
    try {
      const id = toast.loading("Please wait while Uploading...")
      const rese = await fetch(`${tournacenter.apiadress}/settournamentlogos`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: data
      })
      const resuke = await rese.json();
      console.log(resuke);
      if (rese.ok) {
        konsa == 1 ? setinp({ ...inp, banner: resuke.url }) : setinp({ ...inp, logo: resuke.url });
        toast.update(id, { render: "Uploaded Successfully", type: "success", isLoading: false, autoClose: 1600 });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.update(id, { render: "Something Went Wrong", type: "warn", isLoading: false, autoClose: 1600 });
    }
  }
  const handleactive = (index) => {
    let all = document.querySelectorAll('.controller .cont');

    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove("active");
    }

    setactive(index);
    all[index].classList.add("active");
  }
  let localhos = tournacenter.linkaddress;

  function copyUrlToClipboard(page) {
    // Create a temporary input element
    var inputElement = document.createElement("input");

    // Set the value of the input to the URL you want to copy
    var urlToCopy = `${localhos}/${page}/${tournacenter.links}`;
    inputElement.value = urlToCopy;

    // Append the input to the document
    document.body.appendChild(inputElement);

    // Select the text in the input
    inputElement.select();

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the input from the document (cleanup)
    document.body.removeChild(inputElement);

    // Alert or notify the user
    // alert("URL copied to clipboard: " + urlToCopy);
    toast.success("Copied Successfully", { autoClose: 900 })
  }

  const showss = (inp) => {
    setshowmodal(true);
    setpaymentss(inp)
  }

  return (
    <>
      <div className="tournasetting">
        <div className="controller">
          <div className="cont active" onClick={() => handleactive(0)}>
            <SettingsSuggestIcon className='icon' />
            <h3>Basic Settings</h3>
          </div>
          <div className="cont" onClick={() => handleactive(1)}>
            <DescriptionIcon className='icon' />
            <h3>Manage Forms</h3>
          </div>
          <div className="cont" onClick={() => handleactive(2)}>
            <LeaderboardIcon className='icon' />
            <h3>Enter Results</h3>
          </div>
          <div className="cont" onClick={() => handleactive(3)}>
            <GroupIcon className='icon' />
            <h3>Manage Teams</h3>
          </div>
          <div className="cont" onClick={() => handleactive(4)}>
            <PostAddIcon className='icon' />
            <h3>Points System</h3>
          </div>
          <div className="cont" onClick={() => handleactive(5)}>
            <PieChartOutlineIcon className='icon' />
            <h3>View Matches</h3>
          </div>
        </div>
        <div className="material">
          {active == 0 && <Registerform showss={showss} setting={setting} />}
          {active == 1 && <Detail submit={submit} upload={upload} handleChange={handleChange} loading={loading} inp={inp} setinp={setinp} />}
          {active == 2 && <EnterResult setting={setting} />}
          {active == 3 && <ManageTeam setting={setting}  showss={showss}/>}
          {active == 4 && <Pointsystem setting={setting} />}
          {active == 5 && <ViewMatches setting={setting} />}
          {showmodal && <Imagemodal setshowmodal={setshowmodal} paymentss={paymentss} />}
        </div>

        <div className="links">
          <div className="box">
            <header>Stats Page Link</header>
            <p>Check out the link for the latest: Points, Top Fraggers, Team Stats, and Match Performances. Share it with the participants!</p>
            <Stack spacing={2} direction="row">
              <TextField aria-readonly sx={{width:"250px"}}  inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={ tournacenter.links && `${localhos}/stat/${tournacenter.links}`} label="Stats Page Link" variant="outlined" />
              <ContentCopyIcon titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("stat")} />
            </Stack>
            <a href={`${localhos}/stat/${tournacenter.links}`} target="_blank" title='Visit Page'> <Button sx={{pb:0}} size='small'  variant="contained">Visit</Button></a>
          </div>

          <div className="box">
            <header>Registration Page Link</header>
            <p>Teams can register for this tournament using the following link.</p>
            <Stack spacing={2} direction="row">
              <TextField sx={{width:"250px"}} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={ tournacenter.links && `${localhos}/register/${tournacenter.links}`} label="Registration Form Link" variant="outlined" />
              <ContentCopyIcon titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("register")} />
            </Stack>
            <a href={`${localhos}/register/${tournacenter.links}`} target="_blank" title='Visit Page'> <Button sx={{pb:0}} size='small' variant="contained">Visit</Button></a>
          </div>

          <div className="box">
            <header>Public Post Link</header>
            <p>Find the tournament's public page here. Ensure the tournament visibility is set to 'PUBLISHED' and remember to add content to the public post.</p>
            <Stack spacing={2} direction="row">
              <TextField sx={{width:"250px"}} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={tournacenter.links && `${localhos}/tournaments/${tournacenter.links}`} label="Public Post Link" variant="outlined" />
              <ContentCopyIcon titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("publicpost")} />
            </Stack>
            <a href={`${localhos}/tournaments/${tournacenter.links}`} target="_blank" title='Visit Page'> <Button sx={{pb:0}} size='small' variant="contained">Visit</Button></a>
          </div>
        </div>


      </div>
    </>
  )
}
export default Tournasetting;