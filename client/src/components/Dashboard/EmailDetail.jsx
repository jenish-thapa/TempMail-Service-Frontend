import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useGetEmailByID } from "../../api/email/queries";
import {
  useDeleteEmailByID,
  useToggleStarEmail,
} from "../../api/email/mutations";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function EmailDetail({ id }) {
  const [email, setEmail] = useState({});
  const navigate = useNavigate();
  const { data, isPending, error, isSuccess, refetch } = useGetEmailByID(id);
  const {
    mutate: toggleStarEmail,
    isSuccess: toggleSuccess,
    isPending: togglePending,
  } = useToggleStarEmail();

  const { mutate: deleteEmail } = useDeleteEmailByID();

  const [hasValidHTML, setHasValidHTML] = useState(true);

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const toggleFav = () => {
    toggleStarEmail({ id: email._id, username: email.receiver?.username });
  };

  const handleDeleteUser = () => {
    deleteEmail({ id: email._id, username: email.receiver?.username });
    navigate(`/mail/inbox`);
  };

  useEffect(() => {
    if (isSuccess && data?.data) {
      setEmail(data.data);
      setHasValidHTML(
        data.data.html &&
          data.data.html.trim() !== "" &&
          data.data.html !== "false"
      );
      console.log(hasValidHTML);

      console.log("Email updated:", data.data);
    }
  }, [data, isSuccess]);

  return (
    <div className="grow bg-[#202224] flex flex-col px-6">
      <div className="my-6 flex items-end justify-between">
        <h1
          className="text-center h-full text-white text-4xl font-nelPhim bg-clip-text text-transparent bg-gradient-to-r from-[#e89efc] to-[#6898f6]"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          MailDrop
        </h1>
      </div>
      <div className="grow flex flex-col bg-[#141516] rounded-tl-2xl rounded-tr-2xl overflow-hidden">
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
            onClick={() => navigate(`/mail/inbox`)}
          >
            <ArrowBackIosRoundedIcon className="text-white/80" />
          </Button>
        </div>
        <div className="grow flex flex-col gap-1 pt-5 pb-14 px-5 overflow-y-auto custom-scrollbar">
          <div className="pl-16 text-2xl mb-3 text-white">{email.subject}</div>
          <div className="flex items-center">
            <div className="w-11 h-11 flex items-center justify-center text-xl font-semibold text-white rounded-full bg-blue-500">
              {email.sender?.username ? email.sender.username[0] : null}
            </div>
            <div className="grow mx-5 flex justify-between items-center">
              <div>
                <p className="text-white/80 font-semibold">
                  {email.sender?.username}{" "}
                  <span className="text-white/50 text-sm font-normal">{`<${email.sender?.email}>`}</span>
                </p>
                <p className="text-white/80 font-semibold">
                  To{" "}
                  <span className="text-white/50 text-sm font-normal">{`<${email.receiver?.email}>`}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-white">{formatTime(email.receivedAt)}</div>
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
                      onClick={toggleFav}
                    />
                  ) : (
                    <StarOutlineRoundedIcon
                      className="text-white/50"
                      onClick={toggleFav}
                    />
                  )}
                </Button>
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
                  onClick={handleDeleteUser}
                >
                  <DeleteRoundedIcon className="hover:text-white text-white/60" />
                </Button>
              </div>
            </div>
          </div>
          <div className="email-body text-white p-4 bg-white/5 rounded-lg shadow-sm mt-2">
            {hasValidHTML ? (
              <div
                key={email.html}
                className="html-content"
                dangerouslySetInnerHTML={{ __html: email.html }}
              />
            ) : (
              <p className="text-content whitespace-pre-wrap font-sans">
                {email.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailDetail;
