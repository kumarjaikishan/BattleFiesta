import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './user.css'
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Users } from "../../../store/admin";

const User = () => {
    const admin = useSelector((state) => state.admin);
    const userprofile = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(admin);
    }, [])
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    return <>
        <div className="adminusers">
            <div className="controler">
                <h2 style={{ textAlign: 'center' }}>Membership Appliciations</h2>
                <LoadingButton
                    loading={userprofile.loading}
                    onClick={() => dispatch(Users())}
                    loadingPosition="end"
                    endIcon={<RefreshIcon />}
                    variant="outlined"
                    type="submit"
                    size="small"
                    className="refreshe"
                >
                    REFRESH
                </LoadingButton>
            </div>
            <div className="header">
                <span>S.NO</span>
                <span>Name</span>
                <span>Mobile</span>
                <span>Email</span>
                <span>Date</span>
                <span>Actions</span>
            </div>
            <div className="body">
                {admin?.users?.map((val, ind) => {

                    return <div key={ind}>
                        <span>{ind + 1}</span>
                        <span>{val.name}</span>
                        <span>{val.phone}</span>
                        <span>{val.email}</span>
                        <span>{formatDate(val.createdAt)}</span>
                        <span><i className="fa fa-pencil" onClick={() => actione(val)} aria-hidden="true"></i>
                            <i className="fa fa-trash" onClick={() => Deletee(val._id)} aria-hidden="true"></i></span>
                    </div>
                })}
            </div>
        </div>
    </>
}
export default User;