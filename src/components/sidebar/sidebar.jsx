import React from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import GrassIcon from '@mui/icons-material/Grass';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { header } from '../../store/login';
import { useSelector, useDispatch } from 'react-redux';

const Sidebar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const log = useSelector((state) => state.login);
    const useralldetail = useSelector((state) => state.tournacenter);

    const [adminSubMenuVisible, setAdminSubMenuVisible] = React.useState(false);

    const toggleAdminSubMenu = () => {
        setAdminSubMenuVisible(!adminSubMenuVisible);
    };

    const linke = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            logo: 'fa fa-tachometer',
        },
        {
            name: 'Setting',
            link: '/setting',
            logo: 'fa fa-cogs',
        },
        // {
        //     name: 'Find Matches',
        //     link: '/tournaments',
        //     logo: 'fa fa-cloud',
        // }
    ];

    const fr = () => {
        swal({
            title: 'Are you sure to Logout?',
            text: '',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(header('Login'));
                toast.success('Logout successful', { autoClose: 1300 });
                navigate('/logout');
            }
        });
    };

    return (
        <>
            <div className={log.narrow ? 'sidebar narrow' : 'sidebar'}>
                <div className="clogo">
                    <NavLink
                        className={(navData) => (navData.isActive ? 'active' : '')}
                        style={{ textDecoration: 'none' }}
                        to="/"
                    >
                        <span className="li">
                            <span className="logo">
                                <GrassIcon className="company" />
                            </span>
                            <span className="name">BattleFiesta</span>
                        </span>
                    </NavLink>
                </div>
                <div className="link">
                    {log.islogin
                        ? linke.map((val, ind) => {
                            return (
                                <NavLink
                                    key={ind}
                                    className={(navData) => (navData.isActive ? 'active' : '')}
                                    style={{ textDecoration: 'none' }}
                                    to={val.link}
                                >
                                    <span className="li" onClick={() => dispatch(header(val.name))}>
                                        <span className="logo">
                                            <i title={val.name} className={val.logo} aria-hidden="true"></i>
                                        </span>
                                        <span className="name">{val.name}</span>
                                    </span>
                                </NavLink>
                            );
                        })
                        : null}
                    {log.islogin ? useralldetail.user.isadmin ? (
                        <div className="admin-panel">
                            <span className={`li ${adminSubMenuVisible ? 'active' : ''}`} onClick={toggleAdminSubMenu} >
                                <span className="logo">
                                    <i title={'Admin'} className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                                <span className="name">Admin</span>
                                {!log.narrow && <span><i className={adminSubMenuVisible ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></span>}
                            </span>
                            {adminSubMenuVisible && (
                                <div className="sub-menu">
                                    <NavLink
                                        className={(navData) => (navData.isActive ? 'active' : '')}
                                        style={{ textDecoration: 'none' }}
                                        to="/admin/dashboard"
                                    >
                                        <span className="li" onClick={() => dispatch(header('Admin/ Dashboard'))}>
                                            <span className="logo">
                                                <i title={'Users'} className="fa fa-tachometer" aria-hidden="true"></i>
                                            </span>
                                            <span className="name">Dashboard</span>
                                        </span>
                                    </NavLink>
                                    <NavLink
                                        className={(navData) => (navData.isActive ? 'active' : '')}
                                        style={{ textDecoration: 'none' }}
                                        to="/admin/users"
                                    >
                                        <span className="li" onClick={() => dispatch(header('Admin/ Users'))}>
                                            <span className="logo">
                                                <i title={'Users'} className="fa fa-user-o" aria-hidden="true"></i>
                                            </span>
                                            <span className="name">Users</span>
                                        </span>
                                    </NavLink>
                                    <NavLink
                                        className={(navData) => (navData.isActive ? 'active' : '')}
                                        style={{ textDecoration: 'none' }}
                                        to="/admin/expense"
                                    >
                                        <span className="li" onClick={() => dispatch(header('Admin/ Expenses'))}>
                                            <span className="logo">
                                                <i title={'Expenses'} className="fa fa-university" aria-hidden="true"></i>
                                            </span>
                                            <span className="name">Expenses</span>
                                        </span>
                                    </NavLink>

                                </div>
                            )}
                        </div>
                    ) : null : null}
                    <NavLink
                        className={(navData) => (navData.isActive ? 'active' : '')}
                        style={{ textDecoration: 'none' }}
                        to="/tournaments"
                    >
                        <span className="li" onClick={() => dispatch(header('Find Matches'))}>
                            <span className="logo">
                                <i title="Find Tournaments" className="fa fa-cloud" aria-hidden="true"></i>
                            </span>
                            <span className="name">Find Matches</span>
                        </span>
                    </NavLink>
                    {log.islogin ?
                        <span className="li" onClick={fr}>
                            <span className="logo">
                                <i title="Sign Out" className="fa fa-sign-out" aria-hidden="true"></i>
                            </span>
                            <span className="name">Logout</span>
                        </span>
                        :

                        <NavLink
                            className={(navData) => (navData.isActive ? 'active' : '')}
                            style={{ textDecoration: 'none' }}
                            to="/login"
                        >
                            {' '}
                            <span className="li" onClick={() => dispatch(header('Login'))}>
                                <span className="logo">
                                    <i title="Sign In" className="fa fa-user" aria-hidden="true"></i>
                                </span>
                                <span className="name">Login</span>
                            </span>
                        </NavLink>
                    }
                </div>
            </div>
        </>
    );
};

export default Sidebar;
