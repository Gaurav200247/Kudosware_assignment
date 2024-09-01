import React from "react";
import { useLoadUserQuery } from "../Slices/UserSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../Slices/BaseURL";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { data } = useLoadUserQuery();
  const navigate = useNavigate();

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

      navigate("/");
    }
  };

  return (
    <header className=" flex justify-between items-center px-8 py-3 w-full shadow-md text-lg">
      <Link to="/">kudosware-assignment</Link>

      <div className="navlinks-container text-[0.9rem] text-blue-500 hover:text-blue-700 underline flex justify-end items-center">
        {!data ? (
          <Link to="/signup">Sign Up/ Log In</Link>
        ) : (
          <Link to="/account">Account</Link>
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
