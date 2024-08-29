const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose
    .set("strictQuery", true)
    .connect(url)
    .then(() => console.log("DB connected."))
    .catch((err) => {
      console.log(err, "DB connection failed !!");
    });
};

module.exports = connectDB;
