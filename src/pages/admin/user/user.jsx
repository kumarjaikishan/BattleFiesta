import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './user.css'
import swal from 'sweetalert';
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Users } from "../../../store/admin";
import { toast } from 'react-toastify';

const User = () => {
    const admin = useSelector((state) => state.admin);
    const userprofile = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(admin);
    }, [])
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };
    const Deletee = async (userid) => {
        // console.log(userid);
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this Tournament!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const toaste = toast.loading("Please wait...")
                    const token = localStorage.getItem("token");
                    const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}deleteuser`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ userid })
                    });
                    const data = await responsee.json();
                    // console.log(data);
                    if (responsee.ok) {
                        dispatch(Users())
                        toast.update(toaste, { render: data.message, type: "success", isLoading: false, autoClose: 2100 });
                    } else {
                        return toast.update(toaste, { render: data.message, type: "warn", isLoading: false, autoClose: 2100 });
                    }
                } catch (error) {
                    toast.update(toaste, { render: data.message, type: "warn", isLoading: false, autoClose: 5200 });
                    console.log(error);
                }
            } else {
                // swal('Your data is safe!');
            }
        });

        if (!userid) {
            return toast.warn('UserId cannot be blank')
        }

    }

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