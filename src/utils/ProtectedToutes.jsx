// ProtectedRoutes.js
import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Adminnavbar from '../pages/admin/adminnavbar';

const ProtectedRoutes = () => {
  const log = useSelector((state) => state.login);
  const admin = log.islogin && log.isadmin;

  useEffect(() => {
    if (!admin) {
      toast.warn('Access denied. Admin authorization is required.', { autoClose: 2700 });
    }
  }, [admin]);

  return admin ? (
    <div>
      <Adminnavbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
