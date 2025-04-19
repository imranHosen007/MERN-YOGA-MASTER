import React from "react";
import useUser from "../../Hooks/useUser";
import { HashLoader } from "react-spinners";
import DashboardRoute from "../Routes/DashboardRoute";
const Dashboard = () => {
  const { currentUser, isLoading } = useUser();
  const role = currentUser?.role;
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <HashLoader color="#36d7d7" size={50} />
      </div>
    );
  }
  return (
    <div>
      <DashboardRoute />
    </div>
  );
};

export default Dashboard;
