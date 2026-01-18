import Button from "@mui/material/Button";
import { MdContentCopy, MdMenuOpen, MdGroups } from "react-icons/md";
import { toast } from "react-toastify";
import tournlogo from "../../assets/logowebp_250.webp";
import { cloudinaryUrl } from "../../utils/imageurlsetter";
import dayjs from "dayjs";

const TournamentCard = ({ tournament, onReadMore, showStatus }) => {
    const {
        _id,
        title,
        organiser,
        createdAt,
        type,
        tournid,
        totalTeamsRegistered,
        slots,
        status,
        tournment_logo,
    } = tournament;

    const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const formattedTime = new Date(createdAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <div
            className=" bottomshadow
                relative w-60 bg-white rounded-lg overflow-hidden h-fit pb-2
                shadow-[6px_6px_16px_rgba(0,0,0,0.25)]
                hover:shadow-[10px_10px_24px_rgba(0,0,0,0.3)]
                transition-all duration-300 hover:-translate-y-1
              "
        >
            {/* IMAGE */}
            <div className="relative h-56 w-full overflow-hidden bg-[radial-gradient(circle_at_center,transparent_30%,#6d6f71)]">
                <img
                    loading="lazy"
                    src={
                        cloudinaryUrl(tournment_logo, {
                            format: "webp",
                            width: 300,
                        }) || tournlogo
                    }
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-3 pt-6 pb-1">
                    <h3
                        title={title}
                        className="text-white text-sm font-bold tracking-wide truncate uppercase"
                    >
                        {title}
                    </h3>
                </div>
            </div>

            {/* STATUS (optional) */}
            {showStatus && (
                <span
                    className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold uppercase
                        ${status === "ongoing"
                            ? "bg-green-100 text-green-700"
                            : status === "completed"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                >
                    {status}
                </span>
            )}

            {/* CONTENT */}
            <div className="px-3 py-2 space-y-1 text-sm text-slate-800">
                <p className="font-medium text-gray-800">by {organiser}</p>

                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        ID-{tournid}
                        <MdContentCopy
                            title="Copy ID"
                            className="cursor-pointer hover:text-teal-600"
                            onClick={() => {
                                navigator.clipboard.writeText(tournid);
                                toast.success("Copied", { autoClose: 1000 });
                            }}
                        />
                    </span>
                    <span>
                        {dayjs(createdAt).format('DD MMM YYYY')}
                    </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-white uppercase">
                        {type}
                    </span>

                    <span
                        title={`${totalTeamsRegistered} out of ${slots} slots Registered`}
                        className="flex items-center gap-1"
                    >
                        <MdGroups className="text-lg" />
                        {totalTeamsRegistered}/{slots}
                    </span>
                </div>
            </div>

            {/* ACTION */}

            <button
                onClick={() => onReadMore(_id)}
                className=" w-40 h-8 text-white bg-[url('/btn-bg1.webp')]
                          bg-contain bg-no-repeat bg-center transition-all duration-200
                          flex items-center justify-center gap-2
                          hover:-translate-y-0.5 
                        "
            >
                <span className="flex cursor-pointer hover:elevate items-center gap-1 text-sm font-semibold">
                    Read More <MdMenuOpen className="text-base" />
                </span>
            </button>


        </div>
    );
};

export default TournamentCard;
