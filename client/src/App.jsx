import React from "react";
import Navbar from "./Components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import CreateJob from "./Pages/CreateJob";
import ApplyJob from "./Pages/ApplyJob";
import Layout from "./layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/account",
          element: <Profile />,
        },

        {
          path: "/jobs/create",
          element: <CreateJob />,
        },

        {
          path: "/jobs/apply/:job_id",
          element: <ApplyJob />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
