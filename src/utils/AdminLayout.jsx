import { Outlet } from 'react-router-dom';
import Adminnavbar from '../pages/admin/adminnavbar';

const AdminLayout = ({children}) => {

  return <>
    <Adminnavbar />
    <Outlet />
    {/* {children} */}
  </>

};

export default AdminLayout;
