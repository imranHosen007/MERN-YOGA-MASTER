import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";
import { Navigate, useNavigate } from "react-router-dom";
const CheckOut = ({ itemId, price }) => {
  const URL = `https://mern-yoga-master.onrender.com/payment?${
    itemId && `classId=${itemId}`
  }`;
  const element = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const [cardError, setCardError] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [succed, setSucced] = useState();
  const [cart, setCart] = useState();
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState();
  const { currentUser, isLoading } = useUser();
  if (price < 0 || !price) {
    return <Navigate to={`/dashboard/my-selected`} replace />;
  }

  // ------Post-Payment----
  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is Not a Number");
      return;
    }
    axiosSecure
      .post(`payment/create-intent`, { price: price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => console.log(`payment post ${error}`));
  }, []);
  // -----HandleSubmit------
  const handleSubmit = async (e) => {
    setMessage("");
    e.preventDefault();
    if (!stripe || !element) {
      return;
    }
    const card = element.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setMessage(error);
    }
    // ------Confirm-Payment------
    const { paymentIntent, error: confrimError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name || "User Is Anonmous",
            email: currentUser?.email || "unknown",
          },
        },
      });
    if (confrimError) {
      console.log("Confrim Error", confrimError);
    }

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      const paymentMethod = paymentIntent.payment_method;
      const amount = paymentIntent.amount / 100;
      const currency = paymentIntent.currency;
      const paymentStatus = paymentIntent.status;
      const userEmail = currentUser?.email;
      const userName = currentUser?.name;

      const Data = {
        transactionId,
        paymentMethod,
        price: amount,
        currency,
        paymentStatus,
        userEmail,
        userName,
        classesId: itemId ? [itemId] : cart,
        date: new Date(),
      };
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(Data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setSucced("Payment SuccesFull,You Can Now Access Your Classes");
            navigate(`/dashboard/enrolled-classes`);
          } else {
            setSucced("Paymeny Failed,....Please Try Again");
          }
        })
        .catch((err) => console.log(`Payment clear ${err}`));
    }
  };

  // ------Data-Fetcing----
  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        const classesId = res?.data?.map((item) => item._id);
        setCart(classesId);
      })
      .then((error) => console.log(`payment ${error}`));
  }, []);
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Payment Amount : <span className="text-secondary">${price}</span>
        </h1>
        {/* ----Payment-From---- */}
      </div>
      <div className="w-full max-w-sm px-4 mx-auto my-10 shadow-2xl card shrink-0 bg-base-100 py-7">
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            disabled={!stripe}
            type="submit"
            className="w-full mt-5 text-secondary btn-primary btn btn-sm"
          >
            Pay
          </button>
        </form>
        {message ? (
          <p className="mt-2 text-xs italic text-red-600">{message.message}</p>
        ) : (
          ""
        )}
        {succed ? (
          <p className="mt-2 text-xs italic text-green-500">{succed}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CheckOut;
