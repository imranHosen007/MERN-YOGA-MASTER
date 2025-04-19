import mongoose from "mongoose";
import { Schema } from "mongoose";

const CartSchema = new Schema({
  name: { type: String },
  classId: { type: String },
  userMail: { type: String, required: true },
  data: { type: String },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
