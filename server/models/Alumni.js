import mongoose from "mongoose";
import AlumniRequest from "./AlumniRequest.js";

const { Schema, model } = mongoose;

const alumniSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isEntrepreneur: {
    type: Boolean,
    default: false,
  },
  isInHigherStudies: {
    type: Boolean,
    default: false,
  },
  designation: { type: String },
  companyName: { type: String },
  companyEmail: { type: String },
  organization: { type: String },
  secondaryCollegeName: { type: String },
  domain: { type: String },
  courseName: { type: String },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    github: { type: String },
  },
  isOfficeBearer: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  profileDescription: { type: String },
});

alumniSchema.pre("save", async function (next) {
  const newAlumniRequest = await AlumniRequest.create({
    user: this.user,
  });
  if (newAlumniRequest) {
    next();
  } else {
    next(new Error("Error in creating alumni request"));
  }
});

const Alumni = model("Alumni", alumniSchema);

export default Alumni;
