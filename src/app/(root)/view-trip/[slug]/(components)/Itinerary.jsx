import React from "react";
import { PlanCard } from "./Cards/PlanCard";

const Itinerary = ({ trip }) => {
  const itinerary = trip?.tripData?.Itinerary || [];
  // console.log(itinerary);

  return (
    <div className="text-start mt-5 px-4">
      <h1 className="text-2xl font-bold mb-6">Daily Itinerary</h1>
      <div className="space-y-8">
        {itinerary?.map((plan, index) => (
          <div key={index} className="space-y-4">
            <h2 className="font-semibold text-lg">{plan?.day} Day</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plan?.places_to_visit?.map((place, placeIndex) => (
                <PlanCard key={placeIndex} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
