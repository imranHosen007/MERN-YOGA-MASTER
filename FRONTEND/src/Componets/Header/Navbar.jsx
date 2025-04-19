import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { motion } from "framer-motion";
import PhotoUrl from "../../assets/home/usenot.webp";
import logo from "../../../public/img/yoga-logo.png";
import MobileMenu from "./MobileMenu";
import useUser from "../../Hooks/useUser";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

export const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructor", route: "/instructor" },
  { name: "classes", route: "/classes" },
];

const Navbar = () => {
  const { currentUser } = useUser();
  const { logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPostion, setScrollPostion] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  const [navBg, setNavbg] = useState("#15151580");

  const toggleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout Me!",
    }).then(result => {
      if (result.isConfirmed) {
        logout()
          .then(res => {
            Swal.fire({
              title: "Logout SuccesFull",

              icon: "success",
            });
          })
          .catch(error => console.log(`Log Out ${error}`));
      }
    });
  };
  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setScrollPostion(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (scrollPostion > 100) {
      if (isHome) {
        setNavbg(
          " backdrop-blur-xl backdrop-filter opacity-0 dark:text-white text-black"
        );
      } else {
        setNavbg("bg-white  dark:bg-black dark:text-white text-black");
      }
    } else {
      setNavbg(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black "
        } dark:text-white text-white`
      );
    }
  }, [scrollPostion]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        isHome ? navBg : "bg-white dark:bg-black text-black backdrop-blur-2xl"
      } ${
        isFixed ? "static" : "fixed"
      } top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:-w-[95%] mx-auto sm:px-6">
        <div className="flex items-center justify-between px-4 py-4">
          {/* ---Logo----- */}
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 text-black cursor-pointer dark:text-white pl-7 md:p-0 "
          >
            <h1 className="inline-flex items-center gap-3 text-2xl font-semibold">
              Yoga Master
              <img src={logo} className="w-8 h-8" />
            </h1>
            <p className="font-bold text-[13px] tracking-[8px]">
              Quick Explore
            </p>
          </div>
          {/* mobile-Menu-Link */}
          <div className="flex items-center gap-4 lg:hidden">
            <DarkMode />
            {isMobileMenu ? (
              <button
                onClick={toggleMobileMenu}
                className="transition-all cursor-pointer"
              >
                <HiMenuAlt3 className="w-6 h-6 hover:text-primary" />
              </button>
            ) : (
              <button
                onClick={toggleMobileMenu}
                className="transition-all cursor-pointer"
              >
                <HiMenuAlt1 className="w-6 h-6 hover:text-primary" />
              </button>
            )}
          </div>
          {/* ----Navigotonal-Link------ */}

          <div className="hidden text-black lg:block dark:text-white">
            <div>
              <ul className="flex items-center pr-4 ml-10 space-x-4">
                {navLinks.map((menu, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        style={{ whiteSpace: "nowrap" }}
                        to={menu.route}
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black dark:text-white"
                                }`
                          }`
                        }
                      >
                        {menu.name}
                      </NavLink>
                    </li>
                  );
                })}
                {!currentUser && (
                  <li>
                    <NavLink
                      to={"/login"}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                {currentUser && (
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}

                {currentUser && (
                  <li>
                    <img
                      src={currentUser?.photoUrl || PhotoUrl}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </li>
                )}
                {currentUser && (
                  <li
                    onClick={handleLogout}
                    className={`font-bold px-3 py-2 bg-secondary text-white rounded-xl`}
                  >
                    Logout
                  </li>
                )}
                {/* ----Color-Toggle---- */}
                <li>
                  {/* <ThemeProvider theme={theme}>
                    <div className="flex flex-col items-center justify-center">
                      <Switch onChange={() => setisDarkMode(!isDarkMode)} />
                      <h1 className="text-[8px]">light/dark</h1>
                    </div>
                  </ThemeProvider> */}
                  <DarkMode />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>{" "}
      <MobileMenu
        showMenu={isMobileMenu}
        setShowMenu={setIsMobileMenu}
        user={currentUser}
      />
    </motion.nav>
  );
};

export default Navbar;
