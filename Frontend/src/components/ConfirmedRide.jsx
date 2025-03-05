import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import CarImg from "../assets/Car.png";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const ConfirmedRide = ({setVehicleFound, setConfirmRidePanel}) => {
  return (
    <div>
      <h5
        onClick={() => {
          setConfirmRidePanel(false);
        }}
        className="px-3 py-1 flex items-center justify-center mb-2 text-3xl text-gray-300"
      >
        <IoIosArrowDown />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>

      <div className="flex justify-between gap-2 flex-col items-center">
        <img className="h-20" src={CarImg} alt="" />
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
              <p className="text-base text-gray-600 -mt-1">
                Cash Cash
              </p>
            </div>
          </div>
        </div>

        <button onClick={()=>{
          setVehicleFound(true)
        }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
