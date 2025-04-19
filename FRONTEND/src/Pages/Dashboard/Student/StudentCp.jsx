import React from "react";
import img from "../../../assets/dashboard/urban-welcome.svg";
import useUser from "../../../Hooks/useUser";
import { Link } from "react-router-dom";

const studentNavItems = [
  {
    to: "/dashboard/student-cp",

    label: " Dashboard",
  },
  {
    to: "/dashboard/enrolled-classes",

    label: "My Enroll",
  },
  {
    to: "/dashboard/my-selected",

    label: "My Select",
  },
  {
    to: "/dashboard/my-payment",

    label: "Payment History",
  },
  {
    to: "/dashboard/apply-instructor",

    label: "Apply For Instructor",
  },
];
const StudentCp = () => {
  const { currentUser, isLoading } = useUser();
  return (
    <div className="flex items-center justify-center sm:h-screen ">
      <div>
        <div>
          <div>
            <img
              onContextMenu={e => e.preventDefault()}
              src={img}
              alt=""
              className="h-[200px] placeholder:blur mx-auto"
            />
            <h1 className="text-3xl font-bold capitalize">
              Hi,
              <span className="items-stretch text-secondary">
                {" "}
                {currentUser?.name}{" "}
              </span>
              Welcome to Your Dashboar
            </h1>
            <p className="mt-2 text-base text-center">
              Hey Dear, This is a simple dashboard home.our Devoloper is Trying
              to updating Dashboard
            </p>
            <div className="mt-2 text-center">
              {" "}
              <h2 className="font-bold">
                Yout jump nay page you want from here
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 my-4">
                {studentNavItems.map((menu, index) => {
                  return (
                    <div
                      className="px-2 py-1 duration-200 border rounded-lg border-secondary hover:bg-secondary hover:text-white"
                      key={index}
                    >
                      <Link to={menu.to}>{menu.label}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCp;
