import mongoose from "mongoose";
import { Schema } from "mongoose";
const PaymentSchema = new Schema({
  transactionId: String,
  paymentMethod: String,
  price: Number,
  currency: String,
  paymentStatus: String,
  userName: String,
  userEmail: String,
  classesId: Array,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
