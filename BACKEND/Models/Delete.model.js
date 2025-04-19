import mongoose, { SchemaTypes } from "mongoose";
import { Schema } from "mongoose";

const deleteSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number },

  instructorName: { type: String, required: true },
  instructorEmail: {
    type: String,
    required: true,
  },
  status: { type: String },
  submitted: {
    type: Date,
    default: Date.now(),
  },

  reason: String,
});

const Delete = mongoose.model("Delete", deleteSchema);

export default Delete;
