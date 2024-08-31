import React from "react";
import { useLoadUserQuery } from "../Slices/UserSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../Slices/BaseURL";

const Navbar = () => {
  const { data } = useLoadUserQuery();

  const LogOut = async () => {
    const result = await axios
      .get(`${BASE_URL}/logout`, {
        withCredentials: true,
      })
      .catch((err) => {
        toast("something went wrong !!");
      });

    if (result?.data?.success) {
      toast(result.data.msg);

      window.location.href = "/";
    }
  };

  return (
    <header className=" flex justify-between items-center px-8 py-3 w-full shadow-md text-lg">
      <a href="/">kudosware-assignment</a>

      <div className="navlinks-container text-[0.9rem] text-blue-500 hover:text-blue-700 underline flex justify-end items-center">
        {!data ? (
          <a href="/signup">Sign Up/ Log In</a>
        ) : (
          <a href="/account">Account</a>
        )}
        {data?.user && (
          <button onClick={LogOut} className=" ml-5 text-[0.9rem] text-red-500">
            Log Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
