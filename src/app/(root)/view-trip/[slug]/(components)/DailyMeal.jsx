import React from "react";
import MealCard from "./Cards/MealCard";

const DailyMeal = ({ trip }) => {
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
      <h2 className="text-2xl text-start font-bold mb-8">Daily Meal</h2>
      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">{day?.day} Day Meal</h3>
            {/* Pass the meal_recommendations object directly to MealCard */}
            {day?.meal_recommendations && (
              <MealCard meal={day.meal_recommendations} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyMeal;