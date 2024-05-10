import Teamlists from '../basicSetting/teamlists';
import Teamedit from './Teamedit';
import { useSelector, useDispatch } from 'react-redux';
import apiWrapper from "../../../store/apiWrapper";
import { toast } from "react-toastify";
import Badge from '@mui/material/Badge';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { tdmfetch } from '../../../store/tdm';
import Button from '@mui/material/Button';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { useParams } from 'react-router-dom';

const ManageTeam = ({ showss }) => {
  const dispatch = useDispatch();
  const { tid } = useParams();
  const tdmrtk = useSelector((state) => state.tdm);
  const [category, setcategory] = useState('all');
  const [categoryenteries, setcategoryenteries] = useState();

  

  useEffect(() => {
    let categorizedData = {};
    tdmrtk?.tdmplayers?.map((obj) => {
        const category = obj.category;
        if (!categorizedData[category]) {
            categorizedData[category] = [];
        }
        categorizedData[category].push(obj);
    })
    setcategoryenteries(categorizedData)
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
  
  const handlecategory = (e) => {
    setcategory(e.target.value);
    if (e.target.value == "all") {
      setallplayers(tdmrtk.tdmplayers)
    } else {
      categoryenteries.hasOwnProperty(e.target.value) ? setallplayers(categoryenteries[e.target.value]) : setallplayers([]);
    }
  }

  return (
    <>
      <div
        className="manageteams">
        <div className="box">
          <div style={{ margin: '5px 0px', textAlign:'center' }}>
            <FormControl className="cominp" size="small" sx={{ mt: 1.6, width: '200px' }}>
              <InputLabel id="demo-simple-select-label">Choose Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tdmrtk?.tdmdetail?.slotCategory ? category : ""}
                required
                name="os"
                label="Choose Category"
                onChange={handlecategory}
              >
                <MenuItem value={'all'}>All</MenuItem>
                {
                  tdmrtk?.tdmdetail?.slotCategory?.map((val, ind) => {
                    return <MenuItem sx={{ textTransform: "capitalize" }} key={ind} value={ind}>{val.category}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
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