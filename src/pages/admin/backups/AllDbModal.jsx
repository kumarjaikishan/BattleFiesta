import React, { useEffect, useState } from 'react'
import Modalbox from '../../../components/custommodal/Modalbox'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import DataTable from 'react-data-table-component'
import { useCustomStyles } from '../../../components/Datatablecustomstyle'

export const AllDbModal = ({ databaselist, dbmodal, setdbmodal }) => {
    const [loading, setloading] = useState(false)
    const [dbselected, setdbselected] = useState(null)

    const createBackup = async () => {
        if (dbselected.length < 1) return toast.warn('Select Atlest One DataBase')

        const token = localStorage.getItem("token");
        const toaste = toast.loading("Please wait...");
        setloading(true)
        try {
            const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}dbbackup`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ dbname: dbselected })
            });
            const data = await responsee.json();
            setloading(false)
            setdbselected(null)
            if (responsee.ok) {
                toast.update(toaste, { render: data.message, type: "success", isLoading: false, autoClose: 1700 });
            } else {
                return toast.update(toaste, { render: data.message, type: "warning", isLoading: false, autoClose: 2100 });
            }

        } catch (error) {
            setloading(false)
            console.log(error);
            toast.update(toaste, { render: error.message, type: "warning", isLoading: false, autoClose: 2700 });
        }
    }

    const formatSize = (sizeInBytes) => {
        const sizeInKB = sizeInBytes / 1024;
        if (sizeInKB >= 1024) {
            return `${(sizeInKB / 1024).toFixed(2)} MB`;
        }
        return `${sizeInKB.toFixed(2)} KB`;
    }

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            width: '40px'
        },
        {
            name: "Db Name",
            selector: (row) => row.name
        },

        {
            name: "Size",
            selector: (row) => formatSize(row.sizeOnDisk),
            width: '120px'
        },
        // {
        //     name: "Action",
        //     cell: (row) => (
        //         <Button
        //             disabled={loading}
        //             size="small"
        //             variant="contained"
        //             onClick={() => createBackup(row?.name)}
        //         >
        //             Backup
        //         </Button>
        //     ),
        //     width: '90px',
        //     ignoreRowClick: true,
        // }

    ]

    const handleSelectedRows = ({ selectedRows }) => {
        console.log(selectedRows);
        setdbselected(selectedRows.map((e) => e.name))
    };

    return (
        <Modalbox open={dbmodal} onClose={() => setdbmodal(false)}>
            <div className="content w-140">
                <p className="header">Data Base</p>
                <div className="modalbody">
                    {dbselected?.length > 0 &&
                        <div className='mb-2 text-end'>
                            <Button
                                disabled={loading}
                                size="small"
                                variant="outlined"
                                onClick={createBackup}
                            >
                                Backup ({dbselected?.length})
                            </Button>
                        </div>
                    }

                    <DataTable
                        columns={columns}
                        data={databaselist}
                        pagination
                        selectableRows
                        onSelectedRowsChange={handleSelectedRows}
                        customStyles={useCustomStyles()}
                        highlightOnHover
                    />
                </div>
            </div>
        </Modalbox>
    )
}

