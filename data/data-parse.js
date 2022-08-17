import fs from "fs";
import path from "path";
import papa from "papaparse";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = __filename.replace(path.basename(__filename), "");

const files = fs.readdirSync(path.resolve(__dirname, "./raw"));

let headers = {};

files.forEach((file) => {
  if (!file.includes(".csv")) return;
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

    headers[file.replace(".csv", ".json")] = Object.keys(data[0]);

    fs.writeFileSync(
      path.join(__dirname, `/headers.json`),
      JSON.stringify(headers)
    );
  });
});
