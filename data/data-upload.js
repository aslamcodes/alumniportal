import connectDB from "../config/dbconfig.js";
import AlumniData from "../models/Alumni-data.js";
import headers from "./headers.json" assert { type: "json" };
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB(process.env.URI).then(async () => {
  await AlumniData.deleteMany({});
  const files = Object.keys(headers);
  const docs = [];
  files.forEach((file) => {
    const headersOfFile = headers[file].map((header) => header.trim());
    const getDataForHeader = getAlumniValueByHeader.bind(null, headersOfFile);
    const batch = file.slice(0, 4);
    const alumni = require(path.join(__dirname, `./json/${file}`));

    alumni.forEach((alumnus) => {
      const name = getDataForHeader(alumnus, "^name");
      const address = getDataForHeader(alumnus, "^address");
      const registerNumber = getDataForHeader(alumnus, "^reg");
      const email = getDataForHeader(alumnus, "mail");
      const contact = getDataForHeader(alumnus, "contact|phone|mobile");
      // Work in progress - need to find a RegExp to get the below fields
      const dateOfBirth = getDataForHeader(alumnus, "^date of birth");
      const natureOfWork = getDataForHeader(alumnus, "^nature of work");
      const designation = getDataForHeader(alumnus, "^designation");
      const company = getDataForHeader(alumnus, "^company");
      const place = getDataForHeader(alumnus, "^place");

      const data = {
        batch,
        name,
        registerNumber,
        // dateOfBirth,
        address,
        email,
        contact: contact.replace("#ERROR!", ""),
        natureOfWork,
        designation,
        company,
        place,
      };

      docs.push(data);
    });
  });

  await AlumniData.insertMany(docs);
});

const getAlumniValueByHeader = (headersOfFile, alumni, regex) => {
  const regExp = new RegExp(regex);
  return headersOfFile
    .filter((header) => regExp.test(header.toLowerCase()))
    .map((header) => alumni[header])
    .join(", ");
};
