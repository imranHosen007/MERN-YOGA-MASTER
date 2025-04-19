import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoUrl: String,
  role: String,
  gender: {
    type: String,
  },
  address: String,
  phone: String,
  about: String,
  skills: Array,
  uid: String,
});

const User = mongoose.model("User", userSchema);

export default User;
