import mongoose, { SchemaTypes } from "mongoose";
import { Schema } from "mongoose";

const ClassesSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
  videoLink: String,
  description: { type: String, required: true },
  instructorName: { type: String, required: true },
  instructorEmail: {
    type: String,
    required: true,
  },
  status: { type: String, required: true },
  submitted: {
    type: Date,
    default: Date.now(),
  },
  totalEnrolled: Number,
  reason: String,
});

// const Classes = mongoose.model("Classes", ClassesSchema);
const Classes =
  mongoose.models.Classes || mongoose.model("Classes", ClassesSchema);

export default Classes;
