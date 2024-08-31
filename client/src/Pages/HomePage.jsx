import React, { useState } from "react";
import { useGetAllJobsQuery } from "../Slices/JobSlice";
import { Loader } from "../Components/Loader";
import JobCard from "../Components/JobCard";
import { useLoadUserQuery } from "../Slices/UserSlice";

const HomePage = () => {
  const {} = useLoadUserQuery();

  const [Title, setTitle] = useState("");
  const [Company, setCompany] = useState("");
  const [SkillsArray, setSkillsArray] = useState([]);
  const [Skill, setSkill] = useState("");
  const [CTC, setCTC] = useState("");

  const queryData = {
    title: Title,
    company_name: Company,
    skills_needed: SkillsArray,
    CTC,
  };

  const { isLoading, isError, data } = useGetAllJobsQuery(queryData);

  console.log({ isLoading, isError, data });

  return (
    <div className="w-full flex flex-col justify-between items-center">
      {/* filters */}

      {/* data */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="all-jobs-container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 gap-5">
          {data?.success && data?.jobs?.length > 0 ? (
            data.jobs.map((item) => <JobCard key={item._id} {...item} />)
          ) : (
            <h1>No Jobs Found !!</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
