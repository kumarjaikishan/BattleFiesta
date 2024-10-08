import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import Membermodal from "./requestmodal";
import LoadingButton from '@mui/lab/LoadingButton';
import { IoMdRefresh } from "react-icons/io";
import { motion } from 'framer-motion';
import { memshipentry } from "../../../store/admin";
import swal from 'sweetalert';
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

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
   return <>
      <motion.div className="membershiprequest">
         <div className="controler">
            <h2 style={{ textAlign: 'center' }}>Membership Requests</h2>
            <LoadingButton
               loading={admin.loading}
               onClick={() => dispatch(memshipentry())}
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
            <span>Finalprice</span>
            <span>Date</span>
            <span>Txn. NO</span>
            <span>Status</span>
            <span>Actions</span>
         </div>
         {admin?.membershipentry.length < 1 &&
            <div className="body">
               No Membership Request Found
            </div>}
         <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            layout
            className="body">
            {admin?.membershipentry?.map((val, ind) => {
               const options = { day: '2-digit', month: 'short', year: 'numeric' };
               const date = new Date(val.createdAt);
               const formattedDate = date.toLocaleDateString('en-GB', options);
               return <motion.div variants={item} layout key={ind}>
                  <span>{ind + 1}</span>
                  <span>{val.user?.name}</span>
                  <span>{val.plan_id.plan_name}</span>
                  <span>{val.finalpricepaid}</span>
                  <span>{formattedDate}</span>
                  <span title={val.status == 'success' ? val.membershipId : ""}>{val.txn_no}</span>
                  <span className={`status ${val.status}`} title={val.status == 'rejected' ? val.remarks : ''}>{val.status}</span>
                  <span>
                     <HiPencilSquare className='editicon ico' title="Edit" onClick={() => actione(val)} />
                     <RiDeleteBin6Line className='deleteicon ico' title="Delete" onClick={() => Deletee(val._id)} />
                  </span>
               </motion.div>
            })}
         </motion.div>
         {inp && <Membermodal setinp={setinp} inp={inp} membermodal={membermodal} setmembermodal={setmembermodal} />}
      </motion.div>
   </>
}
export default Request;