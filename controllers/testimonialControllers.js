import asyncHandler from "express-async-handler";
import Testimonial from "../models/Testimonial.js";
import mongoose from "mongoose";

let testimonialImagesBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  testimonialImagesBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "testimonial_images",
  });
});

export const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({});

  if (!testimonials) {
    return res.status(400).json({
      error: "No testimonials found",
    });
  }

  return res.status(200).json(testimonials);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, quote } = req.body;
  const image = req.file;
  console.log(req.file);

  const testimonial = await Testimonial.create({
    name,
    quote,
    image: image.id,
  });

  return res.status(201).json(testimonial);
});

export const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(400).json({
      error: "Testimonial not found",
    });
  }

  return res.status(200).json(testimonial);
});

export const getTestimonialUserImage = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(400).json({
      error: "Testimonial not found",
    });
  }

  const readStream = await testimonialImagesBucket.openDownloadStream(
    mongoose.Types.ObjectId(testimonial.image)
  );

  readStream.pipe(res);

  readStream.on("error", (err) => {
    res.status(400).json({ error: err.message || "No image found" });
  });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(400).json({
      error: "Testimonial not found",
    });
  }

  await testimonialImagesBucket.delete(
    mongoose.Types.ObjectId(testimonial.image)
  );

  await testimonial.remove();

  return res.status(200).json({
    message: "Testimonial deleted",
  });
});
