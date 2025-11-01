import('./membership.css')
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdRefresh } from "react-icons/io";
import LoadingButton from '@mui/lab/LoadingButton';
import { membership } from "../../../store/admin";
import { toast } from "react-toastify";

const Membership = () => {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(admin.membership);
  }, [])
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ').replace(',', ',');
  }


  return <>
    <div className="adminmembership">
      <div className="inner">
        <div className="controler">
          <h2 style={{ textAlign: 'center' }}>Active Memberships</h2>
          <LoadingButton
            loading={admin.loading}
            // onClick={() => dispatch(membership())}
            onClick={async () => {
              try {
                await dispatch(membership()).unwrap();
                toast.success('Refreshed!', { autoClose: 900 });
              } catch (error) {
                toast.error('Failed to refresh!');
              }
            }}
            loadingPosition="end"
            endIcon={<IoMdRefresh />}
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
              <span title={val.isActive ? `Valid till ${formatDate(val.expire_date)}`:''}>{val.userid?.name}</span>
              <span>{val.planid.plan_name}</span>
              <span>{val.planid.price}</span>
              <span>{val.finalpricepaid}</span>
              <span className={val.isActive ? 'status active' : 'status expired'}>{val.isActive ? "Active" : "Expired"}</span>
            </div>
          })}

        </div>
      </div>
    </div>
  </>
}
export default Membership;