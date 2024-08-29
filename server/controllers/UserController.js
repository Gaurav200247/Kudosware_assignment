const SendToken = require("../Utils/SendToken");
const customAPIError = require("../errors/customAPIError");
const User = require("../models/User");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    throw new customAPIError(
      "Please provide username !!",
      StatusCodes.BAD_REQUEST
    );
  }

  if (!email) {
    throw new customAPIError(
      "Please provide email !!",
      StatusCodes.BAD_REQUEST
    );
  }

  if (!password) {
    throw new customAPIError(
      "Please provide password !!",
      StatusCodes.BAD_REQUEST
    );
  }

  const userData = {
    username,
    email,
    password,
  };

  console.log("signup");
  let user = await User.findOne({ username, email });

  if (user) {
    throw new customAPIError(
      "Account wuth this email already exists, Try different email to signUp !!"
    );
  }

  let newUser = await User.create(userData);

  SendToken(res, newUser, StatusCodes.CREATED);
};

const LogIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customAPIError(
      "Invalid Email or Password",
      StatusCodes.UNAUTHORIZED
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new customAPIError(
      "Invalid Email or Password",
      StatusCodes.UNAUTHORIZED
    );
  }

  let isPassMatch = await user.comparePasswords(password);

  if (!isPassMatch) {
    throw new customAPIError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
  }

  SendToken(res, user, StatusCodes.OK);
};

const LogOut = async (req, res, next) => {
  res
    .status(StatusCodes.OK)
    .cookie("userToken", null, {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
    })
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

const LoadUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new customAPIError("User not Found", StatusCodes.BAD_REQUEST);
  }

  res.status(StatusCodes.OK).json({ success: true, user });
};

const uploadResume = async (req, res) => {
  const user = await User.findById(req.user.id);

  // get resume data

  // update user.
};

const removeResume = async (req, res) => {
  const { resume_public_id } = req.body;
  const user = await User.findById(req.user.id);

  // find resume

  // remove it

  // update user.
};

const ApplyForJob = async (req, res, next) => {
  const { job_id, resume_public_id } = req.body;

  const user = await User.findById(req.user.id);

  if (user.jobs_applied.includes(job_id)) {
    throw new customAPIError(
      "Already applied for this job !!",
      StatusCodes.BAD_REQUEST
    );
  }

  const job = await Job.findById(job_id);

  if (!job) {
    throw new customAPIError("Job not found !!", StatusCodes.BAD_REQUEST);
  }

  if (resume_public_id) {
    if (!user.resumes.includes(resume_public_id)) {
      throw new customAPIError(
        "Please provide a valid resume !!",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  const index = user.resumes.findIndex(
    (item) => item.resume_public_id === resume_public_id
  );

  if (index == -1) {
    throw new customAPIError("Resume not found !!", StatusCodes.BAD_REQUEST);
  }

  job.applications.push({
    user_id: req.user.id,
    resume_url: user.resumes[index].resume_url,
  });

  user.jobs_applied.push(job._id);

  await job.save();
  await user.save();

  res.json({
    success: true,
    msg: "Successfully applied for the job !!",
    applications: job.applications, // will be commented later
    user_jobs_applied: user.jobs_applied, // will be commented later
  });
};

module.exports = { SignUp, LogIn, LogOut, ApplyForJob, LoadUser };
