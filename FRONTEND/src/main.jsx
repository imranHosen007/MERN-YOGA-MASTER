import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Pages/Layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";
import Classes from "./Pages/Classes/Classes.jsx";
import Instructor from "./Pages/Instructor/Instructor.jsx";
// -----React-TanStack-----
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Context/AuthProvider.jsx";
import Login from "./Pages/User/Login.jsx";
import Register from "./Pages/User/Register.jsx";
import SingleClasses from "./Pages/Classes/SingleClasses.jsx";
import DashboardLayout from "./Pages/Layout/DashboardLayout.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import StudentCp from "./Pages/Dashboard/Student/StudentCp.jsx";
import EnrollClasses from "./Pages/Dashboard/Student/EnrollClasses.jsx";
import SelectedClasses from "./Pages/Dashboard/Student/SelectedClasses.jsx";
import InstructorApply from "./Pages/Dashboard/Student/InstructorApply.jsx";
import PaymentHistory from "./Pages/Dashboard/Student/PaymentHistory.jsx";
import Payment from "./Componets/Payment/Payment.jsx";
import InstructorCp from "./Pages/Dashboard/Instructor/InstructorCp.jsx";
import AddClasses from "./Pages/Dashboard/Instructor/AddClasses.jsx";
import MyClasses from "./Pages/Dashboard/Instructor/MyClasses.jsx";
import PendingClasses from "./Pages/Dashboard/Instructor/PendingClasses.jsx";
import ApprovedClasses from "./Pages/Dashboard/Instructor/ApprovedClasses.jsx";
import UpdateClasses from "./Pages/Dashboard/Instructor/UpdateClasses.jsx";
import AdminCp from "./Pages/Dashboard/Admin/AdminCp.jsx";
import ManageUsers from "./Pages/Dashboard/Admin/ManageUsers.jsx";
import ManageClasses from "./Pages/Dashboard/Admin/ManageClasses.jsx";
import Application from "./Pages/Dashboard/Admin/Application.jsx";
import UpdateUser from "./Pages/Dashboard/Admin/UpdateUser.jsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/classes", element: <Classes /> },
      { path: "/instructor", element: <Instructor /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/classes/:id",
        element: <SingleClasses />,
        loader: ({ params }) =>
          fetch(`https://mern-yoga-master.onrender.com/classes/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,

        element: <Dashboard />,
      },
      {
        path: "student-cp",
        element: <StudentCp />,
      },
      {
        path: "instructor-cp",
        element: <InstructorCp />,
      },
      {
        path: "admin-home",
        element: <AdminCp />,
      },
      {
        path: "enrolled-classes",
        element: <EnrollClasses />,
      },
      {
        path: "my-selected",
        element: <SelectedClasses />,
      },
      {
        path: "my-payment",
        element: <PaymentHistory />,
      },
      {
        path: "apply-instructor",
        element: <InstructorApply />,
      },
      {
        path: "user/payment",
        element: <Payment />,
      },
      // ------Instructor-Routes-------
      {
        path: "add-classes",
        element: <AddClasses />,
      },
      {
        path: "my-classes",
        element: <MyClasses />,
      },
      {
        path: "my-pending",
        element: <PendingClasses />,
      },
      {
        path: "my-approved",
        element: <ApprovedClasses />,
      },
      {
        path: "update/:id",
        element: <UpdateClasses />,
        loader: ({ params }) =>
          fetch(`https://mern-yoga-master.onrender.com/classes/${params.id}`),
      },
      // -------Admin-Routes------
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-classses",
        element: <ManageClasses />,
      },
      {
        path: "manage-application",
        element: <Application />,
      },
      {
        path: "update-user/:id",
        element: <UpdateUser />,
        loader: ({ params }) =>
          fetch(`https://mern-yoga-master.onrender.com/user/${params.id}`),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </AuthProvider>
);
