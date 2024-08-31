const express = require("express");
const {
  SignUp,
  LogIn,
  LogOut,
  LoadUser,
  ApplyForJob,
  uploadResume,
  removeResume,
} = require("../controllers/UserController");
const { authMiddleware } = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const router = express.Router();

router.route("/signup").post(SignUp);
router.route("/login").post(LogIn);
router.route("/logout").get(authMiddleware, LogOut);

router.route("/me").get(authMiddleware, LoadUser);
router.route("/apply").post(authMiddleware, ApplyForJob);

router.route("/resume/upload").post(authMiddleware, upload, uploadResume);
router.route("/resume/remove").put(authMiddleware, removeResume);

module.exports = router;
