const express = require("express");
const {
  GetAllJobs,
  GetSingleJob,
  PostJob,
  UpdateJob,
} = require("../controllers/JobController");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();

router.route("/jobs").get(GetAllJobs).post(authMiddleware, PostJob);
router.route("/jobs/:id").get(GetSingleJob).put(authMiddleware, UpdateJob);

module.exports = router;
