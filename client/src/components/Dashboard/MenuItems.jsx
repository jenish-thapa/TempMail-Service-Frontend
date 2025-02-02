import React from "react";
import { useGetUnreadEmailsByUsername } from "../../api/email/queries";
import { useNavigate } from "react-router-dom";

const MenuItems = ({
  item,
  index,
  isCollapsed,
  setActiveBar,
  isActive,
  isMailDetails,
}) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const { data: unreadEmails } = useGetUnreadEmailsByUsername(username);

  return (
    <div
      className={`relative px-3 py-1.5 flex text-lg items-center cursor-pointer rounded-full ${
        isActive
          ? "bg-[rgba(129,135,247,1)] text-white drop-shadow-[2px_2px_5px_rgba(0,0,0,0.2)]"
          : "hover:bg-[rgba(255,255,255,0.06)] text-white/80"
      }
      transition-all duration-400 ease-out`}
      onClick={() => {
        localStorage.setItem("activeTab", index);
        if (isMailDetails) {
          navigate(`/mail/inbox`);
        } else {
          setActiveBar(index);
        }
      }}
    >
      <item.icon />
      {!isCollapsed ? (
        <div className="flex grow justify-between items-center">
          <p className="pl-5 select-none font-proximaNova">{item.label}</p>
          <p className="pr-1 text-base select-none">
            {item.label !== "Inbox"
              ? ""
              : unreadEmails?.data?.count > 0
              ? unreadEmails?.data?.count
              : ""}
          </p>
        </div>
      ) : null}
      {item.label === "Inbox" && unreadEmails?.data?.count > 0 ? (
        <div className="absolute w-2.5 h-2.5 bg-red-600 top-0 right-0 rounded-full">
          <div className="absolute w-2.5 h-2.5 bg-[#69e785a4] top-0 right-0 rounded-full animate-ping"></div>
        </div>
      ) : null}
    </div>
  );
};

export default MenuItems;
