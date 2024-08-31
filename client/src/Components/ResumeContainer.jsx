import React, { useRef, useState } from "react";
import UploadAndPreviewPdf from "./UploadAndPreviewPdf";
import { MdPictureAsPdf } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRemoveResumeMutation } from "../Slices/UserSlice";

const ResumeContainer = ({ resumes }) => {
  const ResumeUploadRef = useRef(null);
  const [ResumeFile, setResumeFile] = useState(null);

  const [removeResume] = useRemoveResumeMutation();

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

  return (
    <div className="user-resumes-container shadow-block w-[90%] lg:w-[40%] bg-green-100 text-green-700 border-green-700 text-[0.9rem] flex flex-col justify-between items-center  ">
      {/* upload resume form */}
      <UploadAndPreviewPdf
        ResumeFile={ResumeFile}
        setResumeFile={setResumeFile}
        ResumeUploadRef={ResumeUploadRef}
      />

      {/* all resumes list */}
      {resumes?.length <= 0 ? (
        <p className="text-center my-3">
          No resumes found !! <br />
          To Apply for a job please upload your latest resume.
        </p>
      ) : (
        <ul className="all-resumes-list mt-5 flex flex-col justify-start items-center w-full overflow-y-scroll">
          <h1 className="text-left w-full">Click on title to preview resume</h1>
          {resumes.map((item) => (
            <li
              key={item.resume_public_id}
              className="w-full border-2 border-black p-3 flex justify-between items-center"
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
        </ul>
      )}
    </div>
  );
};

export default ResumeContainer;
