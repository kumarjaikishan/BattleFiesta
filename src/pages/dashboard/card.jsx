import { motion } from "framer-motion";
import { Badge, Button } from "@mui/material";
import {
  MdOutlineContentCopy,
  MdGroups,
  MdDelete
} from "react-icons/md";
import { BsGearFill } from "react-icons/bs";
import { toast } from "react-toastify";

const TournamentCard = ({
  data,
  itemVariant,
  onManage,
  onDelete,
  cloudinaryUrl,
  fallbackImage
}) => {
  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Badge
      badgeContent={1}
      color="error"
      invisible={!data.newEntry}
    >
      <motion.div
        layout
        variants={itemVariant}
        className="
          relative w-60 bg-white rounded-xl overflow-hidden
          shadow-[6px_6px_16px_rgba(0,0,0,0.25)]
          hover:shadow-[10px_10px_24px_rgba(0,0,0,0.3)]
          transition-all duration-300 hover:-translate-y-1
        "
      >
        {/* IMAGE */}
        <div className="relative h-60 w-full overflow-hidden bg-[radial-gradient(circle_at_center,transparent_30%,#6d6f71)]">
          <img
            loading="lazy"
            src={
              cloudinaryUrl?.(data?.tournment_logo, { format: "webp" }) ||
              fallbackImage
            }
            alt="logo"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* TITLE */}
          <div className="absolute bottom-0 left-0 w-full flex items-end bg-gradient-to-t from-black/80 to-transparent px-3 pt-6 pb-1">
            <h3
              title={data.title}
              className="text-white text-sm font-bold tracking-wide truncate uppercase"
            >
              {data.title}
            </h3>
          </div>
        </div>

        {/* STATUS */}
        <span
          className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold uppercase
            ${
              data.status === "ongoing"
                ? "bg-green-100 text-green-700"
                : data.status === "completed"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          {data.status}
        </span>

        {/* CONTENT */}
        <div className="px-3 py-2 space-y-1 text-sm text-slate-800">
          <p className="font-medium text-gray-800">
            by {data.organiser}
          </p>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span className="flex items-center gap-1">
              ID-{data.tournid}
              <MdOutlineContentCopy
                className="cursor-pointer hover:text-teal-600"
                title="Copy ID"
                onClick={() => {
                  navigator.clipboard.writeText(data.tournid);
                  toast.success("Copied", { autoClose: 1000 });
                }}
              />
            </span>
            <span>{formattedDate}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-white uppercase">
              {data.type}
            </span>

            <span className="flex text-slate-800 items-center gap-1">
              <MdGroups className="text-lg" />
              {data.totalTeamsRegistered}/{data.slots}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="px-3 pb-3 flex items-center justify-between">
          <Button
            startIcon={<BsGearFill />}
            size="small"
            variant="contained"
            onClick={() => onManage(data)}
          >
            Manage
          </Button>

          <MdDelete
            title="Delete tournament"
            onClick={() => onDelete(data._id)}
            className="text-xl size-7 cursor-pointer hover:bg-red-200 rounded-full p-1 transition"
          />
        </div>
      </motion.div>
    </Badge>
  );
};

export default TournamentCard;
