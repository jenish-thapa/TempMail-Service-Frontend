import React, { useState } from "react";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { motion } from "framer-motion";

const EmailPreview = ({ email, index }) => {
  const [isFav, setIsFav] = useState(email.isfav);

  const toggleFav = () => {
    setIsFav((prev) => !prev);
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

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div
        className={`px-4 py-[15px] border-b border-white/20 flex items-center cursor-pointer transition-all duration-100
        hover:translate-y-[-2px] hover:bg-[rgba(129,135,247,0.8)] hover:drop-shadow-[3px_3px_5px_rgba(255,255,255,0.4)]
     ${
       email.status === "received"
         ? "bg-[rgba(191,194,255,0.1)]"
         : "bg-[rgba(255,255,255,0.04)]"
     }`}
      >
        <div>
          {isFav ? (
            <StarRateRoundedIcon
              className="text-yellow-400"
              onClick={toggleFav}
            />
          ) : (
            <StarOutlineRoundedIcon
              className="text-white/50"
              onClick={toggleFav}
            />
          )}
        </div>
        <div
          className={`text-white pl-4 w-[13%] max-w-[13%] truncate ${
            email.status === "received" ? "font-semibold" : "text-white/60"
          }`}
        >
          {email.sender_username}
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
          <div className={`text-white/60 truncate`}>{email.body}</div>
        </div>
        <div
          className={`text-white text-sm pl-4 w-[5rem] ${
            email.status === "received" ? "font-semibold" : "text-white/60"
          }`}
        >
          {email.time}
        </div>
      </div>
    </motion.div>
  );
};

export default EmailPreview;
