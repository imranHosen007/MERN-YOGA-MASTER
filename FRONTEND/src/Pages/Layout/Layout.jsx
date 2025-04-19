import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Componets/Header/Navbar";
import Footer from "../../Componets/Footer/Footer";

export const Layout = () => {
  return (
    <div className="dark:bg-black overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
