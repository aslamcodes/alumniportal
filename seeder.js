import User from "./models/User.js";
import Gallery from "./models/Gallery.js";
import Notification from "./models/Notification.js";
import Testimonial from "./models/Testimonial.js";
import Alumni from "./models/Alumni.js";
import { admins } from "./data/users";

export default async function seeder() {
  await User.delete({});
  await Gallery.delete({});
  await Notification.delete({});
  await Testimonial.delete({});
  await Alumni.delete({});

  await User.insertMany(admins);
}
