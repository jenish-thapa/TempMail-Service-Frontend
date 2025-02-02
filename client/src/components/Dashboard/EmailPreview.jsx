import React, { useCallback, useEffect, useState } from "react";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { motion } from "framer-motion";
import {
  useDeleteEmailByID,
  useToggleStarEmail,
  useUpdateEmailStatus,
} from "../../api/email/mutations";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const EmailPreview = ({ email, index }) => {
  const navigate = useNavigate();
  const [showTime, setShowTime] = useState(true);

  const {
    mutate: toggleStarEmail,
    isSuccess,
    isPending,
  } = useToggleStarEmail();

  const { mutate: updateEmailStatus } = useUpdateEmailStatus();

  const { mutate: deleteEmail } = useDeleteEmailByID();

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, delay: index * 0.05 },
    },
  };

  const toggleFav = (e) => {
    e.stopPropagation();
    toggleStarEmail({ id: email._id, username: email.receiver?.username });
  };

  const handleDeleteUser = (e) => {
    e.stopPropagation();
    deleteEmail({ id: email._id, username: email.receiver?.username });
  };

  const handleClick = () => {
    if (email.status !== "opened") {
      updateEmailStatus({ id: email._id, username: email.receiver?.username });
    }
    navigate(`/mail/inbox/${email._id}`);
  };

  const handleMouseEnter = useCallback(
    _.debounce(() => {
      setShowTime(false);
    }, 200),
    []
  );

  const handleMouseLeave = useCallback(
    _.debounce(() => {
      setShowTime(true);
    }, 200),
    []
  );

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div
        className={`relative px-4 overflow-= py-[15px] border-b border-white/20 flex items-center cursor-pointer transition-all duration-100
        hover:translate-y-[-2px] hover:bg-[rgba(129,135,247,0.8)] hover:drop-shadow-[3px_3px_5px_rgba(255,255,255,0.4)]
     ${
       email.status === "received"
         ? "bg-[rgba(191,194,255,0.1)]"
         : "bg-[rgba(255,255,255,0.04)]"
     }`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <Button
            variant="text"
            sx={{
              width: "1.5rem",
              height: "1.5rem",
              minWidth: "1.5rem",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {email.isStarred ? (
              <StarRateRoundedIcon
                className="text-yellow-400"
                onClick={(e) => toggleFav(e)}
              />
            ) : (
              <StarOutlineRoundedIcon
                className="text-white/50"
                onClick={(e) => toggleFav(e)}
              />
            )}
          </Button>
        </div>
        <div
          className={`text-white pl-4 min-w-[12rem] max-w-[12rem] truncate ${
            email.status === "received" ? "font-semibold" : "text-white/60"
          }`}
        >
          {email.sender?.username}
        </div>
        <div className="grow flex truncate line-clamp-1">
          <div
            className={`text-white pl-4 ${
              email.status === "received" ? "font-semibold" : "text-white/60"
            }`}
          >
            {email.subject}
          </div>
          <div className="px-4 text-white/60">-</div>
          <div className={`text-white/60 truncate`}>{email.text}</div>
        </div>
        <div
          className={`text-white text-sm pl-4 min-w-[5rem] max-w-[5rem] ${
            email.status === "received" ? "font-semibold" : "text-white/60"
          }`}
        >
          <div
            className={`absolute flex justify-center bottom-[16px] items-center ${
              showTime ? "right-4" : "-right-20"
            } min-w-[5rem] max-w-[5rem] transition-all duration-300 ease-out`}
          >
            {formatTime(email.receivedAt)}
          </div>
        </div>
        <div
          className={`absolute flex justify-center bottom-[16px] items-center ${
            showTime ? "-right-20" : "right-4"
          } right-4 min-w-[5rem] max-w-[5rem] transition-all duration-700 ease-out`}
        >
          <Button
            variant="text"
            sx={{
              width: "2rem",
              height: "2rem",
              minWidth: "2rem",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            onClick={(e) => handleDeleteUser(e)}
          >
            <DeleteRoundedIcon className="hover:text-white text-white/60" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailPreview;
