import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import CarImg from "../assets/Car.png";
import { FaUser } from "react-icons/fa";
import BikeImg from "../assets/Bike.png";
import AutoImg from "../assets/Auto.png";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="px-3 py-1 flex items-center justify-center mb-2 text-3xl text-gray-300"
      >
        <IoIosArrowDown />
      </h5>
      <div onClick={()=>{props.setConfirmRidePanel(true)}} className="flex w-full mb-2 items-center justify-between p-3 border-2 active:border-black rounded-xl">
        <img className="h-12" src={CarImg} alt="" />
        <div className="w-1/2">
          <h4 className="flex items-center gap-3 font-semibold text-lg">
            UberGo
            <FaUser />4
          </h4>
          <h5 className="font-semibold">2 mins away</h5>
          <p className="font-medium">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">{props.fare.car}</h2>
      </div>

      <div onClick={()=>{setConfirmRidePanel(true)}} className="flex w-full mb-2 items-center justify-between p-3 border-2 active:border-black rounded-xl">
        <img className="h-12" src={BikeImg} alt="" />
        <div className="w-1/2">
          <h4 className="flex items-center gap-3 font-semibold text-lg">
            Moto
            <FaUser />1
          </h4>
          <h5 className="font-semibold">6 mins away</h5>
          <p className="font-medium">Affordable, motercycle ride</p>
        </div>
        <h2 className="text-xl font-semibold">{props.fare.moto}</h2>
      </div>

      <div onClick={()=>{setConfirmRidePanel(true)}} className="flex w-full mb-2 items-center justify-between p-3 border-2 active:border-black rounded-xl">
        <img className="h-12" src={AutoImg} alt="" />
        <div className="w-1/2">
          <h4 className="flex items-center gap-3 font-semibold text-lg">
            UberAuto
            <FaUser />3
          </h4>
          <h5 className="font-semibold">5 mins away</h5>
          <p className="font-medium">Affordable, Auto rides</p>
        </div>
        <h2 className="text-xl font-semibold">{props.fare.car}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
