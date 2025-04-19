import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaChalkboardTeacher, FaRegCopy, FaUsers } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { HashLoader } from "react-spinners";
const AdminStats = ({ users }) => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState();
  const [loading, setLaoding] = useState(true);

  // ----Admin-Stats-Data-Feching-------
  useEffect(() => {
    axiosSecure
      .get(`admin-stats`)
      .then((res) => {
        setData(res.data);
        setLaoding(false);
      })
      .catch((error) => console.log(`Admin-Stats Get ${error}`));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#36d7d7" size={50} />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 lg:grid-cols-4 sm:px-8">
        <div className="flex items-center gap-2 overflow-hidden bg-white border rounded-md shadow">
          <div className="p-4 bg-green-400">
            <FaUsers className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-sm tracking-wider">Total Member</h3>
            <p className="text-3xl">{users.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-hidden bg-white border rounded-md shadow">
          <div className="p-4 bg-blue-400">
            {" "}
            <FaRegCopy className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-sm tracking-wider">Approved Classes</h3>
            <p className="text-3xl">{data?.approvedClasses}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-hidden bg-white border rounded-md shadow">
          <div className="p-4 bg-indigo-400">
            <FaChalkboardTeacher className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-sm tracking-wider">Instructors</h3>
            <p className="text-3xl">{data?.instructors}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-hidden bg-white border rounded-md shadow">
          <div className="p-4 bg-red-400">
            <MdPendingActions className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-sm tracking-wider">Pending Classes</h3>
            <p className="text-3xl">{data?.pendingClasses}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
