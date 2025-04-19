import React, { useRef } from "react";
import { navLinks } from "./Navbar";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import PhotoUrl from "../../assets/home/girl.jpg";

import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
const MobileMenu = ({ showMenu, setShowMenu, user }) => {
  const { logout } = useAuth();
  const menuRef = useRef(null);

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

  return (
    <div
      ref={menuRef}
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-50 h-screen w-[60%] bg-white dark:bg-black dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 rounded-r-xl shadow-md flex flex-col justify-between lg:hidden `}
    >
      <div>
        {user && (
          <div className="flex items-center justify-start gap-3">
            <img
              src={user?.photoUrl || PhotoUrl}
              className="w-[50px] h-[50px] rounded-full"
            />
            <div>
              <h1>{user?.username || " Imran hossain"}</h1>
            </div>
          </div>
        )}

        <nav className="mt-12">
          <ul className="space-y-4 text xl">
            {navLinks.map(item => {
              return (
                <li key={item.name}>
                  <NavLink
                    onClick={() => setShowMenu(false)}
                    to={item.route}
                    className={({ isActive }) =>
                      `font-bold ${isActive ? "text-secondary" : `'' `}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
            {!user && (
              <li>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    `font-bold ${isActive ? "text-secondary" : `'' `}`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive }) =>
                    `font-bold ${isActive ? "text-secondary" : `'' `}`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {user && (
              <li
                onClick={handleLogout}
                className={`font-bold px-3 py-2 bg-secondary inline-flex text-white rounded-xl`}
              >
                Logout
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
