import mongoose from "mongoose";
import { Schema } from "mongoose";

const appliedSchema = new Schema({
  name: String,
  email: String,
  exprience: String,
});

const Applied = mongoose.model("Applied", appliedSchema);

export default Applied;
