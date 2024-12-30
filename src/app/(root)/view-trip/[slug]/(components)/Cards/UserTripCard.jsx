import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesIcon, MapPinIcon, CalendarIcon } from "lucide-react";
import Link from 'next/link'


const UserTripCard = ({ trip }) => {
  return (
    <Link href={'/view-trip/'+trip?.id}>
    <Card className="hover:shadow-lg mb-4 mt-6 transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <SparklesIcon className="h-6 w-6 mr-2 text-yellow-400" />
          {trip?.userSelection?.location || "Unknown Location"}
        </CardTitle>
      </CardHeader> 
      <CardContent>
        <div className="space-y-2">
          <p className="flex items-center text-gray-600">
            <MapPinIcon className="h-4 w-4 mr-2" />
            Traveler {trip?.userSelection?.traveler || "No description"}
          </p>
          <p className="flex items-center text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Budget {trip.userSelection.budget}
          </p>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default UserTripCard;
