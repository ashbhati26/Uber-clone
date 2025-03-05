import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({
  suggestions = [], 
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.displayName);
    } else if (activeField === "destination") {
      setDestination(suggestion.displayName);
    }
  };

  return (
    <div className="mt-12 px-4">
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] p-2 rounded-full">
              <FaLocationDot />
            </h2>
            {/* Access a specific property of the object */}
            <h4 className="font-medium">
              {elem.displayName || "Unnamed Location"}
            </h4>
          </div>
        ))
      ) : (
        <p>No suggestions available</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
