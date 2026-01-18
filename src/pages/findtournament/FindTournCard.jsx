import Button from "@mui/material/Button";
import { MdContentCopy, MdMenuOpen, MdGroups } from "react-icons/md";
import { toast } from "react-toastify";
import tournlogo from "../../assets/logowebp_250.webp";
import { cloudinaryUrl } from "../../utils/imageurlsetter";

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
        tournment_logo
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
        <div className="card">
            <div className="img">
                <img
                    loading="lazy"
                    src={
                        cloudinaryUrl(tournment_logo, {
                            format: "webp",
                            width: 300,
                        }) || tournlogo
                    }
                    alt={title}
                />
                <span title={title}>{title}</span>
            </div>

            <h3 className="organiser">- {organiser}</h3>

            <div className="time">
                {formattedDate}, {formattedTime} <span>{type}</span>
            </div>

            <div className="tournId">
                <span>
                    ID :- {tournid}
                    <MdContentCopy
                        title="Copy Id"
                        onClick={() => {
                            navigator.clipboard.writeText(tournid);
                            toast.success("Copied", { autoClose: 1000 });
                        }}
                    />
                </span>

                <span
                    title={`${totalTeamsRegistered} out of ${slots} slots Registered`}
                >
                    <MdGroups /> {totalTeamsRegistered}/{slots}
                </span>
            </div>

            <div className="controller">
                <Button
                    size="small"
                    variant="contained"
                    endIcon={<MdMenuOpen />}
                    onClick={() => onReadMore(_id)}
                >
                    READ MORE
                </Button>

                {showStatus && (
                    <p className="status" title="Status">
                        {status}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TournamentCard;
