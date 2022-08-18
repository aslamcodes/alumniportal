import mongoose from "mongoose";

const { Schema, model } = mongoose;

const alumniDataSchema = new Schema({
  batch: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
  },
  registerNumber: {
    type: String,
    index: true,
  },
  dateOfBirth: {
    type: Date,
    index: true,
  },
  address: { type: String },
  email: { type: String, index: true },
  contact: { type: String, index: true },
  natureOfWork: { type: String },
  designation: { type: String, index: true },
  company: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
});

const AlumniData = model("AlumniData", alumniDataSchema);

export default AlumniData;
