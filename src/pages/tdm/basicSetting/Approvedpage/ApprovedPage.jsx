import Teamlists from '../teamlists';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const ApprovedPage = ({ approvedPlayer, statuschange, showss, decline }) => {
  return (
    <>
      <div className="approvedList">
        {approvedPlayer.length > 0 ?
          <div className="box">
            <h2>Team List:</h2>
            <Teamlists teamarray={approvedPlayer} decline={decline} statuschange={statuschange} callfrom={"Approved"} showss={showss} />
          </div> :
          <div className="middle">
            <div> <SentimentSatisfiedIcon className='emoji' /> </div>
            <h2>Nothing To Show</h2>
            <p>The List is Empty. List will start to appear once You Approve Teams</p>
          </div>}
      </div>
    </>
  )
}
export default ApprovedPage;