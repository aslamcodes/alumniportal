import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
  updateEvent,
  getNewEventsRequests,
  approveEvent,
  rejectEvent,
} from "../controllers/eventControllers.js";
import { admin, protect } from "../middleware/authMiddlewares.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/requests", getNewEventsRequests);
router.get("/:id", getEventById);

router.post("/", protect, createEvent);

router.patch("/:id", protect, admin, updateEvent);
router.patch("/approve/:id", protect, admin, approveEvent);
router.patch("/reject/:id", protect, admin, rejectEvent);

router.delete("/:id", protect, admin, deleteEvent);

export default router;
