import React from "react";

const MealCard = ({ meal }) => {
  if (!meal) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h5 className="font-medium text-gray-800 mb-2">Breakfast</h5>
          <p className="text-gray-600">{meal.breakfast || 'Not specified'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h5 className="font-medium text-gray-800 mb-2">Lunch</h5>
          <p className="text-gray-600">{meal.lunch || 'Not specified'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h5 className="font-medium text-gray-800 mb-2">Dinner</h5>
          <p className="text-gray-600">{meal.dinner || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;