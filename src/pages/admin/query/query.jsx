import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import { IoIosSend, IoMdRefresh } from "react-icons/io";
import { toast } from 'react-toastify';
import { contactusform } from "../../../store/admin";
import swal from 'sweetalert';
import {  Button} from "@mui/material";
import Modalbox from "../../../components/custommodal/Modalbox";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCustomStyles } from "../backups/AllDbModal";
import DataTable from "react-data-table-component";

const Query = () => {
    const dispatch = useDispatch();
    const tournacenter = useSelector((state) => state.tournacenter);
    const admin = useSelector((state) => state.admin);
    const [contactus, setcontactus] = useState(admin.contactusform);
    const [openmodal, setopenmodal] = useState(false);
    const [reply, setreply] = useState('');
    const [email, setemail] = useState('');
    const [contactid, setcontactid] = useState('');

    useEffect(() => {
        // console.log(admin.contactusform);
    }, [])

    const handleChange = (e) => {
        setreply(e.target.value);
    }
    const openmodale = (email, id) => {
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
                body: JSON.stringify({ contactid, email, reply })
            });
            const data = await responsee.json();
            // console.log(data);
            if (responsee.ok) {
                setemail('');
                setemail("");
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
            text: 'Once deleted, you will not be able to recover this',
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

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: "Name",
            cell: (row) => row.name,
            width: '180px'

        },
        {
            name: "Email",
            selector: (row) => row.email,
            width: '200px'
        },
        {
            name: "Message",
            selector: (row) => row.message,
        },
        {
            name: "Status",
            selector: (row) => <span className={row.resolve ? `status done` : 'status pending'} title={row.resolve ? row.resolvemsg : ''}>{row.resolve ? "Resolved" : "Pending"}</span>,
            width: '100px'
        },
        {
            name: "Action",
            selector: (row) => <div className="flex gap-2 lg:gap-1">
                <HiPencilSquare className='editicon ico' title="Edit" onClick={() => openmodale(row.email, row._id)} />
                <RiDeleteBin6Line className='deleteicon ico' title="Delete" onClick={() => deletee(row._id)} />
            </div>,
            width: '100px'
        },
    ]

    return <>
        <div className="adminusers p-1">
            <div className="all">
                <div className="controler flex flex-col gap-2 py-[5px] sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-center text-lg font-semibold sm:text-left">Query List</h2>

                    <div className="flex flex-wrap justify-center gap-2 sm:flex-nowrap sm:justify-end">
                        <Button
                            loading={admin.loading}
                            onClick={() => dispatch(contactusform())}
                            variant="contained"
                            type="submit"
                            size="small"
                        >
                            Custom
                        </Button>

                        <Button
                            loading={admin.loading}
                            onClick={() => dispatch(contactusform())}
                            loadingPosition="end"
                            endIcon={<IoMdRefresh />}
                            variant="outlined"
                            type="submit"
                            size="small"
                        >
                            REFRESH
                        </Button>
                    </div>
                </div>


                <DataTable
                    columns={columns}
                    data={admin?.contactusform}
                    pagination
                    highlightOnHover
                    customStyles={useCustomStyles()}
                />

                <Modalbox open={openmodal} onClose={() => setopenmodal(false)}>
                    <div className="content w-100">
                        <p className="header">Reply</p>
                        <div className="modalbody">
                            <form id="replyForm" onSubmit={handlee}>
                                <TextField sx={{ width: '98%' }} value={email}
                                    // contentEditable={false} 
                                    onChange={(e) => setemail(e.target.value)}
                                    label="Email" size="small" />
                                <TextField autoFocus multiline rows={4} onChange={handleChange} value={reply} sx={{ width: '98%' }} label="Reply" size="small" />

                            </form>
                        </div>
                        <div className="modalfooter">
                            <Button
                                sx={{ mr: 2 }}
                                loading={isload}
                                loadingPosition="end"
                                endIcon={<IoIosSend />}
                                variant="contained"
                                type="submit"
                                form="replyForm"
                            >
                                Send Email
                            </Button>
                            <Button size="small" onClick={() => setopenmodal(false)} variant="outlined"> cancel</Button>

                        </div>
                    </div>
                </Modalbox>
            </div>
        </div>
    </>
}
export default Query;