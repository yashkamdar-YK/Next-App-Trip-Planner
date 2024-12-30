"use client"
import { useState, useRef } from "react";
import axios from "axios";
import {
  SelectBudgetOptions,
  SelectTravelesList,
  API_PROMPT,
} from "@/lib/constant/Options";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { chatSession } from "@/lib/services/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/services/FirebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from 'next/navigation'

function CreatTrip() {
  const [formData, setFormData] = useState({
    location: "",
    placeId: "",
    days: 1,
    budget: "",
    traveler: "",
  });

  const [loading, setLoading] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [openDailog, setOpenDailog] = useState(false);
  const searchTimeoutRef = useRef();

  const navigate = useRouter();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Log each change for debugging
    console.log(`Field ${field} updated to:`, value);
    console.log("Current form data:", formData);
  };

  const handleLocationSearch = async (query) => {
    setLocationSearch(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching locations:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      location: location.display_name,
      placeId: location.place_id,
    }));
    setLocationSearch(location.display_name);
    setSearchResults([]);
    console.log("Selected location:", location);
  };

  // Set Form Data In Local Storage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("tripFormData", JSON.stringify(formData));
    console.log("Final form data submitted:", formData);
    console.log("Form data saved to localStorage");
  };

  //Sign In User
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getGoogleUserInfo(codeResp), //console.log(codeResp); contain access_token
    onError: (error) => console.log(error),
  });
  
  const OnGenerateTrip = async () => {
    try {
      const user = localStorage.getItem("user");
      if (!user) {
        setOpenDailog(true);
        return;
      }

      if (
        !formData?.location ||
        formData?.days > 15 ||
        !formData?.budget ||
        !formData?.traveler
      ) {
        toast("Please Enter All Details.");
        return;
      }

      console.log("Form Data We Get", formData);
      setLoading(true);

      const FINAL_PROMPT = API_PROMPT.replace("{location}", formData?.location)
        .replace("{days}", formData?.days)
        .replace("{budget}", formData?.budget)
        .replace("{traveler}", formData?.traveler)
        .replace("{days}", formData?.days)
        .replace("{location}", formData?.location)
        .replace("{budget}", formData?.budget)
        .replace("{location}", formData?.location)
        .replace("{traveler}", formData?.traveler);

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result.response?.text();

      if (!responseText) {
        throw new Error("Empty response from AI model");
      }

      await saveAiTrip(responseText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveAiTrip = async (tripDataText) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        throw new Error("User not found");
      }

      // Try to parse the AI response as JSON, with error handling
      let parsedTripData;
      try {
        // Remove any potential whitespace or special characters
        const cleanedText = tripDataText.trim();
        parsedTripData = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("Error parsing trip data:", parseError);
        console.log("Raw trip data:", tripDataText);
        throw new Error("Invalid trip data format");
      }

      const docId = Date.now().toString();
      await setDoc(doc(db, "AiTrip", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
      });

      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error(error.message || "Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getGoogleUserInfo = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="text-start sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-20">
      <div>
        <h1 className="text-3xl font-bold">
          Tell us your travel preferences 🏕️🌴
        </h1>
        <p className="text-xl text-zinc-600 mt-3">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-9">
        {/* Place */}
        <div className="mt-20">
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <div className="relative">
            <Input
              className="py-5"
              value={locationSearch}
              onChange={(e) => handleLocationSearch(e.target.value)}
              placeholder="Search for a destination..."
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-5 w-5 border-2 border-indigo-500 rounded-full border-t-transparent"></div>
              </div>
            )}
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.place_id}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSelect(result)}
                  >
                    {result.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Days */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            className="py-5"
            placeholder="Ex 3"
            type="number"
            min="1"
            value={formData.days}
            onChange={(e) =>
              handleInputChange("days", parseInt(e.target.value))
            }
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData.budget === item.title ? "border-black shadow-lg" : ""
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-2 mt-5 gap-5">
            {SelectTravelesList.map((item) => (
              <div
                key={item.id}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData.traveler === item.people
                    ? "border-black shadow-lg"
                    : ""
                }`}
                onClick={() => handleInputChange("traveler", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 justify-end flex">
          <Button disabled={loading} type="submit" onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img className="" src="/logo.svg" alt="Logo" />
                <h2 className="font-bold text-lg text-black mt-7">
                  Sign In With Google
                </h2>
                <p>Sign In to the App with Google authentication securely</p>
                <Button
                  disabled={loading}
                  onClick={login}
                  className="w-full mt-6 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </form>

      {/* Debug Information (optional - remove in production) */}
      {/* <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">Current Form Data:</h3>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div> */}
    </div>
  );
}

export default CreatTrip;
