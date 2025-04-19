import React, { useEffect, useState } from "react";
import useUser from "../../../Hooks/useUser";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import { FiBriefcase, FiMail, FiSend, FiUser } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";
const InstructorApply = () => {
  const { currentUser } = useUser();
  const [submitData, setSubmitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get(`/applied/${currentUser?.email}`)
      .then((res) => {
        setLoading(false);
        setSubmitData(res.data);
      })
      .then((error) => {
        console.log(`Applied Instructor Find ${error}`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#36d7d7" size={50} />
      </div>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const exprience = e.target.exprience.value;
    const data = { name, email, exprience };
    axiosFetch
      .post(`/applied`, data)
      .then((res) => {
        toast.success(`SuccesFully Applied`);
      })
      .catch((error) => console.log(`Applied Post ${error}`));
  };
  return (
    <div className="my-20">
      <div>
        {!submitData && (
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col w-full sm:flex-row">
                <div className="w-full mb-4">
                  <label className="text-gray-700" htmlFor="name">
                    Name
                  </label>
                  <div className="flex items-center ml-1">
                    <FiUser className="text-gray-700" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={currentUser?.name}
                      readOnly
                      disabled
                      className="w-full ml-2 border-b border-gray-300 outline-none focus:border-secondary"
                    />
                  </div>
                </div>
                <div className="w-full mb-4">
                  <label className="text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <div className="flex items-center ml-1">
                    <FiMail className="text-gray-700" />
                    <input
                      type="text"
                      name="email"
                      id="email"
                      defaultValue={currentUser?.email}
                      readOnly
                      disabled
                      className="w-full ml-2 border-b border-gray-300 outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mb-2">
                <label className="text-gray-700" htmlFor=" exprience">
                  Exprience
                </label>
                <div className="flex items-center ml-1">
                  <FiBriefcase className="text-gray-700" />

                  <textarea
                    placeholder="Tell About Your Exprience......."
                    type="text"
                    name="exprience"
                    id="exprience"
                    className="w-full p-2 ml-2 border border-gray-300 rounded-lg outline-none resize-none placehoder:text-sm focus:border-secondary"
                  />
                </div>
              </div>
              <div className="flex justify-center w-full text-center">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 text-white rounded-md bg-secondary focus:outline"
                >
                  <FiSend className="mr-2" />
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
      {submitData && <p>Already Applied Please Wait For Approved</p>}
    </div>
  );
};

export default InstructorApply;
