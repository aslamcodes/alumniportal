import { generateToken } from "../utils/authorization.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import fs from "fs";
import { __dirname } from "../index.js";
import Conversation from "../models/Conversation.js";
import ResetToken from "../models/ResetToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/email.js";
import path from "path";
import VerifyToken from "../models/VerfiyToken.js";
import { clear } from "console";
import Alumni from "../models/Alumni.js";
import AlumniRequest from "../models/AlumniRequest.js";
import ForumCommentReply from "../models/ForumCommentReply.js";
import Comment from "../models/ForumComment.js";
import Event from "../models/Event.js";
import ForumPost from "../models/ForumPost.js";
import ForumPostRequest from "../models/ForumPostRequest.js";
import RejectedApplication from "../models/RejectedApplication.js";

let userAvatarImagesBucket;
const conn = mongoose.connection;

conn.on("open", () => {
  userAvatarImagesBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "user_avatar_images",
  });
});

export const registerUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  const id = req.file?.id;

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  try {
    const user = await User.create({
      ...req.body,
      avatar: id && id,
    });

    // const feedbackUser = await User.findOne({
    //   email: "feedback@alumniportal.skct",
    // });

    // await Conversation.create({
    //   participants: [user._id, feedbackUser._id],
    //   createdBy: feedbackUser._id,
    // });

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      registerNumber: user.registerNumber,
      department: user.department,
      course: user.course,
      phoneNumber: user.phoneNumber,
      country: user.country,
      state: user.state,
      city: user.city,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      isAlumni: user.isAlumni,
      registerNumber: user.registerNumber,
      department: user.department,
      course: user.course,
      phoneNumber: user.phoneNumber,
      country: user.country,
      state: user.state,
      city: user.city,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
});

export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Email not registered in Alumni Portal");
  }

  const token = await ResetToken.findOne({ user: user._id });

  if (token) {
    await token.deleteOne();
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hash = await bcrypt.hash(resetToken, 10);

  await ResetToken.create({
    user: user._id,
    token: hash,
    createdAt: Date.now(),
  });

  const link = `${req.get("host")}/reset-password?token=${resetToken}&user=${
    user._id
  }`;

  const { error } = await sendEmail(
    user?.email,
    "SKCT Alumni Portal - Password Reset Request",
    {
      receiver: user?.name,
      content: link,
    },
    path.join(__dirname, "templates", "forgot-password.ejs")
  );

  if (error) {
    console.log(error);
    res.status(400);
    throw new Error("Couldn't Send you a Email");
  }

  res.json({
    message: "Email was sent with link to reset",
  });
});

export const requestEmailVerification = asyncHandler(async (req, res) => {
  const { user } = req;

  const existingUser = await User.findById(user._id);

  if (!existingUser) {
    res.status(400);
    throw new Error("Sorry Something's wrong with your account");
  }

  const token = await VerifyToken.findOne({ user: existingUser._id });

  if (token) {
    await token.deleteOne();
  }

  const verifyToken = crypto.randomBytes(32).toString("hex");

  const hash = await bcrypt.hash(verifyToken, 10);

  await VerifyToken.create({
    token: hash,
    user: user._id,
    createdAt: Date.now(),
  });

  const link = `${req.get("host")}/verify-email?token=${verifyToken}`;

  const { error } = await sendEmail(
    user?.email,
    "SKCT Alumni Portal - Verify your email",
    {
      receiver: user?.name,
      content: link,
    },
    path.join(__dirname, "templates", "email-verification.ejs")
  );

  if (error) {
    res.status(400);
    throw new Error("Sorry, Couldn't Send you a Email right now!");
  }

  res.json({
    message: "Email was sent with link to verify email",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, user: userId, password: newPassword } = req.body;

  const existingToken = await ResetToken.findOne({
    user: userId,
  });

  if (!existingToken) {
    res.status(400);
    throw new Error("Link Expired or Invalid");
  }

  const isValid = await bcrypt.compare(token, existingToken.token);

  if (!isValid) {
    throw new Error("Token Invalid, please try again");
  }

  const user = await User.findById(userId);

  user.password = newPassword;

  await user.save();

  res.json({
    message: "Password updated successfully",
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token, userId } = req.body;

  const existingToken = await VerifyToken.findOne({
    user: userId,
  });

  if (!existingToken) {
    res.status(400);
    throw new Error("Link Expired or Invalid");
  }
  const isValid = await bcrypt.compare(token, existingToken.token);

  if (!isValid) {
    throw new Error("Token Invalid, please try again");
  }

  const user = await User.findById(userId);

  user.isEmailVerified = true;

  await user.save();

  res.json({
    message: "Email Verified Successfully",
  });
});

export const getUserDetailsById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("alumni")
    .select(["-password", "-__v", "-createdAt", "-updatedAt"]);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

export const getUserAvatarImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const readStream = userAvatarImagesBucket.openDownloadStream(
      mongoose.Types.ObjectId(user.avatar)
    );

    readStream.on("error", function (err) {
      const filename = __dirname + "/uploads/default.jpeg";
      const readStream = fs.createReadStream(filename);
      readStream.on("open", function () {
        readStream.pipe(res);
      });
      readStream.on("error", function (err) {
        res.end(err);
      });
    });

    return readStream.pipe(res);
  } else {
    res.status(404).json({
      error: "User not found",
    });
  }
});

export const resolveNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    return res.status(404).json({
      error: "Notification not found",
    });
  }

  notification.resolved = true;

  await notification.save();

  res.json(notification);
});

export const getNotification = asyncHandler(async (req, res) => {
  const { user } = req;

  const notifications = await Notification.find({
    user: user._id,
    resolved: false,
  }).sort({ createdAt: -1 });

  if (!notifications)
    return res.json({
      success: false,
      error: "No notifications found",
    });

  return res.json(notifications);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { user: authUser } = req;

  const user = await User.findById(authUser?._id);

  if (!user) {
    return res.status(404).json({
      error: "Not a valid user account",
    });
  }

  try {
    const imageId = req.file?.id;

    Object.keys(req.body).forEach((key) => {
      if (key === "password" || key === "email") return;
      user[key] = req.body[key];
    });

    if (req.file) user.avatar = imageId && imageId;

    await user.save();

    return res.json({
      message: "Successfully updated user account",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { user: authUser } = req;

  const user = await User.findById(authUser?._id);

  if (!user) {
    return res.status(404).json({
      error: "Not a valid user account",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Promise.all([
      User.findByIdAndDelete(user._id),
      Alumni.findOneAndDelete({ user: user._id }),
      AlumniRequest.deleteMany({ user: user._id }),
      Conversation.deleteMany({ createdBy: user._id }),
      Comment.deleteMany({ user: user._id }),
      Event.deleteMany({ createdBy: user._id }),
      ForumCommentReply.deleteMany({ user: user._id }),
      ForumPost.deleteMany({ user: user._id }),
      ForumPostRequest.deleteMany({ createdBy: user._id }),
      Notification.deleteMany({ user: user._id }),
      RejectedApplication.deleteMany({ user: user._id }),
      ResetToken.deleteMany({ user: user._id }),
      VerifyToken.deleteMany({ user: user._id }),
    ]);

    await session.commitTransaction();

    res.status(200).json({ message: "account deleted successfully" });
  } catch (error) {
    await session.abortTransaction();

    return res
      .status(500)
      .json({ error: "An error occurred while deleting the user account" });
  } finally {
    session.endSession();
  }
});
