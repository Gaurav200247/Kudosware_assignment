const express = require("express");
const { PostForm } = require("../controllers/FormController");
const router = express.Router();

router.route("/submit").post(PostForm);

module.exports = router;
