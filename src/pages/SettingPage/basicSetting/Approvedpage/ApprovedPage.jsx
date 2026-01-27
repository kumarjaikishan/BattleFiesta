import Teamlists from '../teamlists';
import { TbMoodSad } from "react-icons/tb";

const ApprovedPage = ({ approvedPlayer, statuschange, showss, decline }) => {
  return (
    <>
      <div className="approvedList">
        {approvedPlayer.length > 0 ?
          <div className="box">
            <h2>Team List:</h2>
            <Teamlists teamarray={approvedPlayer} decline={decline} statuschange={statuschange} callfrom={"Approved"} showss={showss} />
          </div> :
          <div className="middle mx-2 rounded-2xl border border-dashed p-2 h-fit">
            <div className='  flex justify-center '> <TbMoodSad className='emoji' /> </div>
            <strong>Nothing To Show</strong>
            <p>The List is Empty. List will start to appear once You Approve Teams</p>
          </div>}
      </div>
    </>
  )
}
export default ApprovedPage;