// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZhTKNaD8h2l_qrDXzONQqpn1Q3FGuxSg",
  authDomain: "ai-trip-planner-6dddf.firebaseapp.com",
  projectId: "ai-trip-planner-6dddf",
  storageBucket: "ai-trip-planner-6dddf.appspot.com",
  messagingSenderId: "192260585778",
  appId: "1:192260585778:web:116ba5e1f1420978c37f2b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
