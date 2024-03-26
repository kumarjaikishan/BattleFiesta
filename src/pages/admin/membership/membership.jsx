import('./membership.css')
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Membership = () => {
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    console.log(admin.membership);
  }, [])

  return <>
    <div className="adminmembership">
      <div className="inner">
        <div className="header">
          <span>S.no</span>
          <span>Name</span>
          <span>Plan</span>
          <span>price</span>
          <span>Final</span>
          <span>Status</span>
        </div>
        <div className="body">
        {admin?.membership?.map((val,ind)=>{
          return <div key={ind}>
          <span>{ind+1}</span>
          <span>{val.userid?.name}</span>
          <span>{val.planid.plan_name}</span>
          <span>{val.planid.price}</span>
            <span>{val.finalpricepaid}</span>
            <span className='status active'>Active</span>
          </div>
        })}
          
        </div>
      </div>
    </div>
  </>
}
export default Membership;