import express from "express";
import { getAlumniData } from "../controllers/alumniDataControllers.js";

const router = express.Router();

router.get("/", getAlumniData);

export default router;
