import React from "react";
import UberLogo from "../assets/UberLogo.png";
import HomeImg from "../assets/HomeImg.jpg";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div
        className="h-screen pt-8 w-full flex justify-between flex-col"
        style={{
          backgroundImage: `url(${HomeImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img className="w-16 ml-5" src={UberLogo} alt="" />
        <div className="bg-white pb-7 py-4 px-5">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded-md mt-5 text-lg"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
