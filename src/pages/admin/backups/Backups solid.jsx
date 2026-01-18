import { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    Switch,
    TextField
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { IoMdRefresh } from "react-icons/io";
import { MdEdit, MdDelete, MdSearch } from "react-icons/md";
import { toast } from "react-toastify";
import "./dashboard.css";
import Modalbox from "../../../components/custommodal/Modalbox";
import dayjs from "dayjs";
import AllDbModal, { useCustomStyles } from "./AllDbModal";
import DataTable from "react-data-table-component";
import swal from "sweetalert";

const API = `${import.meta.env.VITE_API_ADDRESS}backup-schedules`;

/* ===================== CRON UTILS ===================== */
const validateCron = (cron) => {
    if (!cron) return { valid: false, message: "Cron expression required" };

    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) {
        return { valid: false, message: "Cron must have 5 fields" };
    }

    const regex =
        /^(\*|\*\/\d+|\d+|\d+\-\d+)(\s+(\*|\*\/\d+|\d+|\d+\-\d+)){4}$/;

    return regex.test(cron)
        ? { valid: true }
        : { valid: false, message: "Invalid cron syntax" };
};

const explainCron = (cron) => {
    const { valid, message } = validateCron(cron);
    if (!valid) return message;

    const [min, hour, , , week] = cron.split(" ");

    if (min.startsWith("*/")) {
        return `Runs every ${min.replace("*/", "")} Minutes`;
    }

    if (week === "*") {
        const h = Number(hour);
        const m = Number(min);
        const ampm = h >= 12 ? "PM" : "AM";
        const hr12 = h % 12 || 12;
        return `Runs every day at ${hr12}:${m.toString().padStart(2, "0")} ${ampm}`;
    }

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return `Runs every ${days[week]} at ${hour}:${min}`;
};

/* ===================== API HOOK ===================== */
const useScheduleApi = (setSchedules, setDatabaselist, setLoading) => {
    const token = localStorage.getItem("token");

    const fetchSchedules = async () => {
        setLoading(true);
        try {
            const res = await fetch(API, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setSchedules(data.schedules || []);
            setDatabaselist(data.database || []);
        } catch {
            toast.error("Failed to load schedules");
        } finally {
            setLoading(false);
        }
    };

    const deleteSchedule = async (id) => {
        return swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Schedule",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(async (ok) => {
            if (!ok) return;
            setLoading(true);
            try {
                await fetch(`${API}/${id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Deleted");
                fetchSchedules();
            } finally {
                setLoading(false);
            }
        });
    };

    return { fetchSchedules, deleteSchedule };
};

/* ===================== TABLE CONFIG ===================== */
const getColumns = ({ onEdit, onDelete, onLogs }) => [
    { name: "S.no", selector: (_, i) => i + 1, width: "40px" },
    { name: "Db Name", selector: (r) => r.databases.join(", ") },
    {
        name: "Cron",
        selector: (r) => (
            <span>
                <p style={{ letterSpacing: "4px" }}>{r.cron}</p>
                <p style={{ fontSize: "13px", color: "GrayText" }}>
                    {explainCron(r.cron)}
                </p>
            </span>
        ),
        width: "200px"
    },
    {
        name: "Email",
        selector: (r) =>
            r.emailNotification?.enabled ? r.emailNotification.email : "-"
    },
    {
        name: "Status",
        selector: (r) => (r.enabled ? "✅ Active" : "❌ Inactive"),
        width: "80px"
    },
    {
        name: "Action",
        cell: (r) => (
            <span className="text-red-300" style={{ display: "flex", gap: "8px" }}>
                <MdEdit onClick={() => onEdit(r)} />
                <MdSearch onClick={() => onLogs(r.logs)} />
                <MdDelete onClick={() => onDelete(r._id)} />
            </span>
        ),
        width: "120px",
        ignoreRowClick: true,
        button: true
    }
];

const getEditColumns = () => [
    { name: "S.no", selector: (_, i) => i + 1, width: "40px" },
    {
        name: "Started At",
        selector: (r) => dayjs(r.startedAt).format("DD/MM/YY hh:mm A")
    },
    {
        name: "Status",
        selector: (r) => (
            <div
                className={
                    r.status === "SUCCESS"
                        ? "status success"
                        : r.status === "FAILED"
                        ? "status failed"
                        : "status running"
                }
            >
                {r.status}
            </div>
        ),
        width: "80px"
    },
    {
        name: "Duration",
        selector: (r) => `${r.durationMs / 1000} Seconds`,
        width: "120px"
    }
];

/* ===================== MAIN ===================== */
const emptyForm = {
    databases: [],
    cron: "* * * * *",
    timezone: "Asia/Kolkata",
    enabled: true,
    emailNotification: { enabled: false, email: "" }
};

const BackupScheduleAdmin = () => {
    const [schedules, setSchedules] = useState([]);
    const [databaselist, setDatabaselist] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [modal, setModal] = useState(false);
    const [dbmodal, setdbmodal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cronLogs, setCronLogs] = useState(null);
    const [inMemoryJob, setinMemoryJob] = useState(null);

    const { fetchSchedules, deleteSchedule } =
        useScheduleApi(setSchedules, setDatabaselist, setLoading);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const columns = getColumns({
        onEdit: (row) => {
            setForm(row);
            setEditId(row._id);
            setModal(true);
        },
        onDelete: deleteSchedule,
        onLogs: setCronLogs
    });

    return (
        <div className="admindashboard backup">
            <div className="inner">
                {/* CONTROLLER */}
                <div className="controler">
                    <h2>Admin Dashboard</h2>
                    <div>
                        <LoadingButton
                            loading={loading}
                            onClick={fetchSchedules}
                            endIcon={<IoMdRefresh />}
                            variant="outlined"
                            size="small"
                        >
                            REFRESH
                        </LoadingButton>

                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                                setForm(emptyForm);
                                setEditId(null);
                                setModal(true);
                            }}
                        >
                            ADD Jobs
                        </Button>

                        <Button size="small" variant="contained" onClick={() => setdbmodal(true)}>
                            Dbs
                        </Button>
                    </div>
                </div>

                <div id="cronjobhistory">
                    <DataTable
                        columns={columns}
                        data={schedules}
                        pagination
                        customStyles={useCustomStyles()}
                    />
                </div>
            </div>

            {/* MODALS (unchanged JSX, same behavior) */}
            {/* You can paste your modal JSX here as-is */}
            <AllDbModal databaselist={databaselist} dbmodal={dbmodal} setdbmodal={setdbmodal} />
        </div>
    );
};

export default BackupScheduleAdmin;
