import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import CarImg from "../assets/Car.png";
import { IoIosArrowDown } from "react-icons/io";

const WaitingForDriver = ({waitingForDriverRef}) => {
  return (
    <div>
      <h5
        onClick={() => {
            waitingForDriverRef(false);
        }}
        className="px-3 py-1 flex items-center justify-center mb-2 text-3xl text-gray-300"
      >
        <IoIosArrowDown />
      </h5>

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
              <FaLocationDot />
            </h3>
            <div>
              <h3 className="text-lg font-medium">562/11-1</h3>
              <p className="text-base text-gray-600 -mt-1">
                E block, Delta 1, Greater Noida
              </p>
            </div>
          </div>

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
    </div>
  );
};

export default WaitingForDriver;
