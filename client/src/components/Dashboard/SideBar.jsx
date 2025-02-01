import React, { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button } from "@mui/material";
import { sidebar, sidebarFooter } from "../../constants/sideBarConstants";
import MenuItems from "./MenuItems";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width, setWidth] = useState("w-[20rem]");
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleDrawer = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (isCollapsed) {
      setWidth("w-[5rem]");
    } else {
      setWidth("w-[17rem]");
    }
  }, [isCollapsed]);

  return (
    <div
      className={`${width} h-full flex flex-col bg-[#141516] px-4 py-4 transition-all duration-300 ease-out`}
    >
      <div>
        <Button
          variant="text"
          sx={{
            width: "3rem",
            height: "3rem",
            minWidth: "3rem",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
          onClick={handleDrawer}
        >
          <MenuRoundedIcon className="text-white/60" />
        </Button>
      </div>
      <div className="my-20 grow flex flex-col gap-2">
        {sidebar.map((item, index) => {
          return (
            <MenuItems
              key={index}
              item={item}
              index={index}
              isCollapsed={isCollapsed}
              setSelectedMenu={setSelectedMenu}
              isActive={selectedMenu === index}
              number={index === 0 && "1,200"}
            />
          );
        })}
      </div>
      <div className="mb-8">
        {sidebarFooter.map((item, index) => {
          return (
            <MenuItems
              key={index}
              item={item}
              index={index}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
