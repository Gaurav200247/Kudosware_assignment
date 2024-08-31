import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./BaseURL";

export const JobAPI = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
    }),

    getAllJobs: builder.query({
      query: ({
        title = "",
        company_name = "",
        CTC = 0,
        skills_needed = [],
      }) => {
        let url = `/jobs?title=${title}&company_name=${company_name}&skills_needed=${skills_needed}&CTC=${CTC}`;
        console.log({ url });
        return url;
      },
    }),

    getSinglejob: builder.query({
      query: ({ job_id }) => {
        let url = `/jobs/${job_id}`;
        console.log({ url });
        return url;
      },
    }),

    updateJob: builder.mutation({
      query: ({ job_id, updateData }) => ({
        url: `/jobs/${job_id}`,
        method: "PUT",
        body: updateData,
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetSinglejobQuery,
  useUpdateJobMutation,
} = JobAPI;
