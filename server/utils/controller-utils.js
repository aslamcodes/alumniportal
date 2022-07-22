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
