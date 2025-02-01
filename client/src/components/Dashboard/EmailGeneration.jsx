import React, { useState } from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const loggedInEmails = ["spider@jrocks.tech", "batman@jrocks.tech"];

const EmailGeneration = () => {
  const [activeEmail, setActiveEmail] = useState(0);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy!");
      });
  };

  const toggleUser = (index) => {
    setActiveEmail(index);
  };

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
            <p className="grow ml-3 text-white truncate">
              {loggedInEmails[activeEmail]}
            </p>
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
          <div className="w-fit text-lg text-white font-proximaNova mx-auto">
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
              "& .rotate-icon": {
                animation: "spin 1s linear 1 reverse",
              },
            },
            fontFamily: "proximaNova",
            fontSize: "15px",
          }}
        >
          <p className="mr-2">Refresh</p>
          <ReplayRoundedIcon className="rotate-icon" />
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
        >
          <p className="mr-2">Delete</p>
          <DeleteRoundedIcon />
        </Button>
      </div>
      <div className="flex justify-end mt-10">
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
        >
          <p className="mr-2">Add</p>
          <AddRoundedIcon className="cursor-pointer" />
        </Button>
      </div>
      <div className="grow flex flex-col gap-3 py-8 px-8">
        {loggedInEmails.map((loggedInEmail, index) => (
          <div
            className={`py-2 px-4 rounded-full text-center cursor-pointer
            ${
              activeEmail === index
                ? "bg-[rgba(129,135,247,1)] text-white drop-shadow-[2px_2px_5px_rgba(0,0,0,0.2)]"
                : "hover:bg-[rgba(255,255,255,0.06)] text-white/80"
            }
            transition-all duration-400 ease-out`}
            key={index}
            onClick={() => toggleUser(index)}
          >
            {loggedInEmail}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailGeneration;
