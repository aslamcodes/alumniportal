import fs from "fs";
import path from "path";
import papa from "papaparse";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(import.meta.url).replace("data-upload.js", "");

const files = fs.readdirSync(path.resolve(__dirname, "./raw"));

let headers = [];

files.forEach((file) => {
  let data = [];
  const fileStream = fs.createReadStream(path.join(__dirname, `./raw/${file}`));

  const papaStream = papa.parse(papa.NODE_STREAM_INPUT, {
    header: true,
  });

  fileStream.pipe(papaStream);

  papaStream.on("data", (chunk) => {
    data.push(chunk);
  });

  papaStream.on("finish", () => {
    fs.writeFileSync(
      path.join(__dirname, `/json/${file.replace(".csv", "")}.json`),
      JSON.stringify(data)
    );

    headers.push({ [file]: Object.keys(data[0]) });

    headers.length === files.length &&
      fs.writeFileSync(
        path.join(__dirname, `/headers.json`),
        JSON.stringify(headers)
      );
  });
});
