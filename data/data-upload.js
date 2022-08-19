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
      const company = getDataForHeader(alumnus, "(company)$|^(company name)");
      let dateOfBirth = getDataForHeader(alumnus, "DOB|Date ")
        .split(".")
        .join("-");
      const designation = getDataForHeader(alumnus, "designation").trim();
      const companyAddress = getDataForHeader(
        alumnus,
        "place|company address"
      ).trim();
      const natureOfWork = getDataForHeader(alumnus, "^working")
        .trim()
        .toLowerCase();
      if (dateOfBirth.includes(".")) {
        dateOfBirth = dateOfBirth.split(".").join("-");
      }

      if (dateOfBirth.includes("/")) {
        dateOfBirth = dateOfBirth.split("/").join("-");
      }

      const yearLength = dateOfBirth.split("-").sort(function (a, b) {
        return b.length - a.length;
      })[0];

      let year = dateOfBirth.split("-")[2];
      let month = dateOfBirth.split("-")[1];
      let day = dateOfBirth.split("-")[0];

      if (yearLength.length === 2) {
        const currentYear = new Date().getFullYear().toString().slice(-2);
        if (year === "00") {
          year = "2000";
          dateOfBirth = [year, month, day].join("-");
        } else if (+year <= +currentYear) {
          year = "20" + year;
          dateOfBirth = [year, month, day].join("-");
        } else if (+year > +currentYear) {
          year = "19" + year;
          dateOfBirth = [year, month, day].join("-");
        }
      }

      if (+month > 12) {
        let temp;
        temp = month;
        month = day;
        day = temp;
        dateOfBirth = [year, month, day].join("-");
      }

      if (dateOfBirth.indexOf("-") === 2) {
        dateOfBirth = dateOfBirth.split("-").reverse().join("-");
      }

      try {
        const data = {
          batch,
          name,
          registerNumber,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
          address,
          email,
          contact: contact.replace("#ERROR!", ""),
          natureOfWork,
          designation,
          company,
          companyAddress,
        };
        docs.push(data);
      } catch (error) {
        console.log(
          `Invalid date ${dateOfBirth.red} processed from date of birth ${
            getDataForHeader(alumnus, "DOB|Date ").green
          } of ${name.green} \nfrom ${batch.green} batch \nin ${
            file.green
          } file, \nRoll number ${registerNumber.green}\n`
        );
      }
    });
  });

  await AlumniData.insertMany(docs);
});

const getAlumniValueByHeader = (headersOfFile, alumni, regex) => {
  const regExp = new RegExp(regex, "i");
  return headersOfFile
    .filter((header) => regExp.test(header.toLowerCase()))
    .map((header) => alumni[header])
    .join(", ");
};
