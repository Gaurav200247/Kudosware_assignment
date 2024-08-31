import React from "react";
import Navbar from "./Components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import CreateJob from "./Pages/CreateJob";
import ApplyJob from "./Pages/ApplyJob";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const router = createBrowserRouter([
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
  ]);

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Navbar />

      <RouterProvider router={router} />
    </div>
  );
};

export default App;
