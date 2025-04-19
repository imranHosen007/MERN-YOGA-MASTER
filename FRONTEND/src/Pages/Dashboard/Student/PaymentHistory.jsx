import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import moment from "moment";
import { HashLoader } from "react-spinners";

const PaymentHistory = () => {
  const { currentUser, isLoading } = useUser();
  const axiosFetch = useAxiosFetch();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalItems = payments.length;
  const [page, setPage] = useState(1);
  let itemsPerPage = 5;
  let totalPage = Math.ceil(totalItems / itemsPerPage);
  const newTotalPage = [];

  for (let i = 1; i <= totalPage; i++) {
    newTotalPage.push(i);
  }

  const totalPaidAmmout = payments.reduce(
    (acc, curr) => acc + parseFloat(curr.price),
    0
  );

  // --------Pagination-------
  const lastIndex = itemsPerPage * page;

  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = payments.slice(firstIndex, lastIndex);

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleChange = (value) => {
    setPage(value);
  };

  useEffect(() => {
    axiosFetch
      .get(`/payment/${currentUser?.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
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
      <div className="mt-6 text-center mb-14">
        <p className="text-gray-400">
          Hey{" "}
          <span className="font-bold text-secondary">
            {currentUser?.displayName}
          </span>{" "}
          Welcome....!
        </p>
        <h1 className="text-4xl font-bold">
          My Pay <span className="text-secondary">ent Hist</span> ory
        </h1>
        <p className="my-3 text-sm text-gray-500">
          You Can See Your Payment History Here
        </p>
      </div>
      <div className="mx-6">
        <h1 className="font-bold">Total Payment : {payments.length}</h1>
        <h1 className="font-bold">Total Paid : ${totalPaidAmmout}</h1>
      </div>
      {/* ---Table------- */}
      <div>
        <div className="mx-6 mt-10 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#332D2D] text-white">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="font-semibold text-left">Amount</th>
                <th className="font-semibold text-left">TransactionId</th>
                <th className="font-semibold text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.length == 0 ? (
                <tr>
                  <td colSpan={"5"} className="text-2xl font-bold text-center">
                    No Payments Found
                  </td>
                </tr>
              ) : (
                currentItems.map((payment, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-white bg-red-500 border-b border-yellow-300 "
                    >
                      <td className="p-4 whitespace-nowrap">{index + 1}</td>
                      <td className="p-4 whitespace-nowrap">
                        ${payment.price}
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        {payment.transactionId}
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        {" "}
                        {moment(payment.data).format("MMMM  Do  YYYY")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!payments.length === 0 && (
          <div className="flex items-center justify-center py-10">
            <nav
              aria-label="Pagination"
              className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-800"
            >
              <button
                onClick={handlePrev}
                disabled={page === 1}
                type="button"
                className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300 disabled:bg-gray-500 "
              >
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              {newTotalPage.map((num, index) => {
                return (
                  <button
                    onClick={() => handleChange(num)}
                    key={index}
                    type="button"
                    aria-current="page"
                    className={`inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 bg-violet-600 text-gray-50 ${
                      index + 1 === page && "bg-red-700 text-white "
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
              <button
                disabled={page === totalPage}
                onClick={handleNext}
                type="button"
                className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-300 disabled:bg-gray-500"
              >
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
