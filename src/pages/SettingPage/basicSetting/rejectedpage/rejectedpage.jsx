import Teamlists from '../teamlists';
import { TbMoodSad } from "react-icons/tb";

const RejectedPage = ({ rejectedplayer,statuschange ,showss,decline}) => {
  return (
    <>
      <div className="rejectedlist">
        {rejectedplayer.length > 0 ? <div className="box">
          <h2>Team List:</h2>
          <Teamlists teamarray={rejectedplayer} decline={decline} statuschange={statuschange} callfrom={"Rejected"} showss={showss} />
        </div> : <div className="middle">
          <div> <TbMoodSad className='emoji' /> </div>
          <h2>Nothing To Show</h2>
          <p>The List is Empty. List will start to appear once You Reject Teams</p>
        </div>}
      </div>
    </>
  )
}
export default RejectedPage;