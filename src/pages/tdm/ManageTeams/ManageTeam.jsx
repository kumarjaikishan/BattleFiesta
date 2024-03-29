import Teamlists from '../basicSetting/teamlists';
import Teamedit from './Teamedit';
import { useSelector, useDispatch } from 'react-redux';
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { tdmfetch } from '../../../store/tdm';
import Button from '@mui/material/Button';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { useParams } from 'react-router-dom';

const ManageTeam = ({ setting, showss }) => {
  const dispatch = useDispatch();
  const { tid } = useParams();
  const tdmrtk = useSelector((state) => state.tdm);
  const [android, setandroid] = useState([]);
  const [ios, setios] = useState([]);
  useEffect(() => {
    let and = [];
    let io = [];
    tdmrtk?.tdmplayers?.map((val) => {
      if (val.os == "android") {
        and.push(val);
      }
      if (val.os == "ios") {
        io.push(val);
      }
    })
    setandroid(and);
    setios(io)
  }, [tdmrtk.tdmplayers])


  const deletee = async (playerid) => {
    // console.log(teamid);
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Tournament!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const id = toast.loading("Please wait...")

        const url = `${import.meta.env.VITE_API_ADDRESS}playerdelete`;
        const method = 'POST';
        const body = { playerid };

        const successAction = (data) => {
          dispatch(tdmfetch(tid))
          toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
        };

        // const loaderAction = (isLoading) => dispatch(setloader(isLoading));

        await apiWrapper(url, method, body, successAction);

      } else {
        // swal('Your data is safe!');
      }
    });
  }
  const [calledit, setcalledit] = useState(false);
  const [teamdetail, setteamdeatl] = useState("");

  const edetee = async (teamdata) => {
    setteamdeatl(teamdata);
    setcalledit(true);
    // console.log(teamdata);
  }
  const [allplayers, setallplayers] = useState(tdmrtk.tdmplayers)
  const [active, setactive] = useState(0)

  const filter = (type, ind) => {
    setactive(ind)
    if (type == 'all') {
      setallplayers(tdmrtk.tdmplayers)
    } 
    if (type == 'android') {
      setallplayers(android)
    } 
    if (type == 'ios') {
      setallplayers(ios)
    } 

  }

  return (
    <>
      <div
        className="manageteams">
        <div className="box">
          <div>
            <Button sx={{ m: 1 }} variant={active == 0 ? "contained" : "outlined"} onClick={() => filter('all', 0)}>All</Button>
            <Button sx={{ m: 1 }} variant={active == 1 ? "contained" : "outlined"} onClick={() => filter('android', 1)}>Android</Button>
            <Button sx={{ m: 1 }} variant={active == 2 ? "contained" : "outlined"} onClick={() => filter('ios', 2)}>Ios</Button>
          </div>
          <h2>Player List:</h2>
          {!calledit && tdmrtk.tdmplayers && <Teamlists teamarray={allplayers} deletee={deletee} callfrom={"manageteam"} edetee={edetee} showss={showss} />}
          {calledit && <Teamedit teamdetail={teamdetail} setcalledit={setcalledit} />}

          {tdmrtk.tdmplayers.length < 1 && <div className="middle">
            <div> <SentimentSatisfiedIcon className='emoji' /> </div>
            <h2>Nothing To Show</h2>
            <p>The List is Empty. Form Resposes will start to appear once teams starts Registering</p>
          </div>}
        </div>
      </div>
    </>
  )
}
export default ManageTeam;