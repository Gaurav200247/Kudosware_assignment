require("express-async-errors");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/.env" });
}

const express = require("express");
const connectDB = require("./DB/connectDB");
const notFoundMiddleware = require("./middlewares/notFound");
const errHandlerMiddleware = require("./middlewares/errHandler");
const FormRouter = require("./routers/FormRouter");
const cors = require("cors");
const app = express();

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());

// routes
app.use("/api/v1", FormRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

// custom-middlewares
app.use(notFoundMiddleware);
app.use(errHandlerMiddleware);

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
