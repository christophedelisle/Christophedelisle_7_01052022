const express = require("express");

const cookieParser = require("cookie-parser");

//Access to the path of our file system
const path = require("path");

// call of the express method (creation of the application)
const app = express();

// roads declaration
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

// intercept and make available the content (body) of requests that contain JSON (=bodyparser)
app.use(express.json());

require("dotenv").config();

//  CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // supported headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // supported query methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

//Roads

app.use(cookieParser());
//Road to request images in the "static" images folder
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
