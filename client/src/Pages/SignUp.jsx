import React, { useEffect, useState } from "react";
import RegisterForm from "../Components/RegisterForm";
import LoginForm from "../Components/LoginForm";
import { useLoadUserQuery } from "../Slices/UserSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { data } = useLoadUserQuery();

  const [IsRegister, setIsRegister] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.user) {
      navigate("/account");
    }
  }, [navigate, data]);

  return (
    <div className="flex justify-center items-start w-full min-h-screen bg-green-100">
      <div className="form-block w-[90%] md:w-[70%] lg:w-[40%] rounded-md shadow-md min-h-[30vh] mt-14 bg-white flex-col justify-between items-center overflow-hidden">
        <div className="form-toggle-btns-container flex justify-center items-center w-full border-b-2 border-black  ">
          <button
            className={`w-[50%] border-r-2 border-black duration-300 py-3 ${
              IsRegister ? "bg-purple-300" : "hover:bg-purple-100"
            }`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
          <button
            className={`w-[50%] duration-300 py-3  ${
              !IsRegister ? "bg-blue-300" : "hover:bg-blue-100"
            }`}
            onClick={() => setIsRegister(false)}
          >
            LogIn
          </button>
        </div>

        <div className="auth-form-container">
          {IsRegister ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
