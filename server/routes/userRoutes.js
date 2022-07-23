import express from "express";
import {
  getUserAvatarImage,
  getUserDetailsById,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import { registerAlumni } from "../controllers/alumniControllers.js";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const router = express.Router();

const userAvatarStorage = new GridFsStorage({
  url: process.env.URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
        reject(new Error("Only Images(png, jpg, jpeg) are allowed"));
      }
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "user_avatar_images",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage: userAvatarStorage });

router.get("/:id", getUserDetailsById);
router.get("/user-avatar/:id", getUserAvatarImage);

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/alumni-register", registerAlumni);

export default router;
