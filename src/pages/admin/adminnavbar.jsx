import React from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Outlet, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import './adminnavbar.css';

const Adminnavbar = () => {
  const user = useSelector((state) => state.login);

  if (!user.isadmin) {
    toast.warn('Admin Authorization is Required', { autoClose: 1700 });
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="Adminnavbar">
        <div className="adminnav">
          <NavLink className="navlink" end to='/admin'  activeClassName="active">
            <div>
              <i className="fa fa-tachometer" aria-hidden="true"></i>
              <span>Dashboard</span>
            </div>
          </NavLink>
          <NavLink className="navlink" to='/admin/membershiprequest' activeClassName="active">
            <div>
              <i className="fa fa-credit-card" aria-hidden="true"></i>
              <span>Membership apply</span>
            </div>
          </NavLink>
          <NavLink className="navlink" to='/admin/query' activeClassName="active">
            <div>
              <i className="fa fa-address-book-o" aria-hidden="true"></i>
              <span>Queries</span>
            </div>
          </NavLink>
          <NavLink className="navlink" to='/admin/voucher' activeClassName="active">
            <div>
              <i className="fa fa-credit-card" aria-hidden="true"></i>
              <span>Voucher</span>
            </div>
          </NavLink>
          <NavLink className="navlink" to='/admin/membership' activeClassName="active">
            <div>
              <i className="fa fa-credit-card" aria-hidden="true"></i>
              <span>Memberships</span>
            </div>
          </NavLink>
          <NavLink className="navlink" to='/admin/users' activeClassName="active">
            <div>
              <i className="fa fa-credit-card" aria-hidden="true"></i>
              <span>Users</span>
            </div>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Adminnavbar;
