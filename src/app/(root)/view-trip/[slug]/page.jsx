// import React from "react";

// export default async function Page({ params }) {
//   const slug = (await params).slug;
//   return <div>My Post: {slug}</div>;
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/services/FirebaseConfig";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";
import DailyMeal from "../components/DailyMeal";
import LocalFood from "../components/LocalFood";
import Hiddenjems from "../components/Hiddenjems";
// Skeleton Components
const InfoSectionSkeleton = () => (
  <div className="animate-pulse space-y-4 mb-8">
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);
const HotelsSkeleton = () => (
  <div className="animate-pulse space-y-4 mb-8">
    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  </div>
);

const ItinerarySkeleton = () => (
  <div className="animate-pulse space-y-4 mb-8">
    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    ))}
  </div>
);

const GenericSectionSkeleton = () => (
  <div className="animate-pulse space-y-4 mb-8">
    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  </div>
);

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripId && FetchTripData();
  }, [tripId]);

  const FetchTripData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "AiTrip", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        <InfoSectionSkeleton />
        <HotelsSkeleton />
        <ItinerarySkeleton />
        <GenericSectionSkeleton /> {/* DailyMeal */}
        <GenericSectionSkeleton /> {/* LocalFood */}
        <GenericSectionSkeleton /> {/* HiddenGems */}
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily Plans */}
      <Itinerary trip={trip} />
      {/* Daily Meels */}
      <DailyMeal trip={trip} />
      {/* Local Food Must Try */}
      <LocalFood trip={trip} />
      {/* Hidden Gems */}
      <Hiddenjems trip={trip} />
      {/* Footer */}
    </div>
  );
};

export default ViewTrip;
