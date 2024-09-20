
import {  NavLink } from "react-router-dom";
import './adminnavbar.css'
import './Request/Request.css'

const Adminnavbar = () => {
    return <>
        <div className="Adminnavbar">
            <div className="adminnav">
                <NavLink className="navlink" end to='/admin' >
                    <div >
                        <i className="fa fa-tachometer" aria-hidden="true"></i>
                        <span>Dashboard</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/request' >
                    <div >
                        <i className="fa fa-credit-card" aria-hidden="true"></i>
                        <span>Requests</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/query' >
                    <div >
                        <i className="fa fa-address-book-o" aria-hidden="true"></i>
                        <span>Queries</span>
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
        </div>
    </>
}
export default Adminnavbar;