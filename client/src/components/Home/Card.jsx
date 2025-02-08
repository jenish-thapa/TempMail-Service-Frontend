import { Button } from "@mui/material";
import React from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-[24px] grow text-white text-lg text-center flex items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(90deg, #e89efc, #6898f6)",
        color: "transparent",
        backgroundClip: "border-box",
        padding: "0.07rem",
      }}
    >
      <div className="relative w-full h-full bg-[#282a2c] rounded-[24px] overflow-hidden">
        <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_center,transparent_5%,rgba(24,24,24,1)_100%)] z-0"></div>
        <div className="relative flex flex-col gap-6 h-full z-10 pl-6 pr-8 py-4 text-left">
          <h3 className="text-white text-xl font-bold">{item.heading}</h3>
          <p className="text-white text-base">{item.body}</p>
          <div className="grow flex items-end">
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
                  padding: "10px 26px",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "white",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => navigate(`/mail/inbox/`)}
              >
                {item.btn}
                <ArrowForwardIosRoundedIcon
                  className="ml-2 animate-slideAndFade"
                  style={{ fontSize: "24px" }}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
