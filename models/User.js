import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema, model } = mongoose;
const { hash, compare } = bcryptjs;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAlumni: {
      type: Boolean,
      default: false,
    },
    alumni: {
      type: Schema.Types.ObjectId,
      ref: "Alumni",
    },
    registerNumber: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    yearOfPassing: {
      type: Date,
    },
    dateOfBirth: {
      type: Date,
    },
    graduationLevel: {
      type: String,
      required: true,
      enum: ["Under graduate", "Post graduate"],
    },
    skill: {
      type: String,
    },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

export default User;
