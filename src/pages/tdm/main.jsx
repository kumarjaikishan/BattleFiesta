
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./main.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Detail from './Manageforms/detail';
import { MdSettingsSuggest } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdOpenInNew } from "react-icons/md";
import Registerform from './basicSetting/registerform';
import ManageTeam from './ManageTeams/ManageTeam';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { setloader, header } from '../../store/login';
import { tdmfetch, setowner } from '../../store/tdm';
import swal from 'sweetalert';
import Modalbox from '../../components/custommodal/Modalbox';

const Tdmsetting = () => {
  const navigate = useNavigate();
  const { tid } = useParams();
  const dispatch = useDispatch();
  const tdmrtk = useSelector((state) => state.tdm);
  const [showmodal, setshowmodal] = useState(false);
  const [paymentss, setpaymentss] = useState('');


  const [active, setactive] = useState(0);
  useEffect(() => {
    dispatch(tdmfetch(tid));
    dispatch(header('Setting'))
    dispatch(setloader(true))
  }, [])
  useEffect(() => {
    dispatch(setloader(tdmrtk.loading))
  }, [tdmrtk.loading])

  useEffect(() => {
    if (!tdmrtk.isowner && !tdmrtk.loading) {
      swal({
        title: 'Access Denied',
        text: 'You are not authorized to manage this tournament.',
        icon: 'warning',
      })
      dispatch(setowner(true));
      navigate('/dashboard');
      return;
    }
  }, [tdmrtk.loading])



  if (!tdmrtk.tdmsetting) {
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
    toast.success("Copied Successfully", { autoClose: 900 })
  }

  const showss = (inp) => {
    setshowmodal(true);
    setpaymentss(inp)
  }

  return (
    <>
      <div className="tdmtournasetting">
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
            <MdOutlineGroup className='icon' />
            <h3>Manage Players</h3>
          </div>
        </div>
        <div className="material">
          {active == 0 && <Registerform showss={showss} />}
          {active == 1 && <Detail />}
          {/* {active == 2 && <EnterResult setting={setting} />} */}
          {active == 2 && <ManageTeam showss={showss} />}
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
          {/* <div className="box">
            <header>Stats Page Link</header>
            <p>Check out the link for the latest: Points, Top Fraggers, Team Stats, and Match Performances. Share it with the participants!</p>
            <Stack spacing={2} direction="row">
              <TextField aria-readonly sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={tournacenter.links && `${localhos}/stat/${tournacenter.links}`} label="Stats Page Link" variant="outlined" />
              <MdContentCopy titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("stat")} />
            </Stack>
            <a href={`${localhos}/stat/${tournacenter.links}`} target="_blank" title='Visit Page'> <Button sx={{ pb: 0 }} size='small' variant="contained">Visit</Button></a>
          </div> */}

          <div className="box">
            <header>Registration Page Link</header>
            <p>Teams can register for this tournament using the following link.</p>
            <Stack spacing={2} direction="row" className='inpline'>
              <TextField sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={`${localhos}/tdmregister/${tid}`} label="Registration Form Link" variant="outlined" />
              <MdContentCopy titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("tdmregister")} />
            </Stack>
            <a href={`${localhos}/tdmregister/${tid}`} target="_blank" title='Visit Page'>
              <Button sx={{ pb: 0.2, pt: 0.3 }} startIcon={<MdOpenInNew />} size='small' variant="contained">Visit</Button>
            </a>
          </div>

          <div className="box">
            <header>Public Post Link</header>
            <p>Find the tournament's public page here. Ensure the tournament visibility is set to 'PUBLISHED' and remember to add content to the public post.</p>
            <Stack spacing={2} direction="row" className='inpline'>
              <TextField sx={{ width: "250px" }} inputProps={{ style: { fontSize: 12 } }} id="outlined-basic" size='small' value={`${localhos}/tournaments/${tid}`} label="Public Post Link" variant="outlined" />
              <MdContentCopy titleAccess='Copy Link' className='copy' onClick={() => copyUrlToClipboard("tournaments")} />
            </Stack>
            <a href={`${localhos}/tournaments/${tid}`} target="_blank" title='Visit Page'>
              <Button sx={{ pb: 0.2, pt: 0.3 }} startIcon={<MdOpenInNew />} size='small' variant="contained">Visit</Button>
            </a>
          </div>
        </div>


      </div>
    </>
  )
}
export default Tdmsetting;