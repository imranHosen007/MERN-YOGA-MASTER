import React from "react";
import useUser from "../../Hooks/useUser";
import { Navigate } from "react-router-dom";

const DashboardRoute = () => {
  const { currentUser, isLoading } = useUser();
  const role = currentUser?.role;
  if (role === "admin")
    return <Navigate to={"/dashboard/admin-home"} replace />;
  if (role === "instructor")
    return <Navigate to={"/dashboard/instructor-cp"} replace />;
  if (role === "user") return <Navigate to={"/dashboard/student-cp"} replace />;
};

export default DashboardRoute;
