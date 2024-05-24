import { Outlet, Navigate } from 'react-router-dom';
import Adminnavbar from '../pages/admin/adminnavbar';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
    const log = useSelector((state) => state.login);
    const admin = log.islogin && log.isadmin;

    return admin ? <div> <Adminnavbar /> <Outlet /> </div> : <Navigate to='/login' />
}

export default ProtectedRoutes;