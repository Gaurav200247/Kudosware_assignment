const customAPIError = require("../errors/customAPIError");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const SendMail = require("../Utils/SendMail");
const User = require("../models/User");

const GetAllJobs = async (req, res, next) => {
  const { title, company_name, CTC, skills_needed, exp_needed } = req.query;

  const queryObj = {};

  if (skills_needed) {
    // Convert skills_needed to an array and trim any whitespace
    const skillsArray = skills_needed.split(",").map((skill) => skill.trim());

    queryObj.skills_needed = { $in: skillsArray };
  }

  if (exp_needed) {
    const { min, max } = exp_needed;

    const minExp = min ? Number(min) : 0;

    if (isNaN(minExp)) {
      throw new customAPIError(
        "Provide a valid minimum experience!",
        StatusCodes.BAD_REQUEST
      );
    }

    if (!max) {
      throw new customAPIError(
        "At least provide the maximum experience required for the job.",
        StatusCodes.BAD_REQUEST
      );
    }

    const maxExp = Number(max);
    if (isNaN(maxExp)) {
      throw new customAPIError(
        "Provide a valid maximum experience!",
        StatusCodes.BAD_REQUEST
      );
    }

    queryObj.exp_needed = {
      $gte: minExp,
      $lte: maxExp,
    };
  }

  if (CTC) {
    CTC = Number(CTC);
    if (isNaN(CTCValue) || CTCValue < 0) {
      throw new customAPIError(
        "Please provide valid CTC",
        StatusCodes.BAD_REQUEST
      );
    } else {
      queryObj.CTC = { $gte: CTCValue };
    }
  }

  if (title) {
    queryObj.title = { $regex: title, $options: "i" };
  }

  if (company_name) {
    queryObj.company_name = { $regex: company_name, $options: "i" };
  }

  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObj).skip(skip).limit(limit);
  let allJobs = await Job.find(queryObj);

  res.status(StatusCodes.OK).json({
    success: true,
    totalHits: allJobs.length,
    nbHits: jobs.length,
    jobs,
  });
};

const GetSingleJob = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new customAPIError("job not Found", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ success: true, job });
};

const PostJob = async (req, res, next) => {
  const { title, description, company_name, CTC, exp_needed, skills_needed } =
    req.body;

  if (CTC < 0) {
    throw new customAPIError(
      "please provide valid CTC",
      StatusCodes.BAD_REQUEST
    );
  }

  if (!exp_needed?.max) {
    throw new customAPIError(
      "please provide max experience needed for the job",
      StatusCodes.BAD_REQUEST
    );
  }

  if (exp_needed.min < 0 || exp_needed.max < 0) {
    throw new customAPIError(
      "please provide experience figure for the job",
      StatusCodes.BAD_REQUEST
    );
  }

  const job = await Job.create({
    title,
    description,
    company_name,
    CTC,
    exp_needed,
    skills_needed,
  });

  const user = await User.findById(req.user.id);

  user.jobs_created.push(job._id);

  await user.save();

  res.json({ success: true, msg: "job created successfully !!", job });
};

const CloseJob = async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    throw new customAPIError("job not Found", StatusCodes.NOT_FOUND);
  }

  // if job has some applicants then send mail to each user applied
  let updatedJob = await Job.findByIdAndUpdate(req.params.id, {
    job_status: "closed",
  });

  res.json({ success: true, msg: "job is now closed !!", job: updatedJob });
};

const UpdateJob = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new customAPIError("job not Found", StatusCodes.NOT_FOUND);
  }

  const jobData = req.body;

  if (jobData?.CTC < 0) {
    throw new customAPIError(
      "please provide valid CTC",
      StatusCodes.BAD_REQUEST
    );
  }

  if (!jobData?.exp_needed?.max) {
    throw new customAPIError(
      "please provide max experience needed for the job",
      StatusCodes.BAD_REQUEST
    );
  }

  if (jobData?.exp_needed.min < 0 || jobData?.exp_needed.max < 0) {
    throw new customAPIError(
      "please provide experience figure for the job",
      StatusCodes.BAD_REQUEST
    );
  }

  // if job has some applicants => then send mail those applicants => to check job updation
  if (job.applications.length > 0) {
    const jobUrl = `http://localhost:4000/api/v1/jobs/${job._id}`;

    const MailData = {
      subject: "kudosware-assignment (YourHR) Job updation",
      msg: `We hope this message finds you well. We wanted to inform you that the job position ${job.title} at ${job.company_name} that you applied for has been updated by the job poster.\n\nPlease view updated job details here ${jobUrl} `,
      html: `
    <div style='
    width: 100%;
    display: column;
    justify-content: space-between;
    align-items: center;'>
    
    <p>Click on the button below to view job details.</p>
    
    <a 
    href=${jobUrl} 
    style='background-color: gold;
    color: black; 
    font-size: 1.2rem; 
    padding: 0.8rem 1.3rem;
    border-radius: 10px; 
    cursor: pointer;
    text-decoration: none;'>
      ${job.title}
    </a>
    
    <p>If you have not requested this mail please ignore it.</p></div>`,
    };

    const applicants = job.applications.map((item) => item.user_id);

    const allApplicants = await User.find({ _id: { $in: applicants } });

    await Promise.all(
      allApplicants.map((applicant) =>
        SendMail({
          email: applicant.email,
          subject: MailData.subject,
          message: MailData.msg,
          html: MailData.html,
        })
      )
    );
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, jobData, {
    runValidators: true,
    new: true,
  });

  res.json({
    success: true,
    msg: "job updated successfully !!",
    job: updatedJob,
  });
};

module.exports = { GetAllJobs, GetSingleJob, PostJob, CloseJob, UpdateJob };
