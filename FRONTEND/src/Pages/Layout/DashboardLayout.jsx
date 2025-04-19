import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";
import logo from "../../../public/img/yoga-logo.png";
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import { TbBrandAppleArcade } from "react-icons/tb";
import {
  MdExplore,
  MdOfflineBolt,
  MdPayment,
  MdPayments,
  MdPendingActions,
} from "react-icons/md";
import { HashLoader } from "react-spinners";
import { GiFigurehead } from "react-icons/gi";
import { IoScaleSharp, IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Scroll from "../../Hooks/useScroll";

const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard Home",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUsers className="text-2xl" />,
    label: "Manage Users",
  },
  {
    to: "/dashboard/manage-classses",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "Manage Classes",
  },
  {
    to: "/dashboard/manage-application",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Applications",
  },
];

const lastNavItems = [
  { to: "/", icon: <BiHomeAlt className="text-2xl" />, label: "Main Home" },
  {
    to: "/trending",
    icon: <MdOfflineBolt className="text-2xl" />,
    label: "Trending",
  },
  {
    to: "/browse",
    icon: <GiFigurehead className="text-2xl" />,
    label: "Following",
  },
];
const instructorNavItem = [
  {
    to: "/dashboard/instructor-cp",
    icon: <FaHome className="text-2xl" />,
    label: " Home",
  },
  {
    to: "/dashboard/add-classes",
    icon: <MdExplore className="text-2xl" />,
    label: "Add A Class",
  },
  {
    to: "/dashboard/my-classes",
    icon: <IoSchoolSharp className="text-2xl" />,
    label: "My Classes",
  },
  // {
  //   to: "/dashboard/my-pending",
  //   icon: <MdPendingActions className="text-2xl" />,
  //   label: "Pending Classes",
  // },
  // {
  //   to: "/dashboard/my-approved",
  //   icon: <IoMdDoneAll className="text-2xl" />,
  //   label: "Approved Classes",
  // },
];
const studentNavItems = [
  {
    to: "/dashboard/student-cp",
    icon: <BiHomeAlt className="text-2xl" />,
    label: " Dashboard",
  },
  {
    to: "/dashboard/enrolled-classes",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "My Enroll",
  },
  {
    to: "/dashboard/my-selected",
    icon: <BiSelectMultiple className="text-2xl" />,
    label: "My Select",
  },
  {
    to: "/dashboard/my-payment",
    icon: <MdPayments className="text-2xl" />,
    label: "Payment History",
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <SiInstructure className="text-2xl" />,
    label: "Apply For Instructor",
  },
];
const DashboardLayout = () => {
  const { logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <HashLoader color="#36d7d7" size={50} />
      </div>
    );
  }

  const hadnleLougout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
              title: "Logout!",
              text: "Logout SuccesFull",
              icon: "success",
            });
            navigate("/");
          })
          .catch(error => console.log(`Log Out ${error}`));
      }
    });

    logout()
      .then(res => {
        console.log(`Logout SuccesFull`);
      })
      .catch(error => console.log(`Log Out ${error}`));
  };
  return (
    <div className="flex">
      <div
        className={`
          
      ${
        open ? "md:w-72 w-[80px] " : "w-[90px]   "
      }   bg-white  p-4 mt-10 md:mt-0 pt-8 relative duration-200
        `}
      >
        <div className="items-center hidden md:flex gap-x-4">
          <img
            onClick={() => setOpen(!open)}
            src={logo}
            alt=""
            className={`cursor-pointer h-[40px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <Link to={"/"}>
            {" "}
            <h1
              onClick={() => setOpen(!open)}
              className={`text-dark-primary cursor-pointer font-bold text-xl origin-left duration-200 ${
                !open && "scale-0"
              }`}
            >
              Yoga Master
            </h1>
          </Link>
        </div>

        <img
          src={logo}
          alt=""
          className={`cursor-pointer  h-[40px] duration-500 md:hidden`}
        />

        {/* ------NavLinks----- */}
        {/* -----Admin-role----- */}
        {role === "admin" && (
          <ul>
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small>Menu</small>
            </p>
            {role === "admin" &&
              adminNavItems.map((menu, index) => {
                return (
                  <li key={index} className="mb-2">
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) =>
                        `flex md:hidden rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 ${
                          isActive ? "bg-red-500 text-white" : "text-[#413f44]"
                        }`
                      }
                    >
                      {menu.icon}
                    </NavLink>
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) =>
                        `md:flex hidden rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 ${
                          isActive ? "bg-red-500 text-white" : "text-[#413f44]"
                        }`
                      }
                    >
                      {menu.icon}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {menu.label}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        )}
        {/* --------instructor-role----- */}
        {role === "instructor" && (
          <ul>
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small>Menu</small>
            </p>
            {role === "instructor" &&
              instructorNavItem.map((menu, index) => {
                return (
                  <li key={index} className="mb-2">
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) =>
                        `flex md:hidden rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 ${
                          isActive ? "bg-red-500 text-white" : "text-[#413f44]"
                        }`
                      }
                    >
                      {menu.icon}
                    </NavLink>
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) =>
                        `md:flex hidden rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 ${
                          isActive ? "bg-red-500 text-white" : "text-[#413f44]"
                        }`
                      }
                    >
                      {menu.icon}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {menu.label}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        )}
        {/* -------Students-Role----- */}
        {role === "user" && (
          <ul>
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small>Menu</small>
            </p>
            {role === "user" &&
              studentNavItems.map((menu, index) => {
                return (
                  <li key={index} className="mb-2">
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) =>
                        `flex md:hidden rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 ${
                          isActive ? "bg-red-500 text-white" : "text-[#413f44]"
                        }`
                      }
                    >
                      {menu.icon}
                    </NavLink>
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) =>
                        `md:flex hidden rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 ${
                          isActive ? "bg-red-500 text-white" : "text-[#413f44]"
                        }`
                      }
                    >
                      {menu.icon}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {menu.label}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        )}
        {/* ------Userfull-Liks---- */}
        <ul className="pt-6">
          <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
            <small>UseFull Links</small>
          </p>
          {lastNavItems.map((menu, index) => {
            return (
              <li key={index} className="mb-2">
                <NavLink
                  to={menu.to}
                  className={({ isActive }) =>
                    `md:flex hidden  rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 ${
                      isActive ? "bg-red-500 text-white" : "text-[#413f44]"
                    }`
                  }
                >
                  {menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.label}
                  </span>
                </NavLink>
                <NavLink
                  to={menu.to}
                  className={({ isActive }) =>
                    `flex md:hidden rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 ${
                      isActive ? "bg-red-500 text-white" : "text-[#413f44]"
                    }`
                  }
                >
                  {menu.icon}
                </NavLink>
              </li>
            );
          })}
          <li>
            <button
              onClick={hadnleLougout}
              className={`md:flex hidden w-full rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 `}
            >
              <BiLogInCircle className="text-2xl" />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                LogOut
              </span>
            </button>
            <button
              onClick={hadnleLougout}
              className={`flex md:hidden w-full rounded-md p-2 cursor-pointer duration-150 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 `}
            >
              <BiLogInCircle className="text-2xl" />
            </button>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
