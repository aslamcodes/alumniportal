import express from "express";
import {
  loginUser,
  registerUser,
  registerAlumni,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/alumni-register", registerAlumni);

export default router;
