import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Navigate, useLocation } from "react-router-dom";

import CheckOut from "./CheckOut";
const stripePromoise = loadStripe(
  `pk_test_51PNBw7RuwZPqI3poVmAV1th8ab0I4zFxe6xVCQ1WMTqA8NoQshe3yzaKAFEuuEXsfg3zqZMGNQW1ooQbZPjLenS800UOOefzKx`
);

const Payment = () => {
  const location = useLocation();
  const price = location?.state?.price;
  const itemId = location?.state?.itemId;

  if (!price) {
    return <Navigate to={`/dashboard/my-selected`} />;
  }
  return (
    <div className="my-40 stripe-custom">
      <Elements stripe={stripePromoise}>
        <CheckOut price={price} itemId={itemId} />
      </Elements>
    </div>
  );
};

export default Payment;
