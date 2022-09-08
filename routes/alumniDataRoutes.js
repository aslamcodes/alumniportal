import express from "express";
import {
  getAllAlumniData,
  getAlumniData,
  getStoredAlumniCount,
} from "../controllers/alumniDataControllers.js";

const router = express.Router();

router.get("/", getAllAlumniData);
router.get("/alumni/", getAlumniData);
router.get("/count/", getStoredAlumniCount);

export default router;
