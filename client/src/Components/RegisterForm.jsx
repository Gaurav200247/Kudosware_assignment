import React, { useState } from "react";
import { useSignUpMutation } from "../Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const [signup] = useSignUpMutation();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    let userData = {
      username: UserName,
      email: Email,
      password: Password,
    };

    const result = await signup(userData);

    if (result?.error?.data?.msg) {
      toast(result?.error?.data?.msg || "Something went wrong !!");
    }
    if (result?.data?.success) {
      toast(result?.data?.msg || "Account Created Successfully !!");
      setUserName("");
      setPassword("");
      setEmail("");

      navigate("/");
    }
  };

  return (
    <form
      className="flex flex-col justify-between items-center w-full p-10"
      onSubmit={HandleSubmit}
    >
      <div className="flex flex-col justify-between items-start w-full mt-5">
        <label className="text-[0.9rem]">Enter Username : </label>
        <input
          type="text"
          placeholder="Enter Username Here"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-2 py-1 border-2 border-purple-400 rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between items-start w-full mt-5">
        <label className="text-[0.9rem]">Enter Email : </label>
        <input
          type="text"
          placeholder="Enter Email Here"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-2 py-1 border-2 border-purple-400 rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between items-start w-full mt-5">
        <label className="text-[0.9rem]">Enter Password : </label>
        <input
          type="password"
          placeholder="Enter Password Here"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-2 py-1 border-2 border-purple-400 rounded-md"
        />
      </div>

      <button
        type="submit"
        className=" w-full rounded-full shadow-sm hover:shadow-md duration-300 bg-purple-400 hover:bg-purple-500 py-2 mt-8"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
