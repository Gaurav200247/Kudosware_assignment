import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ _id, title, skills_needed, CTC, company_name }) => {
  return (
    <Link
      to={`/jobs/apply/${_id}`}
      className="w-full rounded-md shadow-sm hover:shadow-md bg-green-100 hover:bg-green-200 flex flex-col justify-between items-start p-5 text-[0.9rem] cursor-pointer"
    >
      <p>
        <span className="font-medium">Job Title : </span> <span>{title}</span>
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

        <div className="grid grid-cols-2 gap-1">
          {skills_needed?.length > 0 ? (
            skills_needed.map((item, index) => {
              if (index < 3) {
                return (
                  <span
                    key={index}
                    className="rounded-full bg-green-300 px-2 truncate"
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
    </Link>
  );
};

export default JobCard;
