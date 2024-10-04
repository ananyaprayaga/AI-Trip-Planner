import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from "sonner";
import { chatSession } from '@/service/AIModel';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';  // Import Firebase Firestore configuration
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name = '', value = '') => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Initialize Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  // Monitor form data changes
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Trip generation logic
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      console.log("Dialog opened for authentication");
      setOpenDialog(true);
      return;
    }
    
    // Check if all necessary fields are filled
    if (formData?.noOfDays > 5 && (!formData?.location || !formData?.budget || !formData?.traveler)) {
      toast("Please enter all details.");
      return;
    }

    setLoading(true);

    // Create final prompt for the AI model
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", result?.response?.text());
      
      // Save the AI trip data to Firestore
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to save trip data to Firestore
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    
    // Retrieve user info
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Generate unique document ID based on timestamp
    const docID = Date.now().toString();

    try {
      // Save user preferences and generated trip data in Firestore
      await setDoc(doc(db, "AI Trip Planner", docID), {
        userPreference: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docID
      });
      console.log("Trip saved successfully!");
    } catch (error) {
      console.error("Error saving trip:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to get user profile after login
  const GetUserProfile = (tokenInfo) => {
    console.log("Access Token:", tokenInfo?.access_token);

    if (!tokenInfo?.access_token) {
      console.error("Access token is missing or invalid.");
      return;
    }

    // Fetch user profile using OAuth token
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log('User Data:', resp.data);
      
      // Store user information in localStorage
      localStorage.setItem('user', JSON.stringify(resp.data));
      
      // Close dialog and trigger trip generation
      setOpenDialog(false);
      OnGenerateTrip();
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences!🧳✈️⛱️</h2>
      <p className='mt-3 text-gray-600 text-xl'>
        Provide us with some basic information, and our trip planner will generate an itinerary for you!
      </p>
      <div className='mt-20 flex flex-col gap-10'>
        {/* Destination Input */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); }
            }}
          />
        </div>
        
        {/* Trip Duration Input */}
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days is your trip?</h2>
          <Input
            id="trip-duration"
            name="tripDuration"
            placeholder={'Ex. 3'}
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer 
                    rounded-lg hover:shadow-lg
                    ${formData?.budget === item.title && 'shadow-lg'}
                `}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-600'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companion Selection */}
        <div>
          <h2 className='text-xl my-3 font-medium'>Who are you traveling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className='p-4 border cursor-pointer rounded-lg hover:shadow-lg'
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-600'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className='my-10 justify-end flex'>
        <Button 
          disabled={loading}
          onClick={OnGenerateTrip}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
          ) : 'Generate Trip!'}
        </Button>
      </div>

      {/* Google Authentication Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
              <p>Securely sign in using Google Authentication.</p>
              <Button 
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;





