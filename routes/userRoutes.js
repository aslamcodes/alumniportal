import express from "express";
import {
  getNotification,
  getUserAvatarImage,
  getUserDetailsById,
  loginUser,
  registerUser,
  requestEmailVerification,
  requestPasswordReset,
  resetPassword,
  resolveNotification,
  updateUser,
  verifyEmail,
} from "../controllers/userControllers.js";
import { registerAlumni } from "../controllers/alumniControllers.js";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import { protect } from "../middleware/authMiddlewares.js";

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

router.get("/notifications", protect, getNotification);
router.get("/:id", getUserDetailsById);
router.get("/user-avatar/:id", getUserAvatarImage);

router.patch(
  "/notifications/resolve/:notificationId",
  protect,
  resolveNotification
);
router.patch("/", protect, upload.single("avatar"), updateUser);
router.patch("/reset-password", resetPassword);
router.patch("/verify-email", verifyEmail);

router.post("/request-password-reset/", requestPasswordReset);
router.post("/request-verify-email/", protect, requestEmailVerification);
router.post("/verify-email/", protect, requestEmailVerification);
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/alumni-register", registerAlumni);

export default router;
