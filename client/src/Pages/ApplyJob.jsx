import React, { useRef, useState } from "react";
import {
  useApplyForJobMutation,
  useLoadUserQuery,
  useRemoveResumeMutation,
} from "../Slices/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSinglejobQuery } from "../Slices/JobSlice";
import { MdPictureAsPdf } from "react-icons/md";
import UploadAndPreviewPdf from "../Components/UploadAndPreviewPdf";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const ApplyJob = () => {
  const { job_id } = useParams();
  const navigate = useNavigate();

  const { isError, data: userData } = useLoadUserQuery();
  const { data: jobData } = useGetSinglejobQuery({
    job_id,
  });

  console.log({ userData });

  const [removeResume] = useRemoveResumeMutation();
  const [applyforjob] = useApplyForJobMutation();

  const ResumeUploadRef = useRef(null);
  const [ResumeFile, setResumeFile] = useState(null);
  const [SelectedResume, setSelectedResume] = useState("");

  const DeleteResume = async ({ resume_public_id }) => {
    const result = await removeResume({ resume_public_id });
    console.log({ result });

    if (result?.error?.data?.msg) {
      toast(result.error.data.msg || "failed to delete resume !!");
    }

    if (result?.data?.success) {
      toast(result.data.msg || "resume deleted succcessfully !!");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const ApplyForTheJob = async (job_id, resume_public_id) => {
    const jobApplication = { job_id, resume_public_id };

    console.log(jobApplication);

    if (!SelectedResume) {
      toast("Please Select Resume");
      return;
    }

    const result = await applyforjob(jobApplication);

    if (result?.error?.data?.msg) {
      toast(result.error.data.msg || "failed to apply for job !!");
    }

    if (result?.data?.success) {
      toast(result.data.msg || "succcessfully applied for job !!");

      navigate("/account");
    }
  };

  if (!jobData?.job) {
    return <h1>Something went wrong !!</h1>;
  }

  const {
    _id,
    title,
    skills_needed,
    CTC,
    exp_needed,
    description,
    company_name,
  } = jobData?.job;

  return (
    <div className="flex justify-between items-start w-full min-h-[90vh] bg-green-100">
      <div
        className="job-details-container flex flex-col justify-start items-start w-[50%] min-h-[full] p-8 bg-green-100"
        onClick={() => setSelectedResume("")}
      >
        <p>
          <span className="font-medium">Job Title : </span> <span>{title}</span>
        </p>

        <p>
          <span className="font-medium">Job description : </span>{" "}
          <span>{description || "N/A"}</span>
        </p>

        <p>
          <span className="font-medium">Experience : </span>{" "}
          <span>
            {exp_needed?.min}-{exp_needed?.max} yrs
          </span>
        </p>

        <p>
          <span className="font-medium">Company Name : </span>{" "}
          <span>{company_name}</span>
        </p>

        <p>
          <span className="font-medium">CTC : </span>{" "}
          <span>{CTC <= 0 ? "unpaid" : `${CTC} lpa`} </span>
        </p>

        <div className="w-full flex justify-start items-start">
          <span className="font-medium mr-2 truncate">Skills Needed : </span>

          <div className="flex justify-start items-center flex-wrap">
            {skills_needed?.length > 0 ? (
              skills_needed.map((item, index) => {
                if (index < 3) {
                  return (
                    <span
                      key={index}
                      className="rounded-full bg-green-300 px-2 truncate mr-2"
                    >
                      {item}{" "}
                    </span>
                  );
                }
              })
            ) : (
              <span className="rounded-full bg-green-300 px-2 mr-1">N/A</span>
            )}
          </div>
        </div>
      </div>

      <div className="resume-list-container w-[50%] flex justify-center items-center h-screen bg-blue-100">
        {isError ? (
          <Link
            to="/signup"
            className="rounded-full bg-green-400 font-medium border-2 border-black px-5 py-2 shadow-md hover:bg-green-30 duration-3000"
          >
            SignUp to Apply
          </Link>
        ) : userData?.user?.resumes?.length <= 0 ? (
          <div className="w-full h-full flex flex-col justify-start items-center border-l-2 border-black">
            <p className="text-center my-3">
              No resumes found !! <br />
              To Apply for a job please upload your latest resume.
            </p>

            <UploadAndPreviewPdf
              ResumeFile={ResumeFile}
              setResumeFile={setResumeFile}
              ResumeUploadRef={ResumeUploadRef}
            />
          </div>
        ) : (
          <ul className="all-resumes-list mt-5 flex flex-col justify-start items-center h-full w-full p-8 overflow-y-scroll">
            <h1 className="text-left w-full">Click on Resume to select.</h1>
            {userData?.user?.resumes?.length > 0 &&
              userData?.user?.resumes.map((item) => (
                <li
                  key={item.resume_public_id}
                  className={`w-full border-2 border-black p-3 flex justify-between items-center ${
                    item.resume_public_id === SelectedResume && "bg-green-100"
                  }`}
                  onClick={() => setSelectedResume(item.resume_public_id)}
                >
                  <p className="flex justify-start items-center w-[80%] cursor-pointer">
                    <MdPictureAsPdf className="mr-2 text-red-500" />{" "}
                    <a
                      href={item.resume_url}
                      className="underline hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.resume_title}
                    </a>
                  </p>

                  <button
                    className="text-red-500"
                    onClick={() => DeleteResume(item)}
                  >
                    <AiFillDelete />
                  </button>
                </li>
              ))}

            <button
              className="w-[80%] bg-blue-500 rounded-full hover:bg-blue-700 py-2 text-[0.9rem] mt-3 border-2 border-black hover:border-blue-600 hover:text-white duration-300 disabled:bg-blue-300 disabled:border-white"
              onClick={() => ApplyForTheJob(_id, SelectedResume)}
            >
              Apply
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApplyJob;
