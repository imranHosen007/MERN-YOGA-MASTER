import Stripe from "stripe";
import mongoose from "mongoose";
import Payment from "../Models/Payments.Model.js";
import Enroll from "../Models/Enrolled.model.js";
import Cart from "../Models/Cart.model.js";
import Classes from "../Models/Classes.model.js";
const ObjectId = mongoose.Types.ObjectId;
const stripe = new Stripe(
  "sk_test_51PNBw7RuwZPqI3pohgs56pAXju6AFY0CvrPnmAny8JUx5l0rPsj4hAVYv45UlqG4rVVU0uP9OhcongmNKrdQc6jQ00LAK8lfMR"
);

export const paymentDeatils = async (req, res) => {
  const { price } = req.body;

  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const postPayment = async (req, res) => {
  const paymentInfo = req.body;
  const classesId = paymentInfo.classesId;
  const userEmail = paymentInfo.userEmail;
  const singleClassId = req.query.classId;

  let query;
  if (singleClassId) {
    query = { classId: singleClassId, userMail: userEmail };
  } else {
    query = { classId: { $in: classesId }, userMail: userEmail };
  }

  try {
    const classesQurry = {
      _id: { $in: classesId.map((id) => new ObjectId(id)) },
    };

    const classes = await Classes.find(classesQurry);

    classes.forEach(async (o) => {
      await updateClass(o._id);
    });

    async function updateClass(id) {
      const findClass = await Classes.findById(id);

      findClass.totalEnrolled += 1;
      findClass.availableSeats -= 1;
      await findClass.save({ validateBeforeSave: false });
    }

    const newEnrolledData = {
      userEmail: userEmail,
      transactionId: paymentInfo.transactionId,
      classesId: classesId.map((id) => new ObjectId(id)),
    };
    const enrolledResult = await Enroll.create(newEnrolledData);
    const deletedResult = await Cart.deleteMany(query);
    const paymentResult = await Payment.create(paymentInfo);

    res
      .status(200)
      .json({ deletedResult, enrolledResult, paymentResult, updateReuslt });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const paymentHistory = async (req, res) => {
  const { email } = req.params;

  const query = { userEmail: email };
  try {
    const result = await Payment.find(query).sort({ createAt: -1 });

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const paymentHistoryLength = async (req, res) => {
  const { email } = req.params;
  const query = { userEmail: email };
  try {
    const result = await Payment.countDocuments(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
