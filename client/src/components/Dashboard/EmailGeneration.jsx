import React, { useEffect, useState } from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useGetRandomEmail } from "../../api/email/mutations";
import {
  useGetEmailsByUsername,
  useGetUnreadEmailsByUsername,
} from "../../api/email/queries";

const EmailGeneration = ({ isPending: emailFetchPending, refetch }) => {
  const [emails, setEmails] = useState(
    JSON.parse(localStorage.getItem("emails")) || []
  );
  
  const [activeEmailIndex, setActiveEmailIndex] = useState(
    parseInt(localStorage.getItem("index"), 10) || 0
  );
  const [activeEmail, setActiveEmail] = useState(
    emails[activeEmailIndex] || ""
  );

  const {
    mutate: generateEmail,
    isPending,
    error,
    isSuccess,
    data,
    reset,
  } = useGetRandomEmail();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(activeEmail)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy!");
      });
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleAddUser = () => {
    if (emails.length < 3) {
      generateEmail();
    } else {
      toast.error(
        <p className="text-center">
          Max limit of visible emails on your dashboard reached!
        </p>
      );
    }
  };

  const handleDeleteUser = () => {
    const storedEmails = JSON.parse(localStorage.getItem("emails")) || [];
    const indexToDelete = parseInt(localStorage.getItem("index"), 10);

    if (
      isNaN(indexToDelete) ||
      indexToDelete < 0 ||
      indexToDelete >= storedEmails.length
    ) {
      return;
    }

    let newIndex = indexToDelete;
    if (indexToDelete === storedEmails.length - 1) {
      newIndex = indexToDelete - 1;
    }

    storedEmails.splice(indexToDelete, 1);

    localStorage.setItem("emails", JSON.stringify(storedEmails));
    setEmails([...storedEmails]);

    setActiveEmail(storedEmails[newIndex] || "");
    localStorage.setItem(
      "username",
      storedEmails[newIndex].split("@")[0] || ""
    );

    setActiveEmailIndex(newIndex);
    localStorage.setItem("index", newIndex);

    toast.success("Email deleted successfuly!")
  };

  const toggleUser = (index) => {
    setActiveEmailIndex(index);
    setActiveEmail(emails[index]);
    localStorage.setItem("index", index);
    localStorage.setItem("username", emails[index].split("@")[0] || "");

    refetch();
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("index", 0);
      setActiveEmailIndex(0);

      setActiveEmail(data?.email);

      const storedEmails = JSON.parse(localStorage.getItem("emails")) || [];
      storedEmails.unshift(data.email);
      setEmails([...storedEmails]);
      localStorage.setItem("emails", JSON.stringify(storedEmails));

      localStorage.setItem("username", data?.username);

      reset();
    }
  }, [isSuccess, data]);

  return (
    <div className={`w-[27rem] h-full flex flex-col bg-[#141516] px-4 py-4`}>
      <div className="mt-12">
        <h1
          className="text-center text-white text-[1.7rem] font-proximaNova font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e89efc] to-[#6898f6]"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          Disposable. Secure. Anonymous.
        </h1>
        <div
          className="relative rounded-full mt-6 w-full text-white text-lg text-center flex items-center justify-center"
          style={{
            backgroundImage: "linear-gradient(90deg, #e89efc, #6898f6)",
            color: "transparent",
            backgroundClip: "border-box",
            padding: "0.07rem",
          }}
        >
          <div className="w-full h-full bg-[#282a2c] border border-white/30 rounded-full py-2 px-2 flex items-center justify-center">
            <p className="grow ml-3 text-white truncate">{activeEmail}</p>
            <Button
              variant="text"
              sx={{
                width: "3rem",
                height: "3rem",
                minWidth: "3rem",
                borderRadius: "50%",
                color: "rgba(255, 255, 255, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={copyToClipboard}
            >
              <ContentCopyRoundedIcon className="cursor-pointer" />
            </Button>
          </div>
        </div>
        <div className="text-white my-6">
          <div className="w-fit text-white/80 mx-auto">
            <p>🗑️ Temporary & disposable</p>
            <p>🥷 Secure & anonymous</p>
            <p>💸 Free to use</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-8">
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "rgba(255, 255, 255, 0.2)",
            padding: "5px 10px",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(129,135,247,1)",
              boxShadow: "3px 3px 5px rgba(54, 11, 11, 0.5)",
              transform: "translateY(-1px)",
            },
            fontFamily: "proximaNova",
            fontSize: "15px",
          }}
          onClick={handleRefresh}
        >
          <p className="mr-2">Refresh</p>
          <ReplayRoundedIcon
            className={`${emailFetchPending ? "animate-reverse-spin" : ""}`}
          />
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "rgba(255, 255, 255, 0.2)",
            padding: "5px 10px",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#63b043",
              boxShadow: "3px 3px 5px rgba(54, 11, 11, 0.5)",
              transform: "translateY(-1px)",
            },
            fontFamily: "proximaNova",
            fontSize: "15px",
          }}
          onClick={copyToClipboard}
        >
          <p className="mr-2">Copy</p>
          <ContentCopyRoundedIcon className="cursor-pointer" />
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "rgba(255, 255, 255, 0.2)",
            padding: "5px 10px",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#e04038",
              boxShadow: "3px 3px 5px rgba(54, 11, 11, 0.5)",
              transform: "translateY(-1px)",
            },
            fontFamily: "proximaNova",
            fontSize: "15px",
          }}
          onClick={handleDeleteUser}
        >
          <p className="mr-2">Delete</p>
          <DeleteRoundedIcon />
        </Button>
      </div>
      <div className="flex justify-between items-center mt-10 bg-white/10 px-4 py-2 rounded-tl-lg rounded-tr-lg">
        <div className="text-white font-proximaNova text-xl">Dashboard</div>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "rgba(255, 255, 255, 0.2)",
            padding: "5px 10px",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "",
              boxShadow: "3px 3px 5px rgba(54, 11, 11, 0.5)",
              transform: "translateY(-1px)",
            },
            fontFamily: "proximaNova",
            fontSize: "15px",
          }}
          onClick={handleAddUser}
        >
          <p className="mr-2">Add</p>
          <AddRoundedIcon className="cursor-pointer" />
        </Button>
      </div>
      <div className="grow flex flex-col gap-3 py-8 px-8 border-l border-r border-b rounded-bl-lg rounded-br-lg border-white/10 overflow-auto">
        {emails && emails.length > 0
          ? emails?.map((loggedInEmail, index) => (
              <DashboardEmail
                key={index}
                loggedInEmail={loggedInEmail}
                activeEmailIndex={activeEmailIndex}
                index={index}
                toggleUser={toggleUser}
              />
            ))
          : null}
      </div>
    </div>
  );
};

const DashboardEmail = ({
  loggedInEmail,
  activeEmailIndex,
  index,
  toggleUser,
}) => {
  const { data: unreadEmails } = useGetUnreadEmailsByUsername(
    loggedInEmail.split("@")[0] || ""
  );

  return (
    <div
      className={`relative py-2 px-4 rounded-full cursor-pointer
            ${
              activeEmailIndex === index
                ? "bg-[rgba(129,135,247,1)] text-white drop-shadow-[2px_2px_5px_rgba(0,0,0,0.2)]"
                : "hover:bg-[rgba(255,255,255,0.06)] text-white/80"
            }
            transition-all duration-400 ease-out`}
      key={index}
      onClick={() => toggleUser(index)}
    >
      <div
        className={`${
          activeEmailIndex === index ? "w-full pr-0" : "relative w-fit pr-4"
        } `}
      >
        {loggedInEmail}
        {unreadEmails?.data?.count > 0 ? (
          <div className="absolute w-2.5 h-2.5 bg-red-600 top-0 right-0 rounded-full">
            <div className="absolute w-2.5 h-2.5 bg-[#69e785a4] top-0 right-0 rounded-full animate-ping"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmailGeneration;
