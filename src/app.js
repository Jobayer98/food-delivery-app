const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const path = require("path");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const restaurantRouter = require("./routes/restaurantRoute");
const orderRouter = require("./routes/orderRoute");

const app = express();
const file = fs.readFileSync(path.join(__dirname, "./swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(file);

//cloudinary configation
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//api routes middleware
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", restaurantRouter);
app.use("/api/v1", orderRouter);

// greeting
app.get("/", (req, res) => {
  res.send("Welcome to Hungry Hub RESTful API");
});

// unavailable path handler
app.use("*", (req, res, next) => {
  res.status(404).send("Path not found");
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    msg: err.message,
  });
});

module.exports = app;
