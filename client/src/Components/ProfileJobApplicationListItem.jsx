import React from "react";
import { useGetSinglejobQuery } from "../Slices/JobSlice";

const ProfileJobApplicationListItem = ({ job_id }) => {
  const { data } = useGetSinglejobQuery({ job_id });

  if (data?.job) {
    const { title, company_name } = data?.job;

    return (
      <li>
        <span>{title}</span> at <span>{company_name}</span>
      </li>
    );
  } else {
    return <p>something went wrong</p>;
  }
};

export default ProfileJobApplicationListItem;
