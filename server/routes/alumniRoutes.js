import express from "express";
import {
  registerAlumni,
  deleteAlumni,
  updateAlumni,
  getAlumniById,
  approveAlumni,
  setOfficeBearer,
  removeOfficeBearer,
  getAlumniCities,
  getAlumniByCity,
  getAllAlumni,
  getAlumniRequests,
} from "../controllers/alumniControllers.js";
import { admin, protect } from "../middleware/authMiddlewares.js";

const router = express.Router();

router.get("/", getAllAlumni);
router.get("/cities/", getAlumniCities);
router.get("/requests/", protect, admin, getAlumniRequests);
router.get("/:id", getAlumniById);
router.get("/city/:city", getAlumniByCity);

router.post("/register", registerAlumni);

router.patch("/:id", protect, updateAlumni);
router.patch("/approve/:id", protect, admin, approveAlumni);
router.patch("/set-office-bearer/:id", protect, admin, setOfficeBearer);
router.patch("/remove-office-bearer/:id", protect, admin, removeOfficeBearer);

router.delete("/:id", protect, admin, deleteAlumni);

export default router;
