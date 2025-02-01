import React from "react";
import SideBar from "../../components/Dashboard/SideBar";
import EmailGeneration from "../../components/Dashboard/EmailGeneration";
import toast, { Toaster } from "react-hot-toast";
import Inbox from "../../components/Dashboard/Inbox";

const Dashboard = () => {
  return (
    <div className="flex w-full h-full bg-[#1b1c1d]">
      <Toaster position="top-center" />

      <SideBar />
      <Inbox />
      <EmailGeneration />
    </div>
  );
};

export default Dashboard;
