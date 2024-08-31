require("express-async-errors");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/.env" });
}

const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/connectDB");
const notFoundMiddleware = require("./middlewares/notFound");
const errHandlerMiddleware = require("./middlewares/errHandler");
const UserRouter = require("./routers/UserRouter");
const JobRouter = require("./routers/JobRouter");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;

// initializations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kudosware-assignment-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/v1", UserRouter);
app.use("/api/v1", JobRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

// custom-middlewares
app.use(errHandlerMiddleware);
app.use(notFoundMiddleware);

// app listening
const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}... at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

// app start
start();
