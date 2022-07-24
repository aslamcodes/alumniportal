import Alumni from "../models/Alumni.js";

export const getAlumniIds = async () => {
  const alumni = await Alumni.aggregate([
    {
      $project: {
        user: 1,
      },
    },
  ]);

  if (!alumni) {
    return [];
  }
  return alumni.map(({ user }) => user);
};

export const getGalleryType = (type) => {
  const galleryTypes = ["general", "seminar", "alumni"];

  if (type > galleryTypes.length - 1 || type < 0) {
    return galleryTypes[0];
  }

  return galleryTypes[type];
};
