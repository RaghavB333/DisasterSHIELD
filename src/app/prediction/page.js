// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Home() {
//   const [city, setCity] = useState("Mumbai"); // Default city
//   const [features, setFeatures] = useState([]);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const cities = ["Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore"]; // Example city list

//   // Fetch city data from MongoDB
//   useEffect(() => {
//     const fetchCityData = async () => {
//       if (!city) return;
//       setLoading(true);
//       setError(null);
      
//       try {
//         const response = await axios.get(`http://localhost:3000/api/resources/city?name=${city}`);
//         setFeatures(response.data.features);
//       } catch (err) {
//         console.error("Error fetching city data:", err);
//         setError("Failed to fetch city data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCityData();
//   }, [city]);

//   // Send selected city features to Flask API
//   const handlePredict = async () => {
//     if (features.length === 0) {
//       setError("No features available for prediction.");
//       return;
//     }

//     setError(null);
//     setLoading(true);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/predict", { features });
//       setPrediction(response.data.prediction * 100); // Convert to percentage
//     } catch (err) {
//       console.error("Prediction error:", err);
//       setError("Error occurred while fetching prediction.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 p-6 text-gray-800">
//       <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg">
//         Flood Risk Prediction
//       </h1>

//       {/* City Selection Dropdown */}
//       <div className="mb-6">
//         <label className="text-lg font-semibold text-white mr-4">Select City:</label>
//         <select
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="px-4 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {cities.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Predict Button */}
//       <button
//         onClick={handlePredict}
//         className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ${
//           features.length === 0 ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         disabled={features.length === 0 || loading}
//       >
//         {loading ? "Loading..." : "Predict Flood Risk"}
//       </button>

//       {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}

//       {/* Prediction Result */}
//       {prediction !== null && (
//         <div className="mt-8 p-6 bg-white rounded-xl shadow-lg text-center border border-gray-200">
//           <h2 className="text-2xl font-semibold text-gray-700">Predicted Flood Risk</h2>
//           <p
//             className={`text-3xl font-bold mt-2 ${
//               prediction > 70
//                 ? "text-red-600"
//                 : prediction > 40
//                 ? "text-orange-500"
//                 : "text-green-600"
//             }`}
//           >
//             {prediction.toFixed(2)}%
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Droplet, AlertTriangle, Map, CloudRain, Loader } from "lucide-react";

export default function Home() {
  const [city, setCity] = useState("Mumbai"); // Default city
  const [features, setFeatures] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const cities = ["Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore"]; // Example city list

  // Fetch city data from MongoDB
  useEffect(() => {
    const fetchCityData = async () => {
      if (!city) return;
      setLoading(true);
      setError(null);
      setPrediction(null);
      
      try {
        const response = await axios.get(`http://localhost:3000/api/resources/city?name=${city}`);
        setFeatures(response.data.features);
      } catch (err) {
        console.error("Error fetching city data:", err);
        setError("Failed to fetch city data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [city]);

  // Send selected city features to Flask API
  const handlePredict = async () => {
    if (features.length === 0) {
      setError("No features available for prediction.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("https://disastershield.onrender.com/predict", { features });
      setPrediction(response.data.prediction * 100); // Convert to percentage
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Error occurred while fetching prediction.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (prediction) => {
    if (prediction > 70) return "High Risk";
    if (prediction > 40) return "Medium Risk";
    return "Low Risk";
  };

  const getRiskColor = (prediction) => {
    if (prediction > 70) return "text-red-600";
    if (prediction > 40) return "text-orange-500";
    return "text-green-600";
  };

  const getBackgroundColor = (prediction) => {
    if (prediction > 70) return "from-red-500 to-red-600";
    if (prediction > 40) return "from-orange-500 to-orange-600";
    return "from-green-500 to-green-600";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* Header with wave effect */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 py-8 px-4 sm:px-6 md:py-12 text-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center z-10 relative">
          <CloudRain className="h-16 w-16 mb-4" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            Flood Risk Prediction
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl opacity-90">
            AI-powered analysis to assess and prepare for potential flooding in major Indian cities
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            className="w-full h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="white"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="white"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="white"
            ></path>
          </svg>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              {/* City Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Map className="h-5 w-5 mr-2 text-blue-600" />
                  Select a City to Analyze
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {cities.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`py-2 px-4 rounded-md transition-all duration-200 text-center ${
                        city === c
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Summary */}
              {features.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">City Risk Factors</h3>
                    <button
                      onClick={() => setShowFeatures(!showFeatures)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      {showFeatures ? "Hide Details" : "View Details"}
                    </button>
                  </div>
                  
                  {showFeatures && (
                    <div className="bg-gray-50 p-4 rounded-lg text-sm mb-4">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Predict Button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={handlePredict}
                  className={`flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    features.length === 0 || loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  disabled={features.length === 0 || loading}
                >
                  {loading ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Predict Flood Risk
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                  <p className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* Prediction Result */}
            {prediction !== null && (
              <div className={`bg-gradient-to-r ${getBackgroundColor(prediction)} p-6 md:p-8 text-white`}>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-1">Predicted Flood Risk for {city}</h2>
                    <p className="opacity-80 mb-4">Based on historical data and current factors</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="text-5xl font-bold">{prediction.toFixed(1)}%</div>
                      <div className="ml-4 bg-white/20 flex justify-center items-center px-3 py-1 rounded-full text-sm font-medium">
                        {getRiskLevel(prediction)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                      <div className="text-2xl font-bold">{getRiskLevel(prediction)}</div>
                      
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <h3 className="font-medium mb-2">Recommendation:</h3>
                  <p className="opacity-90">
                    {prediction > 70
                      ? "High risk of flooding. Prepare emergency evacuation plans and establish contact with local authorities."
                      : prediction > 40
                      ? "Moderate risk of flooding. Monitor weather forecasts closely and prepare basic precautions."
                      : "Low risk of flooding. Normal precautions should be sufficient."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              title="What We Analyze"
              description="Rainfall patterns, drainage capacity, elevation, proximity to water bodies, and historical flood data."
              icon={<Droplet className="h-6 w-6 text-blue-600" />}
            />
            <InfoCard
              title="AI-Powered Prediction"
              description="Our machine learning model uses historical data and current environmental factors to calculate flood probability."
              icon={<AlertTriangle className="h-6 w-6 text-blue-600" />}
            />
            <InfoCard
              title="Stay Prepared"
              description="Use this tool as part of your disaster preparedness plan. Always follow official guidance during emergencies."
              icon={<Map className="h-6 w-6 text-blue-600" />}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-4">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; 2025 Flood Risk Prediction System | Data updated regularly from meteorological sources</p>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({ title, description, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-full mr-4">{icon}</div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}