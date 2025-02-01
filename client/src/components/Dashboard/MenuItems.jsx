import React from "react";

const MenuItems = ({
  item,
  index,
  isCollapsed,
  setSelectedMenu,
  isActive,
  number,
}) => {
  return (
    <div
      className={`relative px-3 py-1.5 flex text-lg font-proximaNova items-center cursor-pointer rounded-full ${
        isActive
          ? "bg-[rgba(129,135,247,1)] text-white drop-shadow-[2px_2px_5px_rgba(0,0,0,0.2)]"
          : "hover:bg-[rgba(255,255,255,0.06)] text-white/80"
      }
      transition-all duration-400 ease-out`}
      onClick={() => setSelectedMenu(index)}
    >
      <item.icon />
      {!isCollapsed ? (
        <div className="flex grow justify-between items-center">
          <p className="pl-5 select-none">{item.label}</p>
          <p className="select-none">{number}</p>
        </div>
      ) : (
        number && (
          <div className="absolute w-2.5 h-2.5 bg-red-600 top-0 right-0 rounded-full">
            <div className="absolute w-2.5 h-2.5 bg-[#69e785a4] top-0 right-0 rounded-full animate-ping"></div>
          </div>
        )
      )}
    </div>
  );
};

export default MenuItems;
