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
import { IoMdRefresh } from "react-icons/io";
import { MdEdit, MdDelete, MdSearch, MdInfo } from "react-icons/md";
import { toast } from "react-toastify";
import Modalbox from "../../../components/custommodal/Modalbox";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import Projects from "./Projects";
import {AllDbModal} from './AllDbModal'
import { useCustomStyles } from "../../../components/Datatablecustomstyle";

const API = `${import.meta.env.VITE_API_ADDRESS}backup-schedules`;

/* ---------------- CRON VALIDATOR (6 FIELD, SECONDS ENABLED) ---------------- */
const validateCron = (cron) => {
    if (!cron) return { valid: false, message: "Cron expression required" };

    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) {
        return {
            valid: false,
            message: "Cron must have 5 fields (min hour day month week)"
        };
    }

    // ⬇️ changed {5} → {4} to make total fields = 5
    const cronRegex =
        /^(\*|\*\/\d+|\d+|\d+\-\d+)(\s+(\*|\*\/\d+|\d+|\d+\-\d+)){4}$/;

    if (!cronRegex.test(cron)) {
        return { valid: false, message: "Invalid cron syntax" };
    }

    return { valid: true, message: "Valid cron expression" };
};


/* ---------------- CRON EXPLAINER ---------------- */
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
    cron: "* * * * *",
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
    const [dbmodal, setdbmodal] = useState(false);
    const [deploymodal, setdeploymodal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cronLogs, setCronLogs] = useState(null);
    const [inMemoryJob, setinMemoryJob] = useState(null);

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
            setDatabaselist((data.database || []));
            // toast.success("Refreshed",{autoClose:1000});
        } catch {
            toast.error("Failed to load schedules");
        } finally {
            setLoading(false);
        }
    };

    const getStat = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}getJobStatus`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            console.log(data)
            setinMemoryJob(data.jobs)

        } catch {
            toast.error("Failed to load schedules");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- SAVE ---------------- */
    const saveSchedule = async (e) => {
        e.preventDefault();
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
        // if (!window.confirm("Delete this schedule?")) return;

        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this Schedule',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
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
            } else {
            }
        });
    };

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            width: '40px'
        },
        {
            name: "Db Name",
            selector: (row) => row.databases.join(", ")
        },

        {
            name: "Cron",
            selector: (row) => {
                return (
                    <span>
                        <p style={{ letterSpacing: '4px' }}>{row.cron}</p>
                        <p style={{ fontSize: '13px', color: 'GrayText' }}>{explainCron(row.cron)}</p>
                    </span>
                )
            },
            width: '200px'
        },
        {
            name: "Email",
            selector: (row) => row.emailNotification?.enabled ? row.emailNotification.email : '-'
        },
        {
            name: "Status",
            selector: (row) => row.enabled ? '✅ Active' : '❌ Inactive',
            width: '80px'
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-2 lg:gap-1">
                    <div
                        onClick={() => {
                            setForm(row);
                            setEditId(row._id);
                            setModal(true);
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer transition"
                    >
                        <MdEdit className="w-4 h-4" />
                    </div>

                    <div
                        onClick={() => setCronLogs(row.logs)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer transition"
                    >
                        <MdInfo className="w-4 h-4" />
                    </div>

                    <div
                        onClick={() => deleteSchedule(row._id)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer transition"
                    >
                        <MdDelete className="w-4 h-4" />
                    </div>

                </div>
            ),
            width: "120px",
            ignoreRowClick: true,
        }


    ]

    const editcolumns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            width: '40px'
        },
        {
            name: "Started At",
            selector: (row) => dayjs(row.startedAt).format('DD/MM/YY hh:mm A')
        },
        {
            name: "Status",
            selector: (row) => (
                <div
                    className={
                        row.status === "SUCCESS"
                            ? "px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700"
                            : row.status === "FAILED"
                                ? "px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"
                                : "px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"
                    }
                >
                    {row.status}
                </div>
            ),
            width: "90px"
        },
        {
            name: "Duration",
            selector: (row) => row.durationMs / 1000 + ' Seconds',
            width: '120px'
        },
    ]
    const inmomoryJobs = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            width: '40px'
        },
        {
            name: "Job Id",
            selector: (row) => row.jobId
        },
    ]

    return (
        <div className=" min-h-screen p-1 bg-white backup">
            <div className="inner w-full">
                {/* Controller */}
                <div className="controler px-1 py-2 relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ">
                    <h2 className="text-lg font-semibold sm:text-xl">
                        Admin Dashboard
                    </h2>

                    <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-[10px] ">
                        <Button
                            loading={loading}
                            loadingPosition="end"
                            onClick={fetchSchedules}
                            endIcon={<IoMdRefresh />}
                            variant="outlined"
                            size="small"
                        >
                            Refresh
                        </Button>

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
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => { setdeploymodal(true) }}
                        >
                            Redeploy
                        </Button>

                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => setdbmodal(true)}
                        >
                            Dbs
                        </Button>

                        <Button
                            size="small"
                            variant="contained"
                            onClick={getStat}
                        >
                            Get stat
                        </Button>
                    </div>
                </div>


                <DataTable
                    columns={columns}
                    data={schedules}
                    pagination
                    customStyles={useCustomStyles()}
                />

            </div>

            <Projects open={deploymodal} onClose={() => setdeploymodal(false)} />

            {/* ---------------- MODAL ---------------- */}
            <Modalbox open={modal} onClose={() => ''}>
                <div className="content w-100">
                    <p className="header">Schedules</p>
                    <div className="modalbody">
                        <form id='form' onSubmit={saveSchedule}>
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
                                        <MenuItem key={db.name} value={db.name}>
                                            <Checkbox checked={form.databases.includes(db.name)} />
                                            <ListItemText primary={db.name} />
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

                        </form>
                    </div>
                    <div className="modalfooter">
                        <Button
                            disabled={loading}
                            variant="contained"
                            size="small"
                            form="form"
                            type="submit"
                        >
                            SAVE
                        </Button>
                        <Button variant="outlined" onClick={() => setModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modalbox>

            <Modalbox open={cronLogs?.length > 0} onClose={() => setCronLogs(null)}>
                <div className="content w-120 ">
                    <p className="header ">Schedules</p>
                    <div className="modalbody ">
                        <DataTable
                            columns={editcolumns}
                            data={cronLogs}
                            pagination
                            customStyles={useCustomStyles()}
                            highlightOnHover
                        />

                    </div>
                </div>
            </Modalbox>

            <Modalbox open={inMemoryJob?.length > 0} onClose={() => setinMemoryJob(null)}>
                <div className="content w-100 h-300">
                    <p className="header">Task History Stats</p>
                    <div className="modalbody">
                        <DataTable
                            columns={inmomoryJobs}
                            data={inMemoryJob}
                            // pagination
                            customStyles={useCustomStyles()}
                            highlightOnHover
                        />
                    </div>
                </div>
            </Modalbox>

            <AllDbModal databaselist={databaselist} dbmodal={dbmodal} setdbmodal={setdbmodal} />
        </div>
    );
};

export default BackupScheduleAdmin;
