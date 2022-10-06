import express from "express";
const app = express();
import path from "path";

var http_port = 4000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build"));
});

app.listen(http_port, () => {
  console.log("Server running on port " + http_port);
});
