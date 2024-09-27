
import { NavLink } from "react-router-dom";
import './adminnavbar.css'
import './Request/Request.css'
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Adminnavbar = () => {
    const admin = useSelector((state) => state.admin);
    useEffect(() => {
        // console.log(admin.contactusform);
    }, [])
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
                    <Badge
                        sx={{
                            '& .MuiBadge-badge': {
                                fontSize: '0.7rem',  // Adjust the font size
                                height: '16px',      // Adjust the badge height
                                minWidth: '16px',    // Adjust the badge width
                                padding: '0 4px',   // Adjust padding inside the badge
                                top: '7px'
                            }
                        }}
                        badgeContent={admin.membershipentry.filter(entry => entry.status === 'pending').length} color="warning">
                        <div >
                            <i className="fa fa-credit-card" aria-hidden="true"></i>
                            <span>Requests</span>
                        </div>
                    </Badge>
                </NavLink>
                <NavLink className="navlink" to='/admin/query' >
                    <Badge
                        sx={{
                            '& .MuiBadge-badge': {
                                fontSize: '0.7rem',  // Adjust the font size
                                height: '16px',      // Adjust the badge height
                                minWidth: '16px',    // Adjust the badge width
                                padding: '0 4px',   // Adjust padding inside the badge
                                top: '7px'
                            }
                        }} badgeContent={admin.contactusform.filter(entry => entry.resolve === false).length} color="warning">
                        <div >
                            <i className="fa fa-address-book-o" aria-hidden="true"></i>
                            <span>Queries</span>
                        </div>
                    </Badge>
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