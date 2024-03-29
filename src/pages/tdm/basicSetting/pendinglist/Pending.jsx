import './pending.css'
import { useEffect, useState } from 'react';
import Teamlists from '../teamlists';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const PendingPage = ({decline, pendingplayer, statuschange, showss }) => {
  useEffect(() => {
    // console.log(pendingplayer);
  }, [])

  return (
    <>
      <div className="pendingList">
        {pendingplayer.length > 0 ? <div className="box">
          <h2>Team List:</h2>
          <Teamlists decline={decline} teamarray={pendingplayer} showss={showss} statuschange={statuschange} callfrom={"pending"} />
        </div> : <div className="middle">
          <div> <SentimentSatisfiedIcon className='emoji' /> </div>
          <h2>Nothing To Show</h2>
          <p>The List is Empty. Form Resposes will start to appear once Players starts Registering</p>
        </div>}
      
      </div>
    </>
  )
}
export default PendingPage