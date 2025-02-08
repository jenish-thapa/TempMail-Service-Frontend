import { Button } from "@mui/material";
import React from "react";
import Star from "../../assets/star.png";
import { cards } from "../../constants/cards";
import Card from "./Card";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-end">
          <img className="w-12" src={Logo} alt="Logo" />
          <h1 className="text-center h-full text-white text-4xl font-nelPhim">
            MailDrop
          </h1>
        </div>
        <div
          className="relative rounded-full w-fit text-white text-lg text-center flex items-center justify-center"
          style={{
            backgroundImage: "linear-gradient(90deg, #e89efc, #6898f6)",
            color: "transparent",
            backgroundClip: "border-box",
            padding: "0.07rem",
          }}
        >
          <Button
            variant="text"
            sx={{
              bgcolor: "#282a2c",
              borderRadius: "9999px",
              padding: "8px 26px",
              textTransform: "none",
              fontSize: "1rem",
              color: "white",
              transition: "all 0.3s ease-in-out",
              fontFamily: "proximaNova",
            }}
            onClick={() => navigate(`/mail/inbox`)}
          >
            Try MailDrop
          </Button>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center justify-between">
        <h2 className="font-nelPhim italic text-[3.5rem] text-white">
          unlock privacy
        </h2>
        <h1
          className="text-center h-full text-white text-6xl font-proximaNova font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e89efc] to-[#6898f6]"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          Empower Your Inbox
        </h1>
        <div className="my-8 flex w-full items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          <div className="min-w-[4rem] w-full max-w-[20rem] h-[1px] bg-white"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        </div>
        <p className="text-white/50 max-w-[40rem] text-center">
          Where Every Email Protects Your Identity, Shields You from Spam, and
          Unlocks the Power of Secure Communication!
        </p>
        <div className="mt-10 flex gap-6">
          <div
            className="relative rounded-full w-fit text-white text-lg text-center flex items-center justify-center"
            style={{
              backgroundImage: "linear-gradient(90deg, #e89efc, #6898f6)",
              color: "transparent",
              backgroundClip: "border-box",
              padding: "0.07rem",
            }}
          >
            <Button
              variant="text"
              sx={{
                borderRadius: "9999px",
                padding: "8px 26px",
                textTransform: "none",
                fontSize: "1rem",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease-in-out",
                fontFamily: "proximaNova",
              }}
              onClick={() => navigate(`/mail/inbox/`)}
            >
              Try MailDrop
            </Button>
          </div>
          <div
            className="relative rounded-full w-fit text-white text-lg text-center flex items-center justify-center"
            style={{
              backgroundImage: "linear-gradient(90deg, #e89efc, #6898f6)",
              color: "transparent",
              backgroundClip: "border-box",
              padding: "0.07rem",
            }}
          >
            <Button
              variant="text"
              sx={{
                bgcolor: "#282a2c",
                borderRadius: "9999px",
                padding: "8px 26px",
                textTransform: "none",
                fontSize: "1rem",
                color: "white",
                transition: "all 0.3s ease-in-out",
                fontFamily: "proximaNova",
              }}
              onClick={() => navigate(`/mail/inbox/`)}
            >
              Go To Inbox{" "}
              <EmailRoundedIcon
                className="animate-shakeRotate ml-4"
                style={{ fontSize: "24px" }}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="grow pt-10 flex flex-col">
        <h2 className="text-white relative w-fit text-3xl font-nelPhim italic">
          What TempMail offers
          <img
            className="w-8 absolute -top-6 -right-12"
            src={Star}
            alt="star"
          />
        </h2>
        <div className="grow flex gap-6 mt-6">
          {cards.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
