import React from "react";
import HiddenjemsCard from "./Cards/HiddenjemsCard";

const Hiddenjems = ({ trip }) => {
  const itinerary = trip?.tripData?.Itinerary || [];

  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Daily Itinerary</h2>
        <p className="text-gray-600">No itinerary data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg mt-8 p-6 mb-6">
      <h2 className="text-2xl text-start font-bold mb-8">Some Hidden Gems</h2>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
        {itinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="">
            <h3 className="text-xl font-semibold mb-4">Day {day.day}</h3>
            {day.free_and_hidden_attractions && (
              <div >
                {day.free_and_hidden_attractions.map((gem, gemIndex) => (
                  <HiddenjemsCard key={gemIndex} gem={gem} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hiddenjems;