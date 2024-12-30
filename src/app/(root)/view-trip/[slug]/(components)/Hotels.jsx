import React from "react";
import Link from 'next/link'

const Hotels = ({ trip }) => {
  const hotelOptions = trip?.tripData?.["Hotel Options"] || [];
  return (
    <div className="text-start mt-5">
      <h1 className="text-2xl font-bold">Recommended Hotel</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {hotelOptions?.map((hotel, index) => (
           <Link href={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+hotel?.address} target="_blank" >
            <div className=" hover:scale-105 cursor-pointer transition-all">
              <img
                className="rounded-xl"
                src="/goku-dragon-ball-guru.jpg"
                alt="Hootle Img"
              />
              <div className="my-2 flex flex-col gap-1">
                <h2 className="font-medium text-xl">{hotel?.name}</h2>
                <h2 className="text-xs text-gray-600">📍{hotel?.address}</h2>
                <h2 className="text-sm">💰{hotel.price} Per Night</h2>
                <h2 className="text-sm">⭐{hotel?.rating} Stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
