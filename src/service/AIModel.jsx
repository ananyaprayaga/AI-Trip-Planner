import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"location\": \"Las Vegas\",\n  \"duration\": 3,\n  \"travelers\": \"Couple\",\n  \"budget\": \"cheap\",\n  \"hotels\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$$\",\n      \"imageUrl\": \"https://www.thed.com/sites/default/files/styles/hotel-room-detail-gallery/public/images/hotel-rooms/standard-king-room.jpg?itok=4j0n_R98\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1423\n      },\n      \"rating\": 4.0,\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street Experience. It features a casino, several restaurants, and a rooftop pool.\"\n    },\n    {\n      \"name\": \"Golden Nugget Las Vegas\",\n      \"address\": \"129 E Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$$$\",\n      \"imageUrl\": \"https://www.goldennugget.com/images/hotel-rooms/deluxe-king-room-01.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1696,\n        \"longitude\": -115.1419\n      },\n      \"rating\": 4.5,\n      \"description\": \"A historic hotel known for its luxurious amenities, including a world-class casino, multiple restaurants, and a shark tank.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$$\",\n      \"imageUrl\": \"https://www.circuscircus.com/sites/default/files/styles/hotel-room-detail-gallery/public/images/hotel-rooms/standard-room.jpg?itok=f4x22l7J\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1172,\n        \"longitude\": -115.1721\n      },\n      \"rating\": 3.5,\n      \"description\": \"A family-friendly hotel with a carnival theme, offering a circus act, amusement rides, and a variety of dining options.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"places\": [\n        {\n          \"name\": \"Fremont Street Experience\",\n          \"details\": \"A pedestrian-friendly street with live entertainment, street performers, and a canopy of LED lights.\",\n          \"imageUrl\": \"https://www.fremontstreetexperience.com/sites/default/files/styles/large_hero_bg/public/2018-06/Fremont-Street-Experience-Aerial-View-06182018.jpg?itok=7iG3571M\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1699,\n            \"longitude\": -115.1423\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Evening (7:00 PM - 11:00 PM)\"\n        },\n        {\n          \"name\": \"The Neon Museum\",\n          \"details\": \"A museum showcasing vintage neon signs from Las Vegas's history.\",\n          \"imageUrl\": \"https://www.neonmuseum.org/sites/default/files/styles/full_width/public/images/gallery-images/IMG_9939.jpg?itok=nL8e7vI1\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1746,\n            \"longitude\": -115.1395\n          },\n          \"ticketPricing\": \"$25\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"Afternoon (2:00 PM - 4:00 PM)\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      {\n        \"name\": \"The Strip\",\n        \"details\": \"The iconic boulevard lined with casinos, hotels, and entertainment venues.\",\n        \"imageUrl\": \"https://www.visitlasvegas.com/sites/default/files/styles/hero_image/public/2018-07/vegas-strip-at-night-las-vegas.jpg?itok=w1x0J_7U\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 5.0,\n        \"timeTravel\": \"All day\"\n      },\n      {\n        \"name\": \"Bellagio Conservatory & Botanical Garden\",\n        \"details\": \"A beautiful indoor garden with elaborate floral displays.\",\n        \"imageUrl\": \"https://www.bellagio.com/content/dam/bellagio/images/conservatory/2023/spring/spring-2023-hero-mobile.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1142,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"timeTravel\": \"Morning (10:00 AM - 12:00 PM)\"\n      }\n    },\n    {\n      \"day\": 3,\n      \"places\": [\n        {\n          \"name\": \"Hoover Dam\",\n          \"details\": \"A massive concrete arch-gravity dam on the Colorado River.\",\n          \"imageUrl\": \"https://www.nps.gov/hdam/learn/photosmultimedia/hoover-dam-grand-canyon-skywalk-bridge-helicopter.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0042,\n            \"longitude\": -114.8906\n          },\n          \"ticketPricing\": \"$30\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"Full Day Trip\"\n        },\n        {\n          \"name\": \"Red Rock Canyon National Conservation Area\",\n          \"details\": \"A scenic desert landscape with hiking trails, rock climbing, and stunning views.\",\n          \"imageUrl\": \"https://www.nps.gov/redr/learn/photosmultimedia/red-rock-canyon-national-conservation-area-desert-landscape.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.2156,\n            \"longitude\": -115.2593\n          },\n          \"ticketPricing\": \"$15\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Afternoon (1:00 PM - 5:00 PM)\"\n        }\n      ]\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });