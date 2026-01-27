import Teamlists from '../teamlists';
import { TbMoodSad } from "react-icons/tb";

const RejectedPage = ({ rejectedplayer, statuschange, showss, decline }) => {
  return (
    <>
      <div className="rejectedlist">
        {rejectedplayer.length > 0 ? <div className="box">
          <h2>Team List:</h2>
          <Teamlists teamarray={rejectedplayer} decline={decline} statuschange={statuschange} callfrom={"Rejected"} showss={showss} />
        </div> :
          <div className="middle mx-2 rounded-2xl border border-dashed p-2 h-fit">
            <div className='  flex justify-center '> <TbMoodSad className='emoji' /> </div>
            <strong>Nothing To Show</strong>
            <p>The List is Empty. List will start to appear once You Reject Teams</p>
          </div>
        }
      </div>
    </>
  )
}
export default RejectedPage;