import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './membershiprequest.css'

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
               </tr>
            </thead>
            <tbody>
               {memshiprequest && memshiprequest.map((val, ind) => {
                  const options = { day: '2-digit', month: 'short', year: 'numeric' };
                  const formattedDate = val.createdAt.toLocaleDateString('en-US', options);
                  return <tr key={ind}>
                     <td>{ind+1}</td>
                     <td>{val.userid}</td>
                     <td>{val.plan_name}</td>
                     <td>{val.coupon}</td>
                     <td>{val.finalpricepaid}</td>
                     <td>{formattedDate}</td>
                     <td>{val.txn_no}</td>
                  </tr>
               })}

            </tbody>
         </table>
      </div>
   </>
}
export default Membershiprequest;