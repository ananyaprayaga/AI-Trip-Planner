// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIWh9Ki3daot3L3ZWr88JYnExZ66Zey2w",
  authDomain: "ai-trip-planner-40894.firebaseapp.com",
  projectId: "ai-trip-planner-40894",
  storageBucket: "ai-trip-planner-40894.appspot.com",
  messagingSenderId: "942767395376",
  appId: "1:942767395376:web:372162458f8418c086d3f5",
  measurementId: "G-NVX6MWPGFH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);