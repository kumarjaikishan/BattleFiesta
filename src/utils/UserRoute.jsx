import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserRoute = () => {
  const isLogin = useSelector(state => state.login.islogin);

  if (!isLogin) {
    toast.warn("You are not Logged In", {
      autoClose: 2700,
      toastId: "auth-warning"
    });

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};


export default UserRoute;
