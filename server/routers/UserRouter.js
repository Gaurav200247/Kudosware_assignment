const express = require("express");
const {
  SignUp,
  LogIn,
  LogOut,
  LoadUser,
  ApplyForJob,
} = require("../controllers/UserController");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();

router.route("/signup").post(SignUp);
router.route("/login").post(LogIn);
router.route("/logout").get(LogOut);

router.route("/me").get(authMiddleware, LoadUser);
router.route("/apply").get(authMiddleware, ApplyForJob);

module.exports = router;
