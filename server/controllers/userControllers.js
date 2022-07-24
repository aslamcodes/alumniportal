import { generateToken } from "../utils/authorization.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";

let userAvatarImagesBucket;
const conn = mongoose.connection;
conn.on("open", () => {
  userAvatarImagesBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "user_avatar_images",
  });
});

export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    registerNumber,
    department,
    course,
    phoneNumber,
    country,
    state,
    city,
  } = req.body;

  const existingUser = await User.findOne({ email });

  const id = req.file?.id;

  if (existingUser) {
    return res.status(400).json({
      error: "User already exists",
    });
  }

  const user = await User.create({
    email,
    name,
    password,
    avatar: id && id,
    registerNumber,
    department,
    course,
    phoneNumber,
    country,
    state,
    city,
  });

  if (user) {
    res.status(200).json({
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
  } else {
    res.status(400).json({
      error: "User could not be created",
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      error: "Invalid credentials",
    });
  }
});

export const getUserDetailsById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select([
    "-password",
    "-isAdmin",
    "-__v",
    "-createdAt",
    "-updatedAt",
  ]);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      error: "User not found",
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
      return res.status(400).json({ error: err.message || "No image found" });
    });

    return readStream.pipe(res);
  } else {
    res.status(404).json({
      error: "User not found",
    });
  }
});

export const forgotPassword = asyncHandler(async (req, res) => {
  res.json("On Construction 🚧");
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
  });

  if (!notifications)
    return res.json({
      success: false,
      error: "No notifications found",
    });

  return res.json(notifications);
});
