import React from "react";
import {
  StarIcon,
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  SparklesIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PlanCard = ({ place }) => {
  return (
    <Card className="overflow-hidden h-full">
      <img
        src="/goku-dragon-ball-guru.jpg"
        alt={place.name}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle className="text-xl">{place.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{place.details}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span>Fee: {place.ticket_pricing}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>Best time: {place.best_time_to_visit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};