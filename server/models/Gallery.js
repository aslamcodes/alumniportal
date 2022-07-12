import mongoose from "mongoose";

const { Schema, model } = mongoose;

const gallerySchema = new Schema({
  image: {
    type: String,
    required: true,
  },
});

const Gallery = model("Gallery", gallerySchema);

export default Gallery;
