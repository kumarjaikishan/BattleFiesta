
import { NavLink } from "react-router-dom";
import './adminnavbar.css'
import './Request/Request.css'
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { BiLogoJquery } from "react-icons/bi";

const Adminnavbar = () => {
    const admin = useSelector((state) => state.admin);
    useEffect(() => {
        // console.log(admin.contactusform);
    }, [])
    return <>
        <div className="Adminnavbar">
            <Helmet>
                <title>Admin Panel || BattleFiesta</title>
                <meta name="description"
                    content="BattleFiesta Admin Panel - Manage tournaments, users, and platform settings with ease. Access exclusive tools for seamless tournament management." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="adminnav">
                <NavLink className="navlink" end to='/admin' >
                    <div >
                        <FaTachometerAlt />
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
                            <FaRegCreditCard />
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
                            <BiLogoJquery />
                            <span>Queries</span>
                        </div>
                    </Badge>
                </NavLink>
                <NavLink className="navlink" to='/admin/voucher' >
                    <div >
                        <FaRegCreditCard />
                        <span>Voucher</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/membership' >
                    <div >
                        <FaRegCreditCard />
                        <span>Memberships</span>
                    </div>
                </NavLink>
                <NavLink className="navlink" to='/admin/users' >
                    <div >
                        <FaRegCreditCard />
                        <span>Users</span>
                    </div>
                </NavLink>
            </div>
        </div>
    </>
}
export default Adminnavbar;