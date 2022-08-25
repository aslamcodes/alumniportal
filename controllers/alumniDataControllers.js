import asyncHandler from "express-async-handler";
import AlumniData from "../models/Alumni-data.js";

export const getAlumniData = asyncHandler(async (req, res) => {
  const { registerNumber, email, phoneNumber } = req.body;

  const alumniData = await AlumniData.find({
    contact: phoneNumber,
  });

  if (!alumniData) {
    return res.status(400).json({
      message: "No Alumni Data found",
    });
  }

  return res.json(alumniData);
});
