import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EmailDetail from "../../components/Dashboard/EmailDetail";
import { Toaster } from "react-hot-toast";
import SideBar from "../../components/Dashboard/SideBar";
import EmailGeneration from "../../components/Dashboard/EmailGeneration";

const EmailDetails = () => {
  const { id } = useParams();
  const [activeBar, setActiveBar] = useState(
    parseInt(localStorage.getItem("activeTab"), 10) || 0
  );

  return (
    <div className="flex w-full h-full bg-[#1b1c1d]">
      <Toaster position="top-center" />

      <SideBar
        activeBar={activeBar}
        setActiveBar={setActiveBar}
        isMailDetails={true}
      />
      <EmailDetail id={id} />
    </div>
  );
};

export default EmailDetails;
