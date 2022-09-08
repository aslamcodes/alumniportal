import express from "express";
import {
  getAllAlumniData,
  getAlumniData,
} from "../controllers/alumniDataControllers.js";

const router = express.Router();

router.get("/", getAllAlumniData);
router.get("/alumni", getAlumniData);

export default router;
