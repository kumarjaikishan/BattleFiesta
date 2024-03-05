import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './membershiprequest.css'
import { toast } from 'react-toastify';
import Membermodal from "./membermodal";
import { motion, useInView, useAnimation } from 'framer-motion';

const Membershiprequest = () => {
   const tournacenter = useSelector((state) => state.tournacenter);
   const admin = useSelector((state) => state.admin);
   const [memshiprequest, setmemshiprequest] = useState(admin.membershipentry);
   useEffect(() => {
      console.log(admin);
      // feteche();
   }, [])
   const feteche = async () => {
      try {
         const token = localStorage.getItem("token");
         const responsee = await fetch(`${tournacenter.apiadress}/memshipentry`, {
            method: "GET",
            headers: {
               "Authorization": `Bearer ${token}`
            },
         });
         const data = await responsee.json();
         if (responsee.ok) {
            console.log(data);
            setmemshiprequest(data.data)
         }
      } catch (error) {
         console.log(error);
      }
   }
   const [inp, setinp] = useState(null);
   const [membermodal, setmembermodal] = useState(false);
   const actione = (pre) => {
      setmembermodal(true)
      setinp(pre)
   }
   const Deletee = async (ide) => {
      try {
         const token = localStorage.getItem("token");
         const responsee = await fetch(`${tournacenter.apiadress}/delmemberentry`, {
            method: "POST",
            headers: {
               "Authorization": `Bearer ${token}`,
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ ide })
         });
         const data = await responsee.json();
         if (responsee.ok) {
            feteche();
            toast.success(data.msg, { autoClose: 1300 });
            console.log(data);
            setmemshiprequest(data.data)
         }
      } catch (error) {
         console.log(error);
      }
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
      <motion.div

         className="membershiprequest">
         {/* <table>
            <thead>
               <tr>
                  <th>S.NO</th>
                  <th>Name</th>
                  <th>Plan</th>
                  <th>coupon</th>
                  <th>Finalprice</th>
                  <th>Date</th>
                  <th>Txn. NO</th>
                  <th>Status</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {memshiprequest && memshiprequest.map((val, ind) => {
                  const options = { day: '2-digit', month: 'short', year: 'numeric' };
                  const date = new Date(val.createdAt);
                  const formattedDate = date.toLocaleDateString('en-GB', options);
                  return <tr key={ind}>
                     <td>{ind + 1}</td>
                     <td>{val.user.name}</td>
                     <td>{val.plan_name}</td>
                     <td>{val.coupon}</td>
                     <td>{val.finalpricepaid}</td>
                     <td>{formattedDate}</td>
                     <td title={val.status == 'success' && val.membershipId}>{val.txn_no}</td>
                     <td className={`status ${val.status}`} title={val.status == 'rejected' && val.remarks}>{val.status}</td>
                     <td><i className="fa fa-pencil" onClick={() => actione(val)} aria-hidden="true"></i>
                        <i className="fa fa-trash" onClick={() => Deletee(val._id)} aria-hidden="true"></i></td>
                  </tr>
               })}
            </tbody>
         </table> */}
         <div><h2 style={{ textAlign: 'center' }}>Membership Appliciations</h2></div>
         <div className="header">
            <span>S.NO</span>
            <span>Name</span>
            <span>Plan</span>
            <span>coupon</span>
            <span>Finalprice</span>
            <span>Date</span>
            <span>Txn. NO</span>
            <span>Status</span>
            <span>Actions</span>
         </div>
         <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            layout
            className="body">
            {memshiprequest && memshiprequest.map((val, ind) => {
               const options = { day: '2-digit', month: 'short', year: 'numeric' };
               const date = new Date(val.createdAt);
               const formattedDate = date.toLocaleDateString('en-GB', options);
               return <motion.div variants={item} layout key={ind}>
                  <span>{ind + 1}</span>
                  <span>{val.user.name}</span>
                  <span>{val.plan_id.plan_name}</span>
                  <span>{val.coupon ? val.coupon : "-"}</span>
                  <span>{val.finalpricepaid}</span>
                  <span>{formattedDate}</span>
                  <span title={val.status == 'success' ? val.membershipId : ""}>{val.txn_no}</span>
                  <span className={`status ${val.status}`} title={val.status == 'rejected' ? val.remarks : ''}>{val.status}</span>
                  <span><i className="fa fa-pencil" onClick={() => actione(val)} aria-hidden="true"></i>
                     <i className="fa fa-trash" onClick={() => Deletee(val._id)} aria-hidden="true"></i></span>
               </motion.div>
            })}
         </motion.div>
         {inp && <Membermodal feteche={feteche} setinp={setinp} inp={inp} membermodal={membermodal} setmembermodal={setmembermodal} />}
      </motion.div>
   </>
}
export default Membershiprequest;