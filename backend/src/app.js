const fs = require("node:fs");
const path = require("node:path");
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");

const router = require("./routes");

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL.split(",") ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/api", router);

app.use("/public", express.static(path.join(__dirname, "../public")));

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;
