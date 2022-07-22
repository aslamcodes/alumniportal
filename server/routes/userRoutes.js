import express from "express";
import {
  getUserDetailsById,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import { registerAlumni } from "../controllers/alumniControllers.js";

const router = express.Router();

router.get("/:id", getUserDetailsById);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/alumni-register", registerAlumni);

export default router;
