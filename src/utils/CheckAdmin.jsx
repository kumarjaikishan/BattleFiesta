import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CheckAdmin = () => {
  const log = useSelector((state) => state?.login);
  const admin = log?.islogin && log?.isadmin;

  if (!admin) {
    toast.warn('Access denied. Admin authorization is required.', {
      autoClose: 2700,
      toastId: "admin-auth"
    });
    return <Navigate to="/logout" replace />;
  }

  return <>
    <Outlet />
  </>

};

export default CheckAdmin;
