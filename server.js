// 3rd Party Modules
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Local Modules
const jorneyRoute = require("./routes/jorney.js");

// Server Initialization
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("We are on the server side ");
});

app.use("/", jorneyRoute);

app.listen(port, () => console.log("Backend server live on " + port));
