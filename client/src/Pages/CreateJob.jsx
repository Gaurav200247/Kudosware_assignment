import React, { useState } from "react";
import { useCreateJobMutation } from "../Slices/JobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateJob = () => {
  const [JobTitle, setJobTitle] = useState("");
  const [Company, setCompany] = useState("");
  const [CTC, setCTC] = useState("");
  const [Skills, setSkills] = useState("");
  const [Min, setMin] = useState(0);
  const [Max, setMax] = useState(1);

  const [postjob] = useCreateJobMutation();
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    let skills_needed = Skills.split(",");

    const data = {
      title: JobTitle,
      company_name: Company,
      CTC,
      skills_needed,
      exp_needed: {
        min: Min,
        max: Max,
      },
    };

    const result = await postjob(data);

    if (result?.error?.data?.msg) {
      toast(result.error.data.msg || "failed to post job !!");
    }

    if (result?.data?.success) {
      toast(result.data.msg || "job posted !!");
      navigate("/account");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen">
      <div className="shadow-block mt-8 w-[80%] bg-blue-100 border-2 border-black">
        <h1 className="w-full text-center text-[1.2rem] underline">Post Job</h1>

        <form onSubmit={HandleSubmit}>
          <div className="flex flex-col justify-between items-start w-full mt-3">
            <label>Enter Job Title : </label>{" "}
            <input
              type="text"
              placeholder="Enter job title here..."
              className="w-full p-1 rounded-md border-2 border-blue-700"
              value={JobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-between items-start w-full mt-3">
            <label>Enter Company Name : </label>{" "}
            <input
              type="text"
              placeholder="Enter Company Name here..."
              className="w-full p-1 rounded-md border-2 border-blue-700"
              value={Company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-between items-start w-full mt-3">
            <label>Enter CTC : </label>{" "}
            <input
              type="number"
              placeholder="Enter CTC here..."
              className="w-full p-1 rounded-md border-2 border-blue-700"
              value={CTC}
              onChange={(e) => setCTC(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-between items-start w-full mt-3">
            <label>Enter Skills Needed (separated by ,) : </label>{" "}
            <input
              type="text"
              placeholder="Enter Skills Needed here..."
              className="w-full p-1 rounded-md border-2 border-blue-700"
              value={Skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-between items-start w-full mt-3">
            <label>Enter Min Exp required : </label>{" "}
            <input
              type="number"
              placeholder="Enter Max Exp required here..."
              className="w-full p-1 rounded-md border-2 border-blue-700"
              value={Min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between items-start w-full mt-3">
            <label>Enter Max Exp required : </label>{" "}
            <input
              type="number"
              placeholder="Enter Max Exp required here..."
              className="w-full p-1 rounded-md border-2 border-blue-700"
              value={Max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 border-2 border-blue-900 py-2 mt-8 rounded-full text-white hover:bg-blue-600"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
