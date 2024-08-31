import { configureStore } from "@reduxjs/toolkit";
import { UsersAPI } from "./Slices/UserSlice.js";
import { JobAPI } from "./Slices/JobSlice.js";

export const store = configureStore({
  reducer: {
    [UsersAPI.reducerPath]: UsersAPI.reducer,
    [JobAPI.reducerPath]: JobAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UsersAPI.middleware, JobAPI.middleware),
});
