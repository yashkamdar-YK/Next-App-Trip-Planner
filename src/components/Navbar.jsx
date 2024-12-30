"use client"
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const navigate = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirect = ()=>{
    navigate("/my-trips")
  }



  const handleLogout = () => {
    // try {
    //   // Perform Google logout
    //   googleLogout();

    //   // Clear localStorage
    //   localStorage.clear();

    //   // Reload Screen
    //   window.location.reload()

    //   // Navigate to home page
    //   navigate("/");
    // } catch (error) {
    //   console.error("Logout error:", error);
    // }
  };

  useEffect(() => {
    console.log(user);
  }, []);

//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => getGoogleUserInfo(codeResp), //console.log(codeResp); contain access_token
//     onError: (error) => console.log(error),
//   });

//   const getGoogleUserInfo = (tokenInfo) => {
//     axios
//       .get(
//         `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo?.access_token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         localStorage.setItem("user", JSON.stringify(res.data));
//         setOpenDailog(false);
//         window.location.reload()
//       });
//   };

  return (
    <div className="flex p-4 shadow-sm px-14 justify-between items-center">
      <div className=" cursor-pointer">
        <h1 onClick={()=>navigate('/')} className="text-2xl font-semibold">Ai-Planner</h1>
      </div>
      <div>
        {user ? (
          <div className="items-center flex gap-5">
            <Button onClick={redirect} className="rounded-full">My Trips</Button>

            <Popover>

              <PopoverTrigger>
                <img
                  src={user?.picture} 
                  alt="UserImage"
                  className="w-[35px] h-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="w-full py-2 mt-2 ">
                {/* <Button onClick={handleLogout}>Logout</Button> */}
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDailog(true)}>Get Started</Button>
        )}
      </div>
      {/* Login Popup */}
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
                // onClick={login}
                className="w-full mt-6 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
