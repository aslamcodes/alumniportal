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

    const feedbackUser = await User.findOne({
      email: "feedback@alumniportal.skct",
    });

    await Conversation.create({
      participants: [user._id, feedbackUser._id],
      createdBy: feedbackUser._id,
    });

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

  const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user._id}`;

  await sendEmail(
    user?.email,
    "SKCT Alumni Portal - Password Reset Request",
    {
      receiver: user?.name,
      content: link,
    },
    path.join(__dirname, "templates", "forgot-password.ejs")
  );

  res.json(
    "Hello There " +
      user.name +
      " Seems like baby had a hard time remembering the password 😂"
  );
});

export const resetPassword = asyncHandler(async (req, res) => {});

export const getUserDetailsById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("alumni")
    .select(["-password", "-__v", "-createdAt", "-updatedAt"]);

  console.log(req.params.id);

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

    readStream.on("error", (err) => {
      var filename = __dirname + "/uploads/default.jpeg";
      var readStream = fs.createReadStream(filename);
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
