
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./tournasetting.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
import { setloader, header } from '../../store/login';
import { classicfetch } from '../../store/classic';

const Tournasetting = () => {
  const log = useSelector((state) => state.login);
  const classic = useSelector((state) => state.classic);
  const tournacenter = useSelector((state) => state.tournacenter);
  if (!log.islogin) {
    toast.warn("You are not Logged In", { autoClose: 1300 })
    return <Navigate to='/login' />
  }
  const { tid } = useParams();
  const dispatch = useDispatch();
  const [showmodal, setshowmodal] = useState(false);
  const [paymentss, setpaymentss] = useState('');
  const [active, setactive] = useState(0);

  useEffect(() => {
    dispatch(classicfetch(tid));
    dispatch(header('Setting'))
    dispatch(setloader(true))
  }, [])
  useEffect(() => {
    dispatch(setloader(classic.loading))
  }, [classic.loading])

  if (!classic.classicsetting) {
    return <h3>Loading...</h3>
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
    var urlToCopy = `${localhos}/${page}/${tid}`;
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
          {active == 0 && <Registerform showss={showss} />}
          {active == 1 && <Detail />}
          {active == 2 && <EnterResult />}
          {active == 3 && <ManageTeam showss={showss} />}
          {active == 4 && <Pointsystem />}
          {active == 5 && <ViewMatches />}
          {showmodal && <Imagemodal setshowmodal={setshowmodal} paymentss={paymentss} />}
        </div>

        <div className="links">
          <div className="box">
            <header>Stats Page Link</header>
            <p>Check out the link for the latest: Points, Top Fraggers, Team Stats, and Match Performances. Share it with the participants!</p>
            <Stack spacing={2} direction="row" className='inpline'>
              <TextField aria-readonly sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={tournacenter.links && `${localhos}/stat/${tournacenter.links}`} label="Stats Page Link" variant="outlined" />
              <ContentCopyIcon titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("stat")} />
            </Stack>
            <a href={`${localhos}/stat/${tid}`} target="_blank" title='Visit Page'> <Button sx={{ pb: 0 }} size='small' variant="contained">Visit</Button></a>
          </div>

          <div className="box">
            <header>Registration Page Link</header>
            <p>Teams can register for this tournament using the following link.</p>
            <Stack spacing={2} direction="row" className='inpline'>
              <TextField sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={tournacenter.links && `${localhos}/register/${tournacenter.links}`} label="Registration Form Link" variant="outlined" />
              <ContentCopyIcon titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("register")} />
            </Stack>
            <a href={`${localhos}/register/${tid}`} target="_blank" title='Visit Page'> <Button sx={{ pb: 0 }} size='small' variant="contained">Visit</Button></a>
          </div>

          <div className="box">
            <header>Public Post Link</header>
            <p>Find the tournament's public page here. Ensure the tournament visibility is set to 'PUBLISHED' and remember to add content to the public post.</p>
            <Stack spacing={2} direction="row" className='inpline'>
              <TextField sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={tournacenter.links && `${localhos}/tournaments/${tournacenter.links}`} label="Public Post Link" variant="outlined" />
              <ContentCopyIcon titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("publicpost")} />
            </Stack>
            <a href={`${localhos}/tournaments/${tid}`} target="_blank" title='Visit Page'> <Button sx={{ pb: 0 }} size='small' variant="contained">Visit</Button></a>
          </div>
        </div>


      </div>
    </>
  )
}
export default Tournasetting;