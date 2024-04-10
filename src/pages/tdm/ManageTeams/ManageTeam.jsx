import Teamlists from '../basicSetting/teamlists';
import Teamedit from './Teamedit';
import { useSelector, useDispatch } from 'react-redux';
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import Badge from '@mui/material/Badge';
import { useEffect, useState } from 'react';
import { tdmfetch } from '../../../store/tdm';
import Button from '@mui/material/Button';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { useParams } from 'react-router-dom';

const ManageTeam = ({ showss }) => {
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
    filter(0);
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

  const filter = (ind) => {
    setactive(ind)
    if (ind == 0) {
      setallplayers(tdmrtk.tdmplayers)
    }
    if (ind == 1) {
      setallplayers(android)
    }
    if (ind == 2) {
      setallplayers(ios)
    }
  }

  return (
    <>
      <div
        className="manageteams">
        <div className="box">
          <div>
            <Badge sx={{ m: 2 }} min={1} badgeContent={tdmrtk.tdmplayers.length} color="success">
              <Button onClick={() => filter(0)} variant={active == 0 ? "contained" : 'outlined'} color="primary">All</Button>
            </Badge>
            <Badge sx={{ m: 2 }} min={1} badgeContent={android.length} color="success">
              <Button onClick={() => filter(1)} variant={active == 1 ? "contained" : 'outlined'} color="primary">Android</Button>
            </Badge>
            <Badge sx={{ m: 2 }} min={1} badgeContent={ios.length} color="success">
              <Button onClick={() => filter(2)} variant={active == 2 ? "contained" : 'outlined'} color="primary">Ios</Button>
            </Badge>
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