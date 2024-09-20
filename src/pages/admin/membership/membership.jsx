import('./membership.css')
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RefreshIcon from '@mui/icons-material/Refresh';
import LoadingButton from '@mui/lab/LoadingButton';
import { membership } from "../../../store/admin";

const Membership = () => {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(admin.membership);
  }, [])

  return <>
    <div className="adminmembership">
      <div className="inner">
        <div className="controler">
          <h2 style={{ textAlign: 'center' }}>Active Memberships</h2>
          <LoadingButton
             loading={admin.loading}
            onClick={() => dispatch(membership())}
            loadingPosition="end"
            endIcon={<RefreshIcon />}
            variant="outlined"
            type="submit"
            size="small"
            className="refreshe"
          >
            REFRESH
          </LoadingButton>
        </div>
        <div className="header">
          <span>#</span>
          <span>Name</span>
          <span>Plan</span>
          <span>price</span>
          <span>Final</span>
          <span>Status</span>
        </div>
        <div className="body">
          {admin?.membership?.map((val, ind) => {
            return <div key={ind}>
              <span>{ind + 1}</span>
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