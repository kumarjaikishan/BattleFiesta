
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Outlet, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import './adminnavbar.css'

const Adminnavbar = () => {
    const user = useSelector((state) => state.login);
    if(!user.isadmin){
        toast.warn('Admin Authorization is Required', { autoClose: 1700 })
        return <Navigate to="/" />
    }
  
    useEffect(() => {
        // fetche();
        // if(!user.isadmin){
        //     <Navigate to="/" replace={true} />
        //     toast.warn('Admin Authorization is Required', { autoClose: 1700 })
        //     // return navigate('/')
        // }
    }, [])
    // const fetche = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}isadmin`, {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         const data = await responsee.json();
    //         console.log(data);
    //         if (responsee.status == 403) {
    //             toast.warn(data.message, { autoClose: 1700 })
    //             return navigate('/')
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return <>
        <div className="Adminnavbar">
            <div className="adminnav">
                <NavLink className="navlink" to='/admin' >
                    <div >
                        <i className="fa fa-tachometer" aria-hidden="true"></i>
                        <span>Dashboard</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/membershiprequest' >
                    <div >
                        <i className="fa fa-credit-card" aria-hidden="true"></i>
                        <span>Membership apply</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/contact' >
                    <div >
                        <i className="fa fa-address-book-o" aria-hidden="true"></i>
                        <span>Contact Form</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/voucher' >
                    <div >
                        <i className="fa fa-credit-card" aria-hidden="true"></i>
                        <span>Voucher</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/membership' >
                    <div >
                        <i className="fa fa-credit-card" aria-hidden="true"></i>
                        <span>Memberships</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/users' >
                    <div >
                        <i className="fa fa-credit-card" aria-hidden="true"></i>
                        <span>Users</span>
                    </div>
                </NavLink>
            </div>
            <Outlet/>
        </div>
    </>
}
export default Adminnavbar;