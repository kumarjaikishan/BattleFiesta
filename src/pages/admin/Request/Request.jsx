import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import Membermodal from "./requestmodal";
import {  Button} from "@mui/material";
import { IoMdRefresh } from "react-icons/io";
import { motion } from 'framer-motion';
import { memshipentry } from "../../../store/admin";
import swal from 'sweetalert';
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCustomStyles } from "../backups/AllDbModal";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";

const Request = () => {
   const admin = useSelector((state) => state.admin);
   useEffect(() => {
      // console.log(admin.membershipentry);
   }, [])
   const dispatch = useDispatch();
   const [inp, setinp] = useState(null);
   const [membermodal, setmembermodal] = useState(false);
   const actione = (pre) => {
      setmembermodal(true)
      setinp(pre)
   }

   const Deletee = async (ide) => {
      swal({
         title: 'Are you sure?',
         text: 'Once deleted, you will not be able to recover this Tournament!',
         icon: 'warning',
         buttons: true,
         dangerMode: true,
      }).then(async (willDelete) => {
         if (willDelete) {
            try {
               const id = toast.loading('please wait...')
               const token = localStorage.getItem("token");
               const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}delmemberentry`, {
                  method: "POST",
                  headers: {
                     "Authorization": `Bearer ${token}`,
                     "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ ide })
               });
               const data = await responsee.json();
               if (responsee.ok) {
                  dispatch(memshipentry())
                  toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 1600 });
                  // console.log(data);
               }
            } catch (error) {
               console.log(error);
            }
         } else {

         }
      });

   }
   const container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
         opacity: 1,
         scale: 1,
         transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
         }
      }
   };

   const item = {
      hidden: { x: -80, y: 80, opacity: 0, scale: 0 },
      visible: { y: 0, x: 0, scale: 1, opacity: 1 }
   };

   const columns = [
      {
         name: "#",
         selector: (row, index) => index + 1,
         width: '50px'
      },
      {
         name: "Name",
         cell: (row) => row.user?.name,

      },
      {
         name: "Plan",
         selector: (row) => row.plan_id.plan_name,
         width: '80px'
      },
      {
         name: "Final Price",
         selector: (row) => row.finalpricepaid,
         width: '100px'
      },
      {
         name: "Date",
         selector: (row) => dayjs(row.createdAt).format('DD MMM, YYYY'),
         width: '100px'
      },
      {
         name: "Txn. NO",
         selector: (row) => row.txn_no,
         width: '120px'
      },
      {
         name: "Status",
         selector: (row) => <span className={`status ${row.status}`} title={row.status == 'rejected' ? row.remarks : ''}>{row.status}</span>,
         width: '120px'
      },
      {
         name: "Action",
         selector: (row) =>
            <div className="flex gap-2 lg:gap-1">
               <HiPencilSquare className='editicon ico' title="Edit" onClick={() => actione(row)} />
               <RiDeleteBin6Line className='deleteicon ico' title="Delete" onClick={() => Deletee(row._id)} />
            </div>,
         width: '80px'
      },
   ]

   return <>
      <motion.div className="membershiprequest p-1">
         <div className="controler flex flex-col items-center gap-2 py-[5px] sm:flex-row sm:justify-between">
            <h2 className="text-center text-lg font-semibold sm:text-left">
               Membership Requests
            </h2>
            <Button
               loading={admin.loading}
               onClick={() => dispatch(memshipentry())}
               loadingPosition="end"
               endIcon={<IoMdRefresh />}
               variant="outlined"
               type="submit"
               size="small"
            >
               REFRESH
            </Button>
         </div>
         
         <DataTable
            columns={columns}
            data={admin?.membershipentry}
            pagination
            highlightOnHover
            customStyles={useCustomStyles()}
         />


         {inp && <Membermodal setinp={setinp} inp={inp} membermodal={membermodal} setmembermodal={setmembermodal} />}
      </motion.div>
   </>
}
export default Request;