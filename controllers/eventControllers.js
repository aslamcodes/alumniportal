import Event from "../models/Event.js";
import Notification from "../models/Notification.js";
import asyncHandler from "express-async-handler";
import notificationConstants from "../constants/notification-constants.js";

export const createEvent = asyncHandler(async (req, res) => {
  const { eventName, startDate, endDate, venue, isApproved } = req.body;
  const { user } = req;
  const event = await Event.create({
    eventName,
    startDate,
    endDate,
    venue,
    isApproved,
    createdBy: user,
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
  const events = await Event.aggregate([
    {
      $match: {
        isApproved: true,
      },
    },
    {
      $sort: {
        startDate: 1,
      },
    },
  ]);
  if (events) {
    res.status(200).json(events);
  } else {
    res.status(400).json({
      error: "Events could not be found",
    });
  }
});

export const getNewEventsRequests = asyncHandler(async (req, res) => {
  const requests = await Event.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "approvedBy",
        foreignField: "_id",
        as: "approvedBy",
      },
    },
    {
      $unwind: {
        path: "$createdBy",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$approvedBy",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unset: [
        "createdBy.password",
        "createdBy.createdAt",
        "createdBy.updatedAt",
        "createdBy.alumni",
        "createdBy.isAdmin",
        "createdBy.__v",
        "__v",
      ],
    },
  ]);

  if (!requests)
    return res.status(400).json({
      message: "No Requests Found",
    });

  return res.json(requests);
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

export const approveEvent = asyncHandler(async (req, res) => {
  const { id: eventId } = req.params;
  const { user } = req;
  const event = await Event.findById(eventId);
  if (!event) return res.status(400).json({ message: "Event not found" });
  event.isApproved = true;
  event.approvedBy = user;
  await Notification.create({
    message: "Your event approved by Admin",
    type: notificationConstants.EVENT_CREATED,
    user: event.createdBy,
  });
  await event.save();
  return res.json({
    type: notificationConstants.EVENT_APPROVED,
    message: "Event Approved Successfully",
  });
});

export const rejectEvent = asyncHandler(async (req, res) => {
  const { id: eventId } = req.params;
  const { reason } = req.body;
  const event = await Event.findById(eventId);

  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }

  await event.delete();

  await Notification.create({
    message: "Your event was rejected, Reason: " + reason,
    user: event.createdBy,
    type: notificationConstants.EVENT_REJECTED,
  });

  return res.json({ message: "Event rejected Successfully" });
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
