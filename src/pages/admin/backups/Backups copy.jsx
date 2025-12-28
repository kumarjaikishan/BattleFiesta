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
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "./dashboard.css";
import Modalbox from "../../../components/custommodal/Modalbox";

const API = `${import.meta.env.VITE_API_ADDRESS}backup-schedules`;

/* ---------------- CRON BUILDER ---------------- */
const buildCron = ({ time, frequency, dayOfWeek }) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");

    if (frequency === "weekly") {
        return `0 ${minute} ${hour} * * ${dayOfWeek}`;
    }

    // daily
    return `0 ${minute} ${hour} * * *`;
};

/* ---------------- INITIAL STATE ---------------- */
const emptyForm = {
    databases: [],
    time: "",
    timezone: "Asia/Kolkata",
    enabled: true,
    frequency: "daily",   // daily | weekly
    dayOfWeek: "1",       // 0-6
    cron: "",
    emailNotification: {
        enabled: false,
        email: ""
    }
};

const BackupScheduleAdmin = () => {
    const [schedules, setSchedules] = useState([]);
    const [databaselist, setDatabaselist] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    /* ---------------- AUTO BUILD CRON ---------------- */
    useEffect(() => {
        const cron = buildCron(form);
        setForm(prev => ({ ...prev, cron }));
    }, [form.time, form.frequency, form.dayOfWeek]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    /* ---------------- FETCH ---------------- */
    const fetchSchedules = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            const res = await fetch(API, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();

            setSchedules(Array.isArray(data.schedules) ? data.schedules : []);
            setDatabaselist(
                Array.isArray(data.database)
                    ? data.database.map(db => db.name)
                    : []
            );
        } catch {
            toast.error("Failed to load schedules");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- SAVE ---------------- */
    const saveSchedule = async () => {
        const token = localStorage.getItem("token");
        const toaste = toast.loading("Saving...");
        setLoading(true);

        try {
            const res = await fetch(editId ? `${API}/${editId}` : API, {
                method: editId ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.update(toaste, {
                render: data.message || "Saved",
                type: "success",
                isLoading: false,
                autoClose: 1500
            });

            setForm(emptyForm);
            setEditId(null);
            setModal(false);
            fetchSchedules();
        } catch (err) {
            toast.update(toaste, {
                render: err.message,
                type: "error",
                isLoading: false
            });
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- EDIT ---------------- */
    const editSchedule = (s) => {
        setForm({
            ...s,
            databases: Array.isArray(s.databases) ? s.databases : []
        });
        setEditId(s._id);
        setModal(true);
    };

    /* ---------------- DELETE ---------------- */
    const deleteSchedule = async (id) => {
        if (!window.confirm("Delete this schedule?")) return;

        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            await fetch(`${API}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Deleted");
            fetchSchedules();
        } catch {
            toast.error("Delete failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admindashboard backup">
            <div className="inner">

                {/* ---------- HEADER ---------- */}
                <div className="controler">
                    <h2>Backup Schedules</h2>

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
                        ADD
                    </Button>
                </div>

                {/* ---------- TABLE ---------- */}
                <div className="header">
                    <span>#</span>
                    <span>Databases</span>
                    <span>Time</span>
                    <span>Cron</span>
                    <span>Actions</span>
                </div>

                <div className="body">
                    {schedules.map((s, i) => (
                        <div key={s._id}>
                            <span>{i + 1}</span>
                            <span>{s.databases.join(", ")}</span>
                            <span>{s.time}</span>
                            <span>{s.cron}</span>
                            <span>
                                <MdEdit onClick={() => editSchedule(s)} />
                                <MdDelete onClick={() => deleteSchedule(s._id)} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <Modalbox open={modal} onClose={() => setmodal(false)}>
                <div className="membermodal">
                    <form onSubmit={saveSchedule}>
                        <h2>Schedules</h2>
                        <span className="modalcontent">

                            <FormControl fullWidth size="small">
                                <InputLabel>Databases</InputLabel>
                                <Select
                                    multiple
                                    value={form.databases}
                                    label="Databases"
                                    renderValue={(selected) => selected.join(", ")}
                                    onChange={(e) =>
                                        setForm({ ...form, databases: e.target.value })
                                    }
                                >
                                    {databaselist.map((db) => (
                                        <MenuItem key={db} value={db}>
                                            <Checkbox checked={form.databases.includes(db)} />
                                            <ListItemText primary={db} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* MANUAL CRON */}
                            <TextField
                                label="Cron Expression (sec min hour day month week)"
                                placeholder="*/10 * * * * *"
                                size="small"
                                fullWidth
                                value={form.cron}
                                error={!validateCron(form.cron).valid}
                                helperText={explainCron(form.cron)}
                                onChange={(e) =>
                                    setForm({ ...form, cron: e.target.value })
                                }
                            />

                            {/* TIMEZONE */}
                            <TextField
                                label="Timezone"
                                size="small"
                                fullWidth
                                disabled
                                value={form.timezone}
                            />

                            {/* EMAIL */}
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={form.emailNotification.enabled}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                emailNotification: {
                                                    ...form.emailNotification,
                                                    enabled: e.target.checked
                                                }
                                            })
                                        }
                                    />
                                }
                                label="Email Notification"
                            />

                            {form.emailNotification.enabled && (
                                <TextField
                                    type="email"
                                    label="Email Address"
                                    size="small"
                                    fullWidth
                                    value={form.emailNotification.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            emailNotification: {
                                                ...form.emailNotification,
                                                email: e.target.value
                                            }
                                        })
                                    }
                                />
                            )}

                            <div style={{ width: "100%" }}>
                                <Button
                                    disabled={loading}
                                    variant="contained"
                                    size="small"
                                    onClick={saveSchedule}
                                >
                                    SAVE
                                </Button>
                                <Button variant="outlined" onClick={() => setModal(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </span>
                    </form>
                </div>
            </Modalbox>
        </div>
    );
};

export default BackupScheduleAdmin;
