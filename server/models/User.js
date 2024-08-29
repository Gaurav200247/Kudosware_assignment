const mongoose = require("mongoose");
const validator = require("validator");
const bcrytjs = require("bcryptjs");
const JWT = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username."],
      minlength: [3, "Please provide username with more than 3 letters."],
    },

    email: {
      type: String,
      required: [true, "Please Enter Email."],
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valid Email."],
    },

    password: {
      type: String,
      required: [true, "Please provide password."],
      minlength: [8, "Password Should be more than 8 Characters."],
    },

    resumes: [
      {
        resume_public_id: { type: string, required: true },
        resume_url: { type: string, required: true },
      },
    ],

    jobs_created: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Job",
      },
    ],

    jobs_applied: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

//----------------password hashing----------------
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrytjs.hash(this.password, 10);
});

//---------------Method to compare passwords---------------
UserSchema.method("comparePasswords", async function (enteredPassword) {
  const isMatch = await bcrytjs.compare(enteredPassword, this.password);
  return isMatch;
});

//-----------method to return a jwt token when loging IN -----------
UserSchema.method("getJWTtoken", function () {
  return JWT.sign(
    { id: this._id, name: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
});

module.exports = mongoose.model("User", UserSchema);
