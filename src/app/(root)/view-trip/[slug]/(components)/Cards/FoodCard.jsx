import React from "react";

const FoodCard = ({ food }) => {
  if (!food) return null;
  return (
    <div className="hover:shadow-lg transition-shadow cursor-pointer">
      <div className="bg-white p-4 rounded-lg shadow">
        <h5 className="font-medium text-gray-800 mb-2">🥘Dish: {food.dish}</h5>
        <p className="text-gray-600">📍Place: {food.best_place || "Not specified"}</p>
      </div>
    </div>
  );
};

export default FoodCard;
