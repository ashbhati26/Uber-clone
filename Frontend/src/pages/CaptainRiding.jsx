import React, { useEffect, useRef, useState } from 'react'
import UberLogo from "../assets/UberLogo.png";
import { IoExitOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import gsap from 'gsap';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null)

  useEffect(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img className="w-16 ml-7 mt-7" src={UberLogo} alt="" />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <h3 className="text-xl font-semibold">
            <IoExitOutline />
          </h3>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/5 p-4 flex items-center justify-between bg-yellow-400">
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button onClick={()=>{setFinishRidePanel(true)}} className="bg-green-600 text-white font-semibold py-3 px-8 rounded-lg">Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>

    </div>
  )
}

export default CaptainRiding