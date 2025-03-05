import React from "react";
import { LuNotepadText } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://tse3.mm.bing.net/th?id=OIP.Cq9NyAKK3SFpwJhBrNI8cQHaHD&pid=Api&P=0&h=180"
            alt=""
          />
          <h4 className="text-xl font-medium">Harsh</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹2321</h4>
          <p className="text-md text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex mt-6 p-5 bg-gray-200 rounded-xl justify-center gap-5 items-start">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-2">
            <IoIosTimer />
          </h2>
          <h5 className="text-lg">10.2</h5>
          <p className="text-md text-gray-600">Hours Online</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-2">
            <IoSpeedometerOutline />
          </h2>
          <h5 className="text-lg">10.2</h5>
          <p className="text-md text-gray-600">Hours Online</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-2">
            <LuNotepadText />
          </h2>
          <h5 className="text-lg">10.2</h5>
          <p className="text-md text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
