const mongoose = require("mongoose");
const validator = require("validator");
const bcrytjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

// title
// description
// comapny_name
// CTC
// exp_needed
// skills_needed
// applications
//     user_id
//     resume_link
// job_status : hiring / closed
const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide job title"],
      minlength: [3, "Please provide job title with more than 3 letters"],
    },

    description: {
      type: String,
    },

    company_name: {
      type: String,
      required: [true, "Please provide a company name"],
    },

    CTC: {
      type: Number,
      required: [true, "Please Enter CTC"],
    },

    exp_needed: {
      min: { type: Number, required: true, default: 0 },
      max: { type: Number, required: true },
    },

    skills_needed: [
      {
        type: String,
      },
    ],

    job_status: {
      type: String,
      required: [true, "Please provide job status"],
      enum: ["hiring", "closed"],
    },

    applications: [
      {
        user_id: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        resume_url: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
