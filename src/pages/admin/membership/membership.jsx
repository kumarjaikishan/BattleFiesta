
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdRefresh } from "react-icons/io";
import LoadingButton from '@mui/lab/LoadingButton';
import { membership } from "../../../store/admin";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { useCustomStyles } from "../backups/AllDbModal";

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

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      width: '50px'
    },
    {
      name: "Name",
      cell: (row) => <span title={row.isActive ? `Valid till ${formatDate(row?.expire_date)}` : ''}>{row?.userid?.name}</span>

    },
    {
      name: "Plan",
      selector: (row) => row.planid.plan_name
    },
    {
      name: "Price",
      selector: (row) => row.planid.price,
      width: '100px'
    },
    {
      name: "Final",
      selector: (row) => row.finalpricepaid,
      width: '100px'
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row?.isActive
              ? "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700"
              : "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700"
          }
        >
          {row.isActive ? "Active" : "Expired"}
        </span>
      ),
      width: "100px"
    }

  ]


  return <>
    <div className="adminmembership p-1">
      <div className="inner">
        <div className="controler flex flex-col items-center gap-2 py-[5px] sm:flex-row sm:justify-between">
          <h2 className="text-center text-lg font-semibold sm:text-left">
            Active Memberships
          </h2>

          <LoadingButton
            loading={admin.loading}
            onClick={async () => {
              try {
                await dispatch(membership()).unwrap();
                toast.success('Refreshed!', { autoClose: 900 });
              } catch {
                toast.error('Failed to refresh!');
              }
            }}
            loadingPosition="end"
            endIcon={<IoMdRefresh />}
            variant="outlined"
            type="submit"
            size="small"
          >
            REFRESH
          </LoadingButton>
        </div>


        <DataTable
          columns={columns}
          data={admin?.membership}
          pagination
          highlightOnHover
          customStyles={useCustomStyles()}
        />

      </div>
    </div>
  </>
}
export default Membership;