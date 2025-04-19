import mongoose from "mongoose";
import { Schema } from "mongoose";

const enrollSchmea = new Schema({
  transactioniId: String,
  classesId: Array,
  userEmail: String,
});

const Enroll = mongoose.model("Enroll", enrollSchmea);
export default Enroll;
