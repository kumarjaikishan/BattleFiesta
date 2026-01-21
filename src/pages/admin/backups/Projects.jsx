import React, { useState } from 'react'
import Modalbox from '../../../components/custommodal/Modalbox'
import { toast } from 'react-toastify';
import axios from 'axios'
import CustomModal from '../../../components/modalBox/Modal';
import { Button } from '@mui/material';

const Projects = ({ open, onClose }) => {

    const [currDeploy, setcurrdeploy] = useState(false)

    const deploy = async (project) => {

        swal({
            title: `Are you sure you want to Deploy ${project}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (proceed) => {
            if (proceed) {
                setcurrdeploy(project)
                const toastId = toast.loading(`Deploying ${project}...`); // ⏳ show loading

                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_ADDRESS}deploy/${project}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    toast.update(toastId, {
                        render: res.data.message,
                        type: "success",
                        isLoading: false,
                        autoClose: 1800,
                    });
                } catch (error) {
                    toast.update(toastId, {
                        render: error.response?.data?.message || "Error during deployment",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    console.log(error);
                } finally {
                    setcurrdeploy(null)
                }
            }
        });
    };

    const projects = [
        { name: 'Accusoft', project: 'accusoft' },
        { name: 'Battlefiesta', project: 'battlefiesta' },
        { name: 'Office', project: 'office' },
        { name: 'Portfolio', project: 'portfolio' },
    ]

    return (
        <>
            <CustomModal
                open={open}
                backdrop={3}
                onClose={onClose}
                width={350}
                animation={true}
                tapOutsidemodal={true}
            >
                <CustomModal.Header>
                    <p className="header">User Detail</p>
                </CustomModal.Header>

                <CustomModal.Body>
                    <div className='flex flex-col  w-full'>
                        {projects.map((v, i) => {
                            return <div key={i} className='flex my-1 p-2 justify-between  w-full '>
                                <div>{v.name}</div>
                                <button
                                    onClick={() => deploy(v.project)}
                                    loading={currDeploy === v.project}
                                    className="px-4 py-1.5 text-sm font-semibold text-white bg-emerald-600 rounded-md transition-all duration-200 hover:bg-emerald-700 active:scale-95 focus:ring-2 focus:ring-emerald-400"
                                >
                                    Deploy
                                </button>

                            </div>
                        })}
                    </div>
                </CustomModal.Body>

                <CustomModal.Footer>
                    <Button onClick={onClose} variant="outlined"> cancel</Button>
                </CustomModal.Footer>

            </CustomModal>

            {/* <Modalbox open={open} onClose={onClose}>
                <div className="content w-100">
                    <p className="header">Schedules</p>
                    <div className="modalbody">
                        {projects.map((v, i) => {
                            return <div key={i}>
                                <div>{i.name}</div>
                                <button
                                    onClick={() => deploy('office')}
                                > Deploy </button>
                            </div>
                        })}
                    </div>
                </div>
            </Modalbox> */}
        </>
    )
}

export default Projects
