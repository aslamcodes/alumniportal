import express from "express";
import { GridFsStorage } from "multer-gridfs-storage";
import {
  getAllTestimonials,
  createTestimonial,
  getTestimonialById,
  getTestimonialUserImage,
  deleteTestimonial,
} from "../controllers/testimonialControllers.js";
import multer from "multer";
import { admin, protect } from "../middleware/authMiddlewares.js";
const router = express.Router();

const testimonialStorage = new GridFsStorage({
  url: process.env.URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
        reject(new Error("Only Images(png, jpg, jpeg) are allowed"));
      }
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "testimonial_images",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage: testimonialStorage });

router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);
router.get("/user-image/:id", getTestimonialUserImage);

router.post("/", protect, admin, upload.single("image"), createTestimonial);

router.delete("/:id", protect, admin, deleteTestimonial);

export default router;
