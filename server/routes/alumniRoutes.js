import express from "express";
import {
  registerAlumni,
  deleteAlumni,
  updateAlumni,
  getAlumniById,
  approveAlumni,
} from "../controllers/alumniControllers.js";
import { admin, protect } from "../middleware/authMiddlewares.js";

const router = express.Router();

router.get("/:id", getAlumniById);
router.post("/register", registerAlumni);
router.delete("/:id", protect, admin, deleteAlumni);
router.patch("/:id", protect, updateAlumni);
router.patch("/approve/:id", protect, admin, approveAlumni);

export default router;
