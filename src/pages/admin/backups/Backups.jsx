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

/* ---------------- CRON VALIDATOR (6 FIELD, SECONDS ENABLED) ---------------- */
const validateCron = (cron) => {
    if (!cron) return { valid: false, message: "Cron expression required" };

    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 6) {
        return {
            valid: false,
            message: "Cron must have 6 fields (sec min hour day month week)"
        };
    }

    const cronRegex =
        /^(\*|\*\/\d+|\d+|\d+\-\d+)(\s+(\*|\*\/\d+|\d+|\d+\-\d+)){5}$/;

    if (!cronRegex.test(cron)) {
        return { valid: false, message: "Invalid cron syntax" };
    }

    return { valid: true, message: "Valid cron expression" };
};

/* ---------------- CRON EXPLAINER ---------------- */
const explainCron = (cron) => {
    const { valid, message } = validateCron(cron);
    if (!valid) return message;

    const [sec, min, hour, , , week] = cron.split(" ");

    if (sec.startsWith("*/")) {
        return `Runs every ${sec.replace("*/", "")} seconds`;
    }

    if (week === "*") {
        const h = Number(hour);
        const m = Number(min);
        const ampm = h >= 12 ? "PM" : "AM";
        const hr12 = h % 12 || 12;
        return `Runs every day at ${hr12}:${m.toString().padStart(2, "0")} ${ampm}`;
    }

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return `Runs every ${days[week]} at ${hour}:${min}`;
};

/* ---------------- INITIAL STATE ---------------- */
const emptyForm = {
    databases: [],
    cron: "* * * * * *",
    timezone: "Asia/Kolkata",
    enabled: true,
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
            // console.log(data)

            setSchedules(data.schedules || []);
            setDatabaselist((data.database || []).map((db) => db.name));
        } catch {
            toast.error("Failed to load schedules");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- SAVE ---------------- */
    const saveSchedule = async () => {
        const { valid, message } = validateCron(form.cron);
        if (!valid) {
            toast.error(message);
            return;
        }

        if (!form.databases.length) {
            toast.error("Select at least one database");
            return;
        }

        if (form.emailNotification.enabled && !form.emailNotification.email) {
            toast.error("Email address required");
            return;
        }

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
                render: "Saved successfully",
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

                <div className="header">
                    <span>#</span>
                    <span>Databases</span>
                    <span>Cron</span>
                    <span>status</span>
                    <span>Actions</span>
                </div>

                <div className="body">
                    {schedules.map((s, i) => (
                        <div key={s._id}>
                            <span>{i + 1}</span>
                            <span>{s.databases.join(", ")}</span>
                            <span>
                                <p style={{letterSpacing:'4px'}}>{s.cron}</p>
                                <p style={{fontSize:'14px', color:'GrayText'}}>{explainCron(s.cron)}</p>
                            </span>
                            <span>{s.enabled ? '✅': '❌'}</span>
                            <span>
                                <MdEdit
                                    onClick={() => {
                                        setForm(s);
                                        setEditId(s._id);
                                        setModal(true);
                                    }}
                                />
                                <MdDelete onClick={() => deleteSchedule(s._id)} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------------- MODAL ---------------- */}
            <Modalbox open={modal} onClose={() => ''}>
                <div className="membermodal">
                    <form onSubmit={saveSchedule}>
                        <h2>Schedules</h2>
                        <span className="modalcontent">
                            {editId &&
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={form.enabled}
                                            onChange={(e) => setForm({
                                                ...form, enabled: e.target.checked
                                            })}
                                        />
                                    }
                                    label={form.enabled ? "Enabled" : "Disabled"}
                                />
                            }

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
                                InputProps={{
                                    sx: {
                                        letterSpacing: "2px",
                                        textAlign: "center",
                                        fontFamily: "monospace",
                                        fontWeight: 500
                                    }
                                }}
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
