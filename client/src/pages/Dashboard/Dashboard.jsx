import React, { useEffect, useState } from "react";
import SideBar from "../../components/Dashboard/SideBar";
import EmailGeneration from "../../components/Dashboard/EmailGeneration";
import toast, { Toaster } from "react-hot-toast";
import Inbox from "../../components/Dashboard/Inbox";
import {
  useGetEmailsByUsername,
  useGetStarredEmailsByUsername,
} from "../../api/email/queries";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const [activeBar, setActiveBar] = useState(
    parseInt(localStorage.getItem("activeTab"), 10) || 0
  );
  const [emails, setEmails] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    data: allEmailsData,
    isFetching: allEmailsPending,
    error: allEmailsError,
    isSuccess: allEmailsSuccess,
    refetch: refetchAllEmails,
  } = useGetEmailsByUsername(username);

  const {
    data: starredEmailsData,
    isFetching: starredEmailsPending,
    error: starredEmailsError,
    isSuccess: starredEmailsSuccess,
    refetch: refetchStarredEmails,
  } = useGetStarredEmailsByUsername(username);

  useEffect(() => {
    if (activeBar === 0) {
      setEmails(allEmailsData);
      setIsPending(allEmailsPending);
      setError(allEmailsError);
      setIsSuccess(allEmailsSuccess);
    } else {
      setEmails(starredEmailsData);
      setIsPending(starredEmailsPending);
      setError(starredEmailsError);
      setIsSuccess(starredEmailsSuccess);
    }
  }, [
    activeBar,
    allEmailsData,
    starredEmailsData,
    allEmailsPending,
    starredEmailsPending,
    allEmailsError,
    starredEmailsError,
  ]);

  return (
    <div className="flex w-full h-full bg-[#1b1c1d]">
      <Toaster position="top-center" />

      <SideBar activeBar={activeBar} setActiveBar={setActiveBar} />
      <Inbox
        data={emails}
        isPending={isPending}
        error={error}
        isSuccess={isSuccess}
        refetch={activeBar === 0 ? refetchAllEmails : refetchStarredEmails}
      />
      <EmailGeneration
        isPending={isPending}
        refetch={activeBar === 0 ? refetchAllEmails : refetchStarredEmails}
      />
    </div>
  );
};

export default Dashboard;
