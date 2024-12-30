import React from "react";
import FoodCard from "./Cards/FoodCard";

const LocalFood = ({ trip }) => {
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
    <div className="text-start mt-5 px-4">
      <h1 className="text-2xl font-bold mb-6">Local Food Must-Try</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itinerary.map((dayData, index) => (
          <div key={index} className="space-y-4">
            <h2 className="font-semibold text-lg">{dayData?.day} Day</h2>
            <div className="">
              {/* Handle local_food as a single object */}
              {dayData?.local_food && <FoodCard food={dayData.local_food} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalFood;
