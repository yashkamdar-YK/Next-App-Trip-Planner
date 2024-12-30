import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
        {/* Image Container */}
        <figure className="w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9] relative overflow-hidden rounded-xl">
          <img
            src="/goku-dragon-ball-guru.jpg"
            className="w-full h-full object-cover absolute inset-0"
            alt="Main Image"
          />
        </figure>

        {/* Info Container */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-3 w-full sm:w-auto">
            {/* Location */}
            <h2 className="font-bold text-lg sm:text-xl lg:text-2xl truncate">
              {trip?.userSelection?.location}
            </h2>

            {/* Tags Container */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
                📅 {trip?.userSelection?.days} Days
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
                💰 Trip Budget {trip?.userSelection?.budget}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
                👨 No. Of Traveler {trip?.userSelection?.traveler}
              </span>
            </div>
          </div>

          {/* Send Button */}
          <Button className="self-end sm:self-center">
            <IoIosSend className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;