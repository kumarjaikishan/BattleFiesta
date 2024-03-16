import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import './contactform.css'
import Button from '@mui/material/Button';
import Dialogbox from "../../utils/dialogbox";
import { toast } from 'react-toastify';
import { contactusform } from "../../../store/admin";
import { motion } from 'framer-motion';
import swal from 'sweetalert';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const Contactform = () => {
    const dispatch = useDispatch();
    const tournacenter = useSelector((state) => state.tournacenter);
    const admin = useSelector((state) => state.admin);
    const [contactus, setcontactus] = useState(admin.contactusform);
    const [openmodal, setopenmodal] = useState(false);
    const [reply, setreply] = useState('');
    const [email, setemail] = useState('');
    const [contactid, setcontactid] = useState('');

    useEffect(()=>{
    // console.log(admin.contactusform);
    },[])

    const handleChange = (e) => {
        setreply(e.target.value);
    }
    const openmodale = (email,id) => {
        setopenmodal(true);
        setemail(email)
        setcontactid(id)
    }
    const [isload, setisload] = useState(false);
    const handlee = async (e) => {
        e.preventDefault();
        // console.log(email,reply);
        try {
            setisload(true);
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}emailreply`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ contactid,email, reply })
            });
            const data = await responsee.json();
            console.log(data);
            if (responsee.ok) {
                toast.success(data.message, { autoClose: 1300 });
                setopenmodal(false);
                dispatch(contactusform());
            } else {
                toast.warn(data.message, { autoClose: 1500 });
            }
            setisload(false);
        } catch (error) {
            setisload(false);
            console.log(error);
        }
    }
    const deletee = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this Tournament!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const token = localStorage.getItem("token");
                    const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}contactusdelete`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ id })
                    });
                    const data = await responsee.json();
                    // console.log(data);
                    if (responsee.ok) {
                        dispatch(contactusform());
                        toast.success(data.message, { autoClose: 1300 });
                    } else {
                        toast.warn(data.message, { autoClose: 1500 });
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {

            }
        });

    }

    return <>
        <div className="contactform">
            <div className="all">
                <div className="header">
                    <span>S.no</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Message</span>
                    <span>Resolve</span>
                    <span>Actions</span>
                </div>
                <motion.div layout className="body">
                    {admin.contactusform && admin.contactusform.map((val, ind) => {
                        return <motion.div layout key={ind}>
                            <span>{ind + 1}</span>
                            <span>{val.name}</span>
                            <span>{val.email}</span>
                            <span>{val.message}</span>
                            <span className={val.resolve ?  `status done`: 'status pending'} title={val.resolve ? val.resolvemsg:''}>{val.resolve ? "Resolved" : "Pending"}</span>
                            <span><i className="fa fa-pencil" onClick={() => openmodale(val.email,val._id)} aria-hidden="true"></i>
                                <i className="fa fa-trash" onClick={() => deletee(val._id)} aria-hidden="true"></i></span>
                        </motion.div>
                    })}
                </motion.div>
                <Dialogbox
                    className="modale"
                    open={openmodal}
                    onClose={() => setopenmodal(false)}
                >
                    <div className="membermodal">
                        <form onSubmit={handlee}>
                            <h2>Reply</h2>

                            <TextField sx={{ width: '98%' }} value={email} contentEditable={false} label="Email" size="small" />
                            <TextField autoFocus multiline rows={4} onChange={handleChange} value={reply} sx={{ width: '98%' }} label="Reply" size="small" />

                            <div>
                                <LoadingButton
                                    loading={isload}
                                    loadingPosition="end"
                                    endIcon={<SendIcon />}
                                    variant="contained"
                                    type="submit"
                                >
                                    Send Email
                                </LoadingButton>
                                <Button size="small" onClick={() => setopenmodal(false)} variant="outlined"> cancel</Button>
                            </div>
                        </form>
                    </div>
                </Dialogbox>
            </div>
        </div>
    </>
}
export default Contactform;