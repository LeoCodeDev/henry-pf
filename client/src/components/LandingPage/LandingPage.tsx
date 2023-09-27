import React, { useState } from "react";
import back_image from "../../assets/images/back_landing.jpg";
import { EyeIcon, EyeSlashIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid";

const moskaugrotesk = {
  fontFamily: "Moskau Grotesk ExtraBold, sans-serif",
};

const LandingPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center justify-between bg-cover bg-center w-screen"
      style={{ backgroundImage: `url(${back_image})` }}
    >
      <div className="lg:w-2/5 p-2 lg:h-screen">
        <h1
          className="text-5xl lg:text-6xl mt-6 font-extrabold text-white"
          style={{ color: "#60ad0d", ...moskaugrotesk }}
        >
          HEALTECH
        </h1>
      </div>

      <div className="lg:w-2/5 lg:bg-gray-800 p-10 ml-auto lg:h-screen ">
        <form
          className="bg-gray-300 lg:w-4/5 lg:bg-gray-900 mb-10 mx-auto rounded-3xl"
          style={{ backgroundColor: "#b0b0b0" }}
        >
          <h2
            className="text-3xl p-4 mt-4 font-extrabold"
            style={{ color: "#60ad0d", ...moskaugrotesk }}
          >
            Login
          </h2>
          <hr
            className="mb-6"
            style={{
              borderColor: "#60ad0d",
              borderWidth: "1.5px",
            }}
          />
          <div className="mb-4 p-8 space-y-4 ">
            <input
              style={{ backgroundColor: "#646464" }}
              type="text"
              className="w-full py-2 px-4 text-white rounded-2xl"
              placeholder="User Name"
            />
            <div className="relative">
              <input
                style={{ backgroundColor: "#646464" }}
                type={showPassword ? "text" : "password"}
                className="w-full py-2 px-4 text-white rounded-2xl"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {showPassword ? (
                <EyeIcon
                  className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  style={{ backgroundColor: "#646464" }}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeSlashIcon
                  className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  style={{ backgroundColor: "#646464" }}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="mb-4 p-8 flex-column items-center">
            <div className="flex items-center justify-end space-x-2">
              <p className="font-bold text-gray-700 underline">
                Forgot password
              </p>
              <button
                className="w-20 p-1 h-8 flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: "#06080b"}}
              >
                <ArrowLongRightIcon className="w-20 h-8" style={{ color: "#60ad0d"}} /> 
              </button>
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="w-auto py-2 px-4 flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: "#06080b", color: "#60ad0d" }}
              >
                Create new user
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
