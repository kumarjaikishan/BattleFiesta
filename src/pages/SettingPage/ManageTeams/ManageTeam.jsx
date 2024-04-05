import Teamlists from '../basicSetting/teamlists';
import Teamedit from './Teamedit';
import { useSelector, useDispatch } from 'react-redux';
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { alltourna } from '../../../store/api'
import { useParams } from "react-router-dom";
import { classicfetch } from '../../../store/classic';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const ManageTeam = ({ setting, showss }) => {
  const dispatch = useDispatch();
  const classic = useSelector((state) => state.classic);
  const { tid } = useParams();

  useEffect(() => {
  //  console.log(classic.classicplayers);
  }, [])


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

        const url = `${import.meta.env.VITE_API_ADDRESS}teamdelete`;
        const method = 'POST';
        const body = { teamid };

        const successAction = (data) => {
          // console.log(data);
          dispatch(alltourna());
          dispatch(classicfetch(tid));
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

  return (
    <>
      <div
        className="manageteams">
        <div className="box">
          <h2>All Team List:</h2>
          {!calledit && classic.classicplayers && <Teamlists teamarray={classic.classicplayers} deletee={deletee} callfrom={"manageteam"} edetee={edetee} showss={showss} />}
          {calledit && <Teamedit teamdetail={teamdetail} setcalledit={setcalledit} />}

          {classic.classicplayers.length < 1 && <div className="middle">
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