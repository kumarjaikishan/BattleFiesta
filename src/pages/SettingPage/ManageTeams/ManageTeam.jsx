import Teamlists from '../basicSetting/teamlists';
import Teamedit from './Teamedit';
import { useSelector, useDispatch } from 'react-redux';
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { alltourna } from '../../../store/api'
import { useParams } from "react-router-dom";
import { classicfetch } from '../../../store/classic';
import { TbMoodSad } from "react-icons/tb";

const ManageTeam = ({ setting, showss }) => {
  const dispatch = useDispatch();
  const classic = useSelector((state) => state.classic);
  const { tid } = useParams();

  useEffect(() => {
    //  console.log("clasic teams:",classic.classicplayers);
  }, [])


  const deletee = async (teamid) => {
    // console.log(teamid);
    swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const id = toast.loading("Please wait...");
        const url = `${import.meta.env.VITE_API_ADDRESS}teamdelete`;
        const method = 'POST';
        const body = { teamid };

        try {
          const token = localStorage.getItem("token");
          const options = {
            method,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : null,
          };

          const response = await fetch(url, options);
          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(responseData.message || 'Something went wrong');
          }

          successAction(responseData);
          toast.update(id, { render: responseData.message, type: "success", isLoading: false, autoClose: 1600 });
          return responseData;
        } catch (error) {
          console.error(" Error:", error);
          toast.update(id, { render: error.message, type: "warning", isLoading: false, autoClose: 1600 });
          throw error;
        }
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
            <div className=' flex justify-center'> <TbMoodSad className='emoji' /> </div>
            <strong>Nothing To Show</strong>
            <p>The List is Empty. Form Resposes will start to appear once teams starts Registering</p>
          </div>}
        </div>
      </div>
    </>
  )
}
export default ManageTeam;