import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon, ClockIcon, CalendarIcon, MapPinIcon, SparklesIcon } from 'lucide-react';

const HiddenjemsCard = ({ gem }) => {
  if (!gem) return null;

  return (
    <Card className="hover:shadow-lg mb-4 transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <SparklesIcon className="h-6 w-6 mr-2 text-yellow-400" />
          {gem.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{gem.details}</p>
      </CardContent>
    </Card>
  );
};

export default HiddenjemsCard;