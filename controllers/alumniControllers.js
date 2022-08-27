import Alumni from "../models/Alumni.js";
import asyncHandler from "express-async-handler";
import { getAlumniIds } from "../utils/controller-utils.js";
import User from "../models/User.js";
import AlumniRequest from "../models/AlumniRequest.js";
import notificationConstants from "../constants/notification-constants.js";
import Notification from "../models/Notification.js";
import RejectedApplication from "../models/RejectedApplication.js";

export const registerAlumni = asyncHandler(async (req, res) => {
  const { user } = req.body;

  const existingAlumni = await Alumni.findOne({ user });

  if (existingAlumni) {
    return res.status(400).json({
      error: "You're already registered as an Alumni",
    });
  }

  const alumni = await Alumni.create(req.body);

  if (alumni) {
    await User.findByIdAndUpdate(user, {
      $set: {
        alumni: alumni._id,
      },
    });

    await Notification.create({
      user,
      type: notificationConstants.ALUMNI_REQUEST,
      message:
        "Your request has been sent to the admin. You will be notified once your request is approved.",
    });

    return res.status(200).json({
      _id: alumni._id,
      user: alumni.user,
      isEntrepreneur: alumni.isEntrepreneur,
      isInHigherStudies: alumni.isInHigherStudies,
      designation: alumni.designation,
      companyName: alumni.companyName,
      companyEmail: alumni.companyEmail,
      companyPan: alumni.companyPan,
      companyTin: alumni.companyTin,
      organization: alumni.organization,
      secondaryCollegeName: alumni.secondaryCollegeName,
      domain: alumni.domain,
      courseName: alumni.courseName,
      social: alumni.social,
      isOfficeBearer: alumni.isOfficeBearer,
      profileDescription: alumni.profileDescription,
      isApproved: alumni.isApproved,
    });
  }

  return res.status(400).json({
    error: "Cannot register as an Alumni at this time, please try again later",
  });
});

export const deleteAlumni = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const alumni = await Alumni.findOneAndDelete({ user: id });

  if (alumni) {
    await User.updateOne(
      { _id: alumni.user },
      {
        $set: {
          isAlumni: false,
          alumni: null,
        },
      }
    );

    res.status(200).json({
      message: "Alumni deleted successfully",
    });
  } else {
    res.status(400).json({
      error: "Cannot delete Alumni at this time, please try again later",
    });
  }
});

export const approveAlumni = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const alumni = await Alumni.findOneAndUpdate(
    { user: id, isApproved: false },
    {
      $set: {
        isApproved: true,
      },
    }
  );

  if (alumni) {
    await User.findByIdAndUpdate(id, { isAlumni: true, alumni: alumni._id });

    await AlumniRequest.deleteOne({ user: id });

    await Notification.create({
      user: alumni.user,
      type: notificationConstants.ALUMNI_APPROVED,
      message:
        "Your request has been approved. You can now access alumni features.",
    });

    return res.status(200).json({
      message: "Alumni approved successfully",
    });
  }

  return res.status(400).json({
    error: "User not registered as an Alumni or already approved",
  });
});

export const updateAlumni = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const alumni = Alumni.findOneAndUpdate({ user: id }, req.body, (err) => {
    console.log(err);
  });

  if (alumni) {
    res.status(200).json({
      message: "Alumni updated successfully",
    });
  } else {
    res.status(400).json({
      error: "Cannot update Alumni at this time, please try again later",
    });
  }
});

export const getAlumniById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const alumni = await Alumni.findOne({ user: id }).populate("user");

  if (alumni) {
    res.status(200).json({
      _id: alumni._id,
      user: alumni.user,
      isEntrepreneur: alumni.isEntrepreneur,
      isInHigherStudies: alumni.isInHigherStudies,
      designation: alumni.designation,
      companyName: alumni.companyName,
      companyEmail: alumni.companyEmail,
      companyPan: alumni.companyPan,
      companyTin: alumni.companyTin,
      organization: alumni.organization,
      secondaryCollegeName: alumni.secondaryCollegeName,
      domain: alumni.domain,
      courseName: alumni.courseName,
      social: alumni.social,
      isOfficeBearer: alumni.isOfficeBearer,
      profileDescription: alumni.profileDescription,
    });
  } else {
    res.status(400).json({
      error: "Cannot find Alumni at this time, please try again later",
    });
  }
});

export const setOfficeBearer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const alumni = await Alumni.findOneAndUpdate(
      { user: id },
      {
        $set: {
          isOfficeBearer: true,
        },
      }
    );

    if (alumni) {
      return res.status(200).json({
        message: "Alumni set as Office Bearer successfully",
      });
    }

    return res.status(400).json({
      error:
        "Cannot set Alumni as Office Bearer at this time, please try again later",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        error: "Wrong User Id",
      });
    }
    res.status(400).json({
      error,
    });
  }
});

export const removeOfficeBearer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const alumni = await Alumni.findOneAndUpdate(
      { user: id },
      {
        $set: {
          isOfficeBearer: false,
        },
      }
    );

    if (alumni) {
      return res.status(200).json({
        message: "Alumni removed as Office Bearer successfully",
      });
    }

    return res.status(400).json({
      error:
        "Cannot remove Alumni as Office Bearer at this time, please try again later",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        error: "Wrong User Id",
      });
    }
    res.status(400).json({
      error,
    });
  }
});

export const getAlumniCities = asyncHandler(async (req, res) => {
  const isOnlyOfficeBearer = req.query["office-bearer"] === "true";
  const unwantedFields = [
    "user.password",
    "user.createdAt",
    "user.updatedAt",
    "user.alumni",
    "user.isAdmin",
  ];
  const cities = await Alumni.aggregate([
    {
      $match: isOnlyOfficeBearer
        ? {
            isApproved: true,
            isOfficeBearer: true,
          }
        : {
            isApproved: true,
          },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $unset: unwantedFields,
    },
    {
      $project: {
        "user.city": 1,
        _id: 0,
      },
    },
    {
      $group: {
        _id: "$user.city",
      },
    },
  ]);

  return res.json({ cities: cities.map((city) => city._id) });
});

export const getAlumniByCity = asyncHandler(async (req, res) => {
  const { city } = req.params;

  const alumniIds = await getAlumniIds();

  if (alumniIds) {
    const alumni = await User.find({
      _id: { $in: alumniIds },
      city,
    }).select(["-password", "-__v", "-isAdmin", "-createdAt", "-updatedAt"]);

    res.status(200).json({
      alumni,
    });
  } else {
    res.status(400).json({
      error:
        "Cannot fetch Alumni by their cities at this time, please try again later",
    });
  }
});

export const getAllAlumni = asyncHandler(async (_, res) => {
  const alumniIds = await getAlumniIds();

  if (alumniIds) {
    const alumni = await User.find({ _id: { $in: alumniIds } });

    res.status(200).json({
      success: true,
      alumni,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "Cannot find Alumni at this time, please try again later",
    });
  }
});

export const getAllAlumniV2 = asyncHandler(async (req, res) => {
  const unwantedFields = [
    "user.password",
    "user.createdAt",
    "user.updatedAt",
    "user.alumni",
    "user.isAdmin",
  ];

  const isOnlyOfficeBearer = req.query["office-bearer"] === "true";

  const alumni = await Alumni.aggregate([
    {
      $match: isOnlyOfficeBearer
        ? {
            isApproved: true,
            isOfficeBearer: true,
          }
        : {
            isApproved: true,
          },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $unset: unwantedFields,
    },
  ]);

  if (!alumni) {
    return res.status(400).json({
      success: false,
      error: "Cannot find Alumni at this time, please try again later",
    });
  }

  return res.status(200).json({
    success: true,
    alumni,
  });
});

export const getAlumniRequests = asyncHandler(async (req, res) => {
  const unwantedFields = [
    "user.password",
    "user.alumni",
    "user.__v",
    "user.createdAt",
    "user.updatedAt",
    "user.isAdmin",
    "__v",
    "alumni_data.__v",
    "alumni_data.user",
  ];
  const requests = await AlumniRequest.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "alumnis",
        localField: "user.alumni",
        foreignField: "_id",
        as: "alumni_data",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$alumni_data" },
    { $unset: unwantedFields },
  ]);

  if (requests) {
    return res.status(200).json({
      success: true,
      requests,
    });
  }

  return res.status(400).json({
    success: false,
    message: "Cannot find Alumni Requests at this time, please try again later",
  });
});

export const rejectAlumniRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const request = await AlumniRequest.findOneAndUpdate(
    { _id: requestId },
    {
      $set: {
        rejected: true,
        reasonOfRejection: req.body.reason,
      },
    }
  );
  if (request) {
    return res.status(200).json({
      success: true,
      message: "Alumni Request rejected successfully",
    });
  }
  return res.status(400).json({
    success: false,
    error: "Cannot reject Alumni Request at this time, please try again later",
  });
});

export const getRejectedApplications = asyncHandler(async (req, res) => {
  const unwantedFields = [
    "user.password",
    "user.alumni",
    "user.__v",
    "user.createdAt",
    "user.updatedAt",
    "user.isAdmin",
    "__v",
    "alumni_data.__v",
    "alumni_data.user",
  ];
  const rejectedApplications = await RejectedApplication.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "alumnis",
        localField: "user.alumni",
        foreignField: "_id",
        as: "alumni_data",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$alumni_data" },
    { $unset: unwantedFields },
  ]);
  if (!rejectedApplications)
    return res.json({
      success: false,
      error:
        "Cannot find Rejected Applications at this time, please try again later",
    });

  return res.status(200).json({
    success: true,
    rejectedApplications,
  });
});
