import mongoose from "mongoose";
import Grid from "gridfs-stream";
import asyncHandler from "express-async-handler";
import Gallery from "../models/Gallery.js";
import { NextPlan } from "@mui/icons-material";

let gfs, galleryImagesBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  galleryImagesBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "gallery_images",
  });
  gfs = Grid(conn.db, mongoose.mongo);
});

export const uploadImage = asyncHandler(async (req, res) => {
  const image = req.file;
  const { title, desc, type } = req.body;
  const galleryImage = await Gallery.create({
    image: image.id,
    title,
    type,
    desc,
  });

  if (!galleryImage) {
    return res.status(400).json({
      error: "Upload failed",
    });
  }

  res.json(galleryImage);
});

export const getAllImages = asyncHandler(async (req, res) => {
  const galleryImages = await Gallery.find();

  if (!galleryImages) {
    return res.status(400).json({
      error: "No images found",
    });
  }

  res.json(galleryImages);
});

export const getImageById = asyncHandler(async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await galleryImagesBucket.find({ _id: imageId });

    if (!image) {
      return res.status(400).json({
        error: "Image not found",
      });
    }
    const readStream = await galleryImagesBucket.openDownloadStream(
      mongoose.Types.ObjectId(req.params.id)
    );
    readStream.pipe(res);

    readStream.on("error", (err) => {
      res.status(400).json({ error: err.message || "No image found" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "No image found" });
  }
});

export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const galleryImage = await Gallery.findById(req.params.id);
  const { image } = galleryImage;

  if (!galleryImage) {
    return res.status(400).json({
      error: "No image found",
    });
  }

  await galleryImagesBucket.delete(mongoose.Types.ObjectId(image));

  await galleryImage.delete();

  res.json(galleryImage);
});
