import { useState } from "react";
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import './contactform.css'
import Button from '@mui/material/Button';
import Dialogbox from "../../utils/dialogbox";
import { toast } from 'react-toastify';

const Contactform = () => {
    const tournacenter = useSelector((state) => state.tournacenter);
    const admin = useSelector((state) => state.admin);
    const [contactus, setcontactus] = useState(admin.contactusform);
    const [openmodal, setopenmodal] = useState(false);
    const [reply, setreply] = useState('');
    const [email, setemail] = useState('');

    const handleChange = (e) => {
        setreply(e.target.value);
    }
    const openmodale = (email) => {
        setopenmodal(true);
        setemail(email)
    }
    const handlee = async (e) => {
        e.preventDefault();
        // console.log(email,reply);
        try {
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${tournacenter.apiadress}/emailreply`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email,reply})
            });
            const data = await responsee.json();
            console.log(data);
            if (responsee.ok) {
                toast.success(data.msg, { autoClose: 1300 });
                setopenmodal(false);
            } else {
                toast.warn(data.msg, { autoClose: 1500 });
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return <>
        <div className="contactform">
            <div className="all">
                <div className="header">
                    <span>S.no</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Message</span>
                    <span>Actions</span>
                </div>
                <div className="body">
                    {contactus && contactus.map((val, ind) => {
                        return <div key={ind}>
                            <span>{ind + 1}</span>
                            <span>{val.name}</span>
                            <span>{val.email}</span>
                            <span>{val.message}</span>
                            <span><i className="fa fa-pencil" onClick={() => openmodale(val.email)} aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i></span>
                        </div>
                    })}
                </div>
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
                                <Button size="small" type="submit" variant="contained"> Submit</Button>
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