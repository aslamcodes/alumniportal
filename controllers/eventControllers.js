import Event from "../models/Event.js";
import asyncHandler from "express-async-handler";

export const createEvent = asyncHandler(async (req, res) => {
  const { eventName, startDate, endDate, venue } = req.body;
  const event = await Event.create({
    eventName,
    startDate,
    endDate,
    venue,
  });
  if (event) {
    res.status(201).json({
      _id: event._id,
      eventName: event.eventName,
      startDate: event.startDate,
      endDate: event.endDate,
      venue: event.venue,
      time: event.time,
    });
  } else {
    res.status(400).json({
      error: "Event could not be created",
    });
  }
});

export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  if (events) {
    res.status(200).json(events);
  } else {
    res.status(400).json({
      error: "Events could not be found",
    });
  }
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(400).json({
      error: "Event could not be found",
    });
  }
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(400).json({
      error: "Event could not be updated",
    });
  }
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(400).json({
      error: "Event could not be deleted",
    });
  }
});
