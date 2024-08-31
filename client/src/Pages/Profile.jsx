import React, { useState } from "react";
import { useLoadUserQuery, useRemoveResumeMutation } from "../Slices/UserSlice";
import { Loader } from "../Components/Loader";
import { Link } from "react-router-dom";
import ProfileJobApplicationListItem from "../Components/ProfileJobApplicationListItem";
import ResumeContainer from "../Components/ResumeContainer";
import ProfileJobsCreated from "../Components/ProfileJobsCreated";

const Profile = () => {
  const { isError, data } = useLoadUserQuery();

  if (data?.success && data?.user) {
    const { email, jobs_applied, jobs_created, username, createdAt, resumes } =
      data.user;

    const date = new Date(createdAt);
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getUTCFullYear();
    const joinedDate = `${day} ${month} ${year}`;

    return (
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full p-5 lg:p-10 ">
        {/* user details */}
        <div className="user-container w-[90%] lg:w-[55%] text-[0.9rem]">
          <div className="user-details-container shadow-block  mb-3  bg-blue-100 border-blue-700 text-blue-700">
            <p>
              <span className="font-medium">E-mail : </span>{" "}
              <span className="text-slate-700">{email}</span>
            </p>
            <p>
              <span className="font-medium">Username : </span>{" "}
              <span className="text-slate-700">{username}</span>
            </p>
            <p>
              <span className="font-medium">Joined At : </span>{" "}
              <span className="text-slate-700">{joinedDate}</span>
            </p>
          </div>

          <div className="applied-job-container shadow-block  mb-3 bg-blue-100 border-blue-700 text-blue-700">
            <h1 className="text-[1.3rem] font-medium">
              Your job Applications :{" "}
            </h1>

            <div>
              {jobs_applied?.length <= 0 ? (
                <div>
                  <p>No Current Job Application Found !!</p>
                </div>
              ) : (
                jobs_applied.map((item) => (
                  <ProfileJobApplicationListItem key={item} job_id={item} />
                ))
              )}
            </div>
          </div>

          <div className="created-jobs-container shadow-block  mb-3 bg-blue-100 border-blue-700 text-blue-700 w-full">
            <h1 className="text-[1.3rem] font-medium">Your Posted Jobs : </h1>

            <ul className="flex flex-col justify-between items-start w-full list-disc pl-8 pt-1">
              {jobs_created?.length <= 0 ? (
                <li className="w-full flex flex-col justify-between items-start">
                  <p>You haven't posted any job yet !!</p>
                </li>
              ) : (
                jobs_created.map((item) => (
                  <ProfileJobsCreated key={item} job_id={item} />
                ))
              )}

              <Link
                className="mt-2 bg-blue-800 text-white rounded-full px-5 py-2 shadow-sm border-2 border-blue-950"
                to="/jobs/create"
              >
                Post a Job
              </Link>
            </ul>
          </div>
        </div>

        {/* upload resume */}
        <ResumeContainer resumes={resumes} />
      </div>
    );
  } else if (isError) {
    return <h1>Something went wrong !!</h1>;
  } else {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader />
      </div>
    );
  }
};

export default Profile;
