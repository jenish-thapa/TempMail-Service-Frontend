import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { Button } from "@mui/material";

import { emails } from "../../constants/dummyEmails";
import EmailPreview from "./EmailPreview";

const Inbox = () => {
  return (
    <div className="grow bg-[#202224] flex flex-col px-6">
      <div className="my-6 flex items-end justify-between">
        <h1
          className="text-center h-full text-white text-4xl font-nelPhim bg-clip-text text-transparent bg-gradient-to-r from-[#e89efc] to-[#6898f6]"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          MailDrop
        </h1>
        <div className="flex items-end gap-2 min-w-[50%]">
          <div className="mt-4 grow flex items-center bg-transparent border border-white/40 rounded-full shadow-md px-4 py-2">
            <SearchRoundedIcon className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Mail"
              className="w-full outline-none text-white/70 bg-transparent"
            />
          </div>
        </div>
      </div>
      <div className="grow bg-[#141516] rounded-tl-2xl rounded-tr-2xl overflow-hidden">
        <div className="py-2 px-2">
          <Button
            variant="text"
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              minWidth: "2.5rem",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            className="hover:animate-reverse-spin"
          >
            <ReplayRoundedIcon className="text-white/80" />
          </Button>
        </div>
        {emails.map((email, index) => (
          <EmailPreview key={index} email={email} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Inbox;
