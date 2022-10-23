import asyncHandler from "express-async-handler";
import AlumniData from "../models/Alumni-data.js";

export const getAlumniData = asyncHandler(async (req, res) => {
  const { email } = req.query;

  const alumniData = await AlumniData.findOne({
    email: email.toLowerCase(),
  });

  if (!alumniData) {
    return res.status(400).json({
      message: "No Alumni Data found",
    });
  }

  return res.json(alumniData);
});

export const getAllAlumniData = asyncHandler(async (req, res) => {
  const { offset = 0, entries = 10 } = req.query;

  const alumniData = await AlumniData.aggregate([
    { $skip: +offset },
    {
      $limit: +entries,
    },
  ]);

  if (!alumniData) {
    res.status(400);
    throw new Error("No Alumni Data Available");
  }

  res.json(alumniData);
});

export const getStoredAlumniCount = asyncHandler(async (req, res) => {
  const count = await AlumniData.count();

  if (!count) {
    res.status(400);
    res.json({
      message: "Problem on Counting the alumni data",
    });
  }

  res.json(count);
});

export const getSearchAlumniData = asyncHandler(async (req, res) => {
  const { search } = req.params;
  const alumniData = await AlumniData.aggregate([
    {
      $match: {
        $text: {
          $search: search
        }
      }
    }
  ]);

  if (!alumniData) {
    res.status(400);
    throw new Error("No Alumni Data Available");
  }
  if (alumniData.length > 0) {
    res.json(alumniData);
  } else {
    res.status(400).json({
      error: "no match found"
    })

  }
});
