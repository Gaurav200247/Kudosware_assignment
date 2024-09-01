import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Document, pdfjs, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { GrCheckmark } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useUploadResumeMutation } from "../Slices/UserSlice";
import { toast } from "react-toastify";

const UploadAndPreviewPdf = ({
  ResumeFile,
  setResumeFile,
  ResumeUploadRef,
  refetch,
}) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const [Pages, setPages] = useState(0);
  const [CurrentPage, setCurrentPage] = useState(1);

  const [uploadPDF] = useUploadResumeMutation();

  const HandleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const UploadResume = async () => {
    if (ResumeFile) {
      const myform = new FormData();
      myform.set("resume_pdf", ResumeFile);

      const result = await uploadPDF(myform);
      console.log({ result });

      if (result?.error?.data?.msg) {
        toast(result?.error?.data?.msg || "Something went wrong !!");
      }

      if (result?.data?.success) {
        toast(result?.data?.msg || "The resume uploaded successfully.");

        refetch();
        setResumeFile(null);
      }
    } else {
      toast("Please select resume to upload !!");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    // console.log(numPages);

    setPages(numPages);
  };

  if (ResumeFile) {
    // view or delete PDF
    return (
      <div className="rounded-md w-full h-full  flex flex-col justify-center items-center p-2">
        <Document file={ResumeFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={CurrentPage} width={300} />
        </Document>

        <div className="selection_btns flex justify-center items-center text-white font-medium my-2">
          <button
            className="mr-2 rounded-md p-2 bg-red-500 hover:bg-red-700 border-2 border-red-800 duration-200"
            onClick={() => setResumeFile(null)}
          >
            <AiFillDelete />
          </button>

          <button
            className="rounded-md p-2 bg-blue-600 hover:bg-blue-800 border-2 border-blue-800 duration-200"
            onClick={UploadResume}
          >
            <GrCheckmark />
          </button>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="rounded-full border-2 border-black p-1"
            disabled={CurrentPage <= 1}
            onClick={() => {
              if (CurrentPage < 1) {
                setCurrentPage(1);
              } else {
                setCurrentPage(CurrentPage - 1);
              }
            }}
          >
            <FaAngleLeft />
          </button>
          <p className="font-medium mx-3">
            Page : {CurrentPage} of {Pages}
          </p>
          <button
            className="rounded-full border-2 border-black p-1"
            disabled={CurrentPage >= Pages}
            onClick={() => {
              if (CurrentPage >= Pages) {
                setCurrentPage(Pages);
              } else {
                setCurrentPage(CurrentPage + 1);
              }
            }}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    );
  } else {
    // upload PDF
    return (
      <div
        className="upload-resume-block border-2 border-dashed rounded-md w-[50vw] md:w-[30vw] lg:w-[20vw] h-[50vh] border-green-700 flex flex-col justify-center items-center cursor-pointer hover:bg-green-200 duration-300"
        onClick={() => ResumeUploadRef.current.click()}
      >
        <IoCloudUploadOutline className="text-[3rem] mb-2 " />
        <p className="text-center w-full">Upload your resume here.</p>

        <input
          type="file"
          hidden
          ref={ResumeUploadRef}
          onChange={HandleFileChange}
        />
      </div>
    );
  }
};

export default UploadAndPreviewPdf;
