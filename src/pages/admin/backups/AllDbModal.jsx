import React, { useEffect, useState } from 'react'
import Modalbox from '../../../components/custommodal/Modalbox'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import DataTable from 'react-data-table-component'

const AllDbModal = ({ databaselist, dbmodal, setdbmodal }) => {
    const [loading, setloading] = useState(false)

    const createBackup = async (dbname) => {
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
                body: JSON.stringify({ dbname })
            });
            const data = await responsee.json();
            setloading(false)
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
        {
            name: "Action",
            cell: (row) => (
                <Button
                    disabled={loading}
                    size="small"
                    variant="contained"
                    onClick={() => createBackup(row?.name)}
                >
                    Backup
                </Button>
            ),
            width: '90px',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }

    ]

    return (
        <Modalbox open={dbmodal} onClose={() => setdbmodal(false)}>
            <div className="membermodal">
                <form >
                    <h2>Data Base</h2>
                    <span className="modalcontent">
                        <DataTable
                            columns={columns}
                            data={databaselist}
                            pagination
                            customStyles={useCustomStyles()}
                            highlightOnHover
                        />
                    </span>
                </form>
            </div>
        </Modalbox>
    )
}

export default AllDbModal;

export const useCustomStyles = () => {
    // const primaryColor = useSelector((state) => state.user.primaryColor) || "#115e59";

    return {
        headCells: {
            style: {
                backgroundColor: "#115e59",
                fontWeight: "bold",
                fontSize: "14px",
                color: "white",
                justifyContent: "flex-start",
                paddingLeft: "8px",
                paddingRight: "0px",
            },
        },
        headRow: {
            style: {
                borderBottom: "2px solid #ccc",
            },
        },
        rows: {
            style: {
                minHeight: "48px",
                borderBottom: "1px solid #eee",
            },
        },
        cells: {
            style: {
                justifyContent: "flex-start",
                paddingLeft: "8px",
                paddingRight: "0px",
            },
        },
    };
};
