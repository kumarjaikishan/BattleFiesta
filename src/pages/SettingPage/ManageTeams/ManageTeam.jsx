import Teamlists from '../basicSetting/teamlists';
import Teamedit from './Teamedit';
import { useSelector, useDispatch } from 'react-redux';
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { alltourna } from '../../../store/api'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const ManageTeam = ({ setting, showss }) => {
  const dispatch = useDispatch();
  const tournacenter = useSelector((state) => state.tournacenter);
  const [playerlist, setPlayerlist] = useState([]);
  const tid = setting._id;

  useEffect(() => {
    fetche();
  }, [])

  const fetche = async () => {
    const url = `${tournacenter.apiadress}/tournamentform`;
    const method = 'POST';
    const body = { tid };

    const successAction = (data) => {
      setPlayerlist(data.entry)
    };

    // const loaderAction = (isLoading) => dispatch(setloader(isLoading));

    await apiWrapper(url, method, body, successAction);
  }

  const deletee = async (teamid) => {
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

        const url = `${tournacenter.apiadress}/teamdelete`;
        const method = 'POST';
        const body = { teamid };

        const successAction = (data) => {
          // console.log(data);
          dispatch(alltourna());
          fetche();
          toast.update(id, { render: data.msg, type: "success", isLoading: false, autoClose: 1600 });
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

  return (
    <>
      <div className="manageteams">
        <div className="box">
          <h2>All Team List:</h2>
          {!calledit && playerlist && <Teamlists teamarray={playerlist} deletee={deletee} callfrom={"manageteam"} edetee={edetee} showss={showss} />}
          {calledit && <Teamedit teamdetail={teamdetail} setcalledit={setcalledit} />}

         {playerlist.length < 1 && <div className="middle">
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