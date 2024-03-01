import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './membershiprequest.css'
import Membermodal from "./membermodal";

const Membershiprequest = () => {
   useEffect(() => {
      feteche();
   }, [])
   const tournacenter = useSelector((state) => state.tournacenter);
   const [memshiprequest, setmemshiprequest] = useState([]);
   const feteche = async () => {
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
   }
   const [inp,setinp]= useState(null);
   const [membermodal, setmembermodal] = useState(false);
   const actione = (pre) => {
      setmembermodal(true)
      setinp(pre)
   }
   return <>
      <div className="membershiprequest">
         <table>
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
                  const formattedDate = date.toLocaleDateString('en-US', options);
                  return <tr key={ind}>
                     <td>{ind + 1}</td>
                     <td>{val.user.name}</td>
                     <td>{val.plan_name}</td>
                     <td>{val.coupon}</td>
                     <td>{val.finalpricepaid}</td>
                     <td>{formattedDate}</td>
                     <td>{val.txn_no}</td>
                     <td>{val.status}</td>
                     <td><i className="fa fa-pencil" onClick={()=> actione(val)} aria-hidden="true"></i>
                        <i className="fa fa-trash" aria-hidden="true"></i></td>
                  </tr>
               })}
            </tbody>
         </table>
        {inp &&  <Membermodal setinp={setinp} inp={inp} membermodal={membermodal} setmembermodal={setmembermodal} />}
      </div>
   </>
}
export default Membershiprequest;