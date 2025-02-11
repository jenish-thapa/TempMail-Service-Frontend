import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { Button, CircularProgress } from "@mui/material";
import { emails as dummyEmails } from "../../constants/dummyEmails";
import EmailPreview from "./EmailPreview";
import { useGetEmailsByUsername } from "../../api/email/queries";
import NoInbox from "../../assets/message.png";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Inbox = ({ data, isPending, error, isSuccess, refetch }) => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [timer, setTimer] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRefresh = () => {
    refetch();
    setTimer(20);
  };

  const filteredEmails = useMemo(() => {
    if (!emails) return [];

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return emails.filter((email) => {
      const senderUsername = email.sender?.username?.toLowerCase() || "";
      const subject = email.subject?.toLowerCase() || "";
      const text = email.text?.toLowerCase() || "";

      return (
        senderUsername.includes(lowerCaseSearchTerm) ||
        subject.includes(lowerCaseSearchTerm) ||
        text.includes(lowerCaseSearchTerm)
      );
    });
  }, [emails, searchTerm]);

  useEffect(() => {
    if (isSuccess) {
      setEmails(data?.data?.emails || []);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          refetch();
          return 20;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div
      className="grow bg-[#202224] flex flex-col px-6"
      style={{ width: "calc(100% - 50rem)" }}
    >
      <div className="my-6 flex items-end justify-between">
        <div
          className="flex gap-4 items-end cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="w-10" src={Logo} alt="Logo" />
          <h1 className="text-center h-full text-white text-3xl font-nelPhim">
            MailDrop
          </h1>
        </div>
        <div className="flex items-end gap-2 min-w-[50%]">
          <div className="mt-4 grow flex items-center bg-transparent border border-white/40 rounded-full shadow-md px-4 py-2">
            <SearchRoundedIcon className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Mail"
              className="w-full outline-none text-white/70 bg-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <div className="relative grow bg-[#141516] rounded-tl-2xl rounded-tr-2xl overflow-hidden">
        <div className="py-2 px-2 border-b border-white/20">
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
            className={isPending ? "animate-reverse-spin" : ""}
            onClick={handleRefresh}
          >
            <ReplayRoundedIcon className="text-white/80" />
          </Button>
          <span className="text-sm text-gray-500">
            Auto-refreshing in {timer} seconds
          </span>
        </div>

        {isPending && (
          <div className="absolute inset-0 flex justify-center items-center">
            <CircularProgress
              sx={{
                color: "rgba(129,135,247,1)",
                width: "3.5rem !important",
                height: "3.5rem !important",
              }}
            />
          </div>
        )}

        {!isPending && (
          <>
            {filteredEmails && filteredEmails.length > 0 ? (
              filteredEmails.map((email, index) => (
                <EmailPreview key={index} email={email} index={index} />
              ))
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <img className="w-[40%]" src={NoInbox} alt="No Inbox" />
                <p className="text-white/50 font-bold font-proximaNova text-3xl mt-4">
                  Your inbox is currently empty.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;
