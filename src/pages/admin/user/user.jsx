import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './user.css'

const User = ()=>{
    const admin = useSelector((state) => state.admin);

    useEffect(() => {
      console.log(admin);
    }, [])
    
 return <>
    <div className="adminusers">
        <div className="inner">
            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>joining date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {admin.users && admin.users.map((val,ind)=>{
                    return <tr key={ind}>
                    <td>{ind+1}</td>
                        <td>{val.name}</td>
                        <td>{val.phone}</td>
                        <td>{val.email}</td>
                        <td>{val.createdAt}</td>
                        {/* <td>{val.tourn_created}</td> */}
                        <td><i className="fa fa-pencil"  aria-hidden="true"></i>
                                <i className="fa fa-trash"  aria-hidden="true"></i></td>
                    </tr>
                })}
                    
                </tbody>
            </table>
        </div>
    </div>
 </>
}
export default User;