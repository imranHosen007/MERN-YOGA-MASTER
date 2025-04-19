import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import useUser from "../../../Hooks/useUser";
import AdminStats from "../../../Componets/AdminStats/AdminStats";
import { HashLoader } from "react-spinners";

const AdminCp = () => {
  const [users, setUsers] = useState([]);
  const { currentUser, isLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  // ----Uers-Data-Fetching-----
  useEffect(() => {
    axiosFetch
      .get(`user`)
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(`Users Fetching ${error}`);
      });
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
      <div>
        <h1 className="text-4xl font-bold text-center my-7">
          Welcome Back{" "}
          <span className="text-secondary">{currentUser?.name}</span>
        </h1>
        <AdminStats users={users} />
      </div>
    </div>
  );
};

export default AdminCp;
