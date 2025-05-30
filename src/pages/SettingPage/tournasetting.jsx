
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./tournasetting.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Detail from './Manageforms/detail';
import Registerform from './basicSetting/registerform';
import EnterResult from './Enterresult/Enterresult';
import ManageTeam from './ManageTeams/ManageTeam';
import Pointsystem from './PointSystem/Pointsystem';
import ViewMatches from './ViewMatches/ViewMatches';
import Stack from '@mui/material/Stack';
import { MdSettingsSuggest } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdOpenInNew } from "react-icons/md";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { setloader, header } from '../../store/login';
import { classicfetch, setowner } from '../../store/classic';
import swal from 'sweetalert';
import Modalbox from '../../components/custommodal/Modalbox';

const Tournasetting = () => {
  const navigate = useNavigate();
  const classic = useSelector((state) => state.classic);
  const tournacenter = useSelector((state) => state.tournacenter);
  const { tid } = useParams();
  const dispatch = useDispatch();
  const [showmodal, setshowmodal] = useState(false);
  const [paymentss, setpaymentss] = useState('');
  const [active, setactive] = useState(0);

  useEffect(() => {
    dispatch(classicfetch(tid));
    dispatch(header('Setting'))
    dispatch(setloader(true))
    // console.log(tournacenter)
  }, [])


  useEffect(() => {
    dispatch(setloader(classic.loading))
  }, [classic.loading])

  useEffect(() => {
    if (!classic.isowner && !classic.loading) {
      swal({
        title: 'Access Denied',
        text: 'You are not authorized to manage this tournament.',
        icon: 'warning',
      })
      dispatch(setowner(true));
      navigate('/dashboard');
      return;
    }
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
  let localhos = window.location.origin;

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
    toast.success("Link Copied", { autoClose: 900 })
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
            <MdSettingsSuggest className='icon' />
            <h3>Basic Settings</h3>
          </div>
          <div className="cont" onClick={() => handleactive(1)}>
            <MdDescription className='icon' />
            <h3>Manage Forms</h3>
          </div>
          <div className="cont" onClick={() => handleactive(2)}>
            <MdLeaderboard className='icon' />
            <h3>Enter Results</h3>
          </div>
          <div className="cont" onClick={() => handleactive(3)}>
            <MdOutlineGroup className='icon' />
            <h3>Manage Teams</h3>
          </div>
          <div className="cont" onClick={() => handleactive(4)}>
            <MdPostAdd className='icon' />
            <h3>Points System</h3>
          </div>
          <div className="cont" onClick={() => handleactive(5)}>
            <FaChartPie className='icon' />
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
          <Modalbox
            shadow={false}
            open={showmodal}
            onClose={() => setshowmodal(false)}>
            <div className="paymentssmodal">
              <span title='close' onClick={() => setshowmodal(false)}> X </span>
              <img src={paymentss} alt="payment SS" />
            </div>
          </Modalbox>
        </div>

        <div className="links">
          <div className="box">
            <header>Stats Page Link</header>
            <p>Check out the link for the latest: Points, Top Fraggers, Team Stats, and Match Performances. Share it with the participants!</p>
            <Stack spacing={2} direction="row" className='inpline'>
              <TextField aria-readonly sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={tournacenter.links && `${localhos}/stat/${tournacenter.links}`} label="Stats Page Link" variant="outlined" />
              <MdContentCopy title='Copy Link' className='copy' onClick={() => copyUrlToClipboard("stat")} />
            </Stack>
            <a href={`${localhos}/stat/${tid}`} target="_blank" title='Visit Page'>
              <Button sx={{ pb: 0.2, pt: 0.3 }} startIcon={<MdOpenInNew />} size='small' variant="contained">Visit</Button>
            </a>
          </div>

          <div className="box">
            <header>Registration Page Link</header>
            <p>Teams can register for this tournament using the following link.</p>
            <Stack spacing={2} direction="row" className='inpline'>
              <TextField sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={tournacenter.links && `${localhos}/register/${tournacenter.links}`} label="Registration Form Link" variant="outlined" />
              <MdContentCopy title='Copy Link' className='copy' onClick={() => copyUrlToClipboard("register")} />
            </Stack>
            <a href={`${localhos}/register/${tid}`} target="_blank" title='Visit Page'>
              <Button sx={{ pb: 0.2, pt: 0.3 }} startIcon={<MdOpenInNew />} size='small' variant="contained">Visit</Button></a>
          </div>

          <div className="box">
            <header>Public Post Link</header>
            <p>Find the tournament's public page here. Ensure the tournament visibility is set to 'PUBLISHED' and remember to add content to the public post.</p>
            <Stack spacing={2} direction="row" className='inpline'>
              <TextField sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={tournacenter.links && `${localhos}/tournaments/${tournacenter.links}`} label="Public Post Link" variant="outlined" />
              <MdContentCopy title='Copy Link' className='copy' onClick={() => copyUrlToClipboard("tournaments")} />
            </Stack>
            <a href={`${localhos}/tournaments/${tid}`} target="_blank" title='Visit Page'>
              <Button sx={{ pb: 0.2, pt: 0.3 }} startIcon={<MdOpenInNew />} size='small' variant="contained">Visit</Button></a>
          </div>
        </div>


      </div>
    </>
  )
}
export default Tournasetting;