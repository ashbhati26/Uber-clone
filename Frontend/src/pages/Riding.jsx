import React from "react";
import { Link } from "react-router-dom";
import CarImg from "../assets/Car.png";
import { CiLocationOn } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const Riding = () => {
  return (
    <div className="h-screen">
        <Link to='/home' className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-5 left-5">
            <h3 className="text-xl font-semibold"><GoHome /></h3>
        </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img className="h-12" src={CarImg} alt="" />
          <div className="text-right">
            <h2 className="text-lg font-medium">Ashish</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">MP 04 BE 1234</h4>
            <p className="text-sm text-gray-600">Load Alto</p>
          </div>
        </div>

        <div className="flex justify-between gap-2 flex-col items-center">
          <div className="w-full mt-5">

            <div className="flex items-center gap-5 p-3 border-b-2">
              <h3 className="text-xl">
                <CiLocationOn />
              </h3>
              <div>
                <h3 className="text-lg font-medium">562/11-1</h3>
                <p className="text-base text-gray-600 -mt-1">
                  E block, Delta 1, Greater Noida
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3">
              <h3 className="text-xl">
                <RiMoneyRupeeCircleFill />
              </h3>
              <div>
                <h3 className="text-lg font-medium">193</h3>
                <p className="text-base text-gray-600 -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a payment</button>
      </div>
    </div>
  );
};

export default Riding;
