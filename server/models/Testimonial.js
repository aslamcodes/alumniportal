import mongoose from "mongoose";

const { Schema, model } = mongoose;

const testimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  quote: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const Testimonial = model("Testimonial", testimonialSchema);

export default Testimonial;
