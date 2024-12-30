import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/services/FirebaseConfig";
import UserTripCard from "@/view-trip/components/Cards/UserTripCard";

const TripCardSkeleton = () => (
  <div className="bg-white mt-4 rounded-lg shadow-md overflow-hidden">
    <div className="animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 bg-gray-200"></div>
    </div>
  </div>
);

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrip, setUserTrip] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrip();
  }, []);

  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      const q = query(
        collection(db, "AiTrip"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrip(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mt-8 mb-4">My Trips</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {loading ? (
          // Show skeletons while loading
          [...Array(6)].map((_, index) => (
            <TripCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : userTrip.length > 0 ? (
          // Show actual trips when loaded
          userTrip.map((trip) => <UserTripCard key={trip.id} trip={trip} />)
        ) : (
          // Show empty state when no trips
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No trips found</p>
            <button
              onClick={() => navigate("/create-trip")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Your First Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
