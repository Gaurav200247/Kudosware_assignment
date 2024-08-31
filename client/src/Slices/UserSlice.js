import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./BaseURL";

export const UsersAPI = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),

    logIn: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    loadUser: builder.query({
      query: () => {
        let url = `/me`;
        console.log({ url });
        return url;
      },
    }),

    uploadResume: builder.mutation({
      query: (data) => ({
        url: "/resume/upload",
        method: "POST",
        body: data,
      }),
    }),

    removeResume: builder.mutation({
      query: (data) => ({
        url: "/resume/remove",
        method: "PUT",
        body: data,
      }),
    }),

    applyForJob: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useApplyForJobMutation,
  useUploadResumeMutation,
  useRemoveResumeMutation,
  useLoadUserQuery,
} = UsersAPI;
