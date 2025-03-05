import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const RidePopUp = (props) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-xl">
        <div className="flex items-center gap-2">
          <img
            className="h-14 w-14 object-cover rounded-full"
            src="https://tse3.mm.bing.net/th?id=OIP.H16qEA7qO-s9u75504DPhAHaLH&pid=Api&P=0&h=180"
            alt=""
          />
          <h2 className="text-xl font-medium">Harshita</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex justify-between gap-2 flex-col items-center">
        <div className="w-full mt-3 mb-2">
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

        <div className="flex gap-4 w-full">
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg"
          >
            Ignore
          </button>

          <button onClick={()=> {
            props.setConfirmRidePopupPanel(true);
          }} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
