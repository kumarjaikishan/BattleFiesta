import './pending.css'
import { useEffect } from 'react';
import Teamlists from '../teamlists';
import { TbMoodSad } from "react-icons/tb";

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
        </div> : 
      
         <div className="middle mx-2 rounded-2xl border border-dashed p-2 h-fit">
            <div className='  flex justify-center '> <TbMoodSad className='emoji' /> </div>
            <strong>Nothing To Show</strong>
           <p>The List is Empty. Form Resposes will start to appear once teams starts Registering</p>
          </div>
        }
      
      </div>
    </>
  )
}
export default PendingPage