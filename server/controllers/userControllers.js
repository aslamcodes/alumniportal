import { generateToken } from "../utils/authorization.js";
import User from "../models/User.js";
import Alumni from "../models/Alumni.js";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    avatar,
    registerNumber,
    department,
    course,
    phoneNumber,
    country,
    state,
    city,
  } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      error: "User already exists",
    });
  }

  const user = await User.create({
    email,
    name,
    password,
    avatar,
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

export const registerAlumni = asyncHandler(async (req, res) => {
  const {
    userId,
    isEntrepreneur,
    isInHigherStudies,
    designation,
    companyName,
    companyEmail,
    organization,
    secondaryCollegeName,
    domain,
    courseName,
    social: { facebook, twitter, linkedin, github },
    isOfficeBearer,
    profileDescription,
  } = req.body;

  const existingAlumni = await Alumni.findOne({ userId });

  if (existingAlumni) {
    return res.status(400).json({
      error: "You're already registered as an Alumni",
    });
  }

  const alumni = await Alumni.create({
    userId,
    isEntrepreneur,
    isInHigherStudies,
    designation,
    companyName,
    companyEmail,
    organization,
    secondaryCollegeName,
    domain,
    courseName,
    social: {
      facebook,
      twitter,
      linkedin,
      github,
    },
    isOfficeBearer,
    profileDescription,
  });

  if (alumni) {
    res.status(200).json({
      _id: alumni._id,
      userId: alumni.userId,
      isEntrepreneur: alumni.isEntrepreneur,
      isInHigherStudies: alumni.isInHigherStudies,
      designation: alumni.designation,
      companyName: alumni.companyName,
      companyEmail: alumni.companyEmail,
      organization: alumni.organization,
      secondaryCollegeName: alumni.secondaryCollegeName,
      domain: alumni.domain,
      courseName: alumni.courseName,
      social: alumni.social,
      isOfficeBearer: alumni.isOfficeBearer,
      profileDescription: alumni.profileDescription,
    });
  } else {
    res.status(400).json({
      error:
        "Cannot register as an Alumni at this time, please try again later",
    });
  }
});
