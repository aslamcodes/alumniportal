import mongoose from "mongoose";
import AlumniRequest from "./AlumniRequest.js";

const { Schema, model } = mongoose;

const alumniSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
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
  companyPan: { type: String },
  companyTin: { type: String },
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
    index: true,
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

alumniSchema.post("findOneAndUpdate", async function (doc, next) {
  const alumniRequest = await AlumniRequest.findOne({
    user: doc?.user,
  });

  if (!doc) {
    return next();
  }

  try {
    if (alumniRequest) {
      if (!doc.isApproved) {
        await alumniRequest.delete();
      }
    }
  } catch (error) {
    next(new Error("Error in updating alumni request"));
  }

  next();
});

const Alumni = model("Alumni", alumniSchema);

export default Alumni;
