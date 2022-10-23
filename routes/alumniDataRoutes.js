import express from "express";
import {
  getAllAlumniData,
  getAlumniData,
  getStoredAlumniCount,
  getSearchAlumniData
} from "../controllers/alumniDataControllers.js";

const router = express.Router();

router.get("/", getAllAlumniData);
router.get("/alumni/", getAlumniData);
router.get("/count/", getStoredAlumniCount);
router.get("/search/:search", getSearchAlumniData);

export default router;
