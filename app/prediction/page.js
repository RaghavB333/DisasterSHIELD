"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [city, setCity] = useState("Mumbai"); // Default city
  const [features, setFeatures] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Fetch city data from MongoDB
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/resources/city?name=${city}`);
        setFeatures(response.data.features);
      } catch (err) {
        console.error("Error fetching city data:", err);
        setError("Failed to fetch city data.");
      }
    };

    fetchCityData();
  }, [city]);

  // Send selected city features to Flask API
  const handlePredict = async () => {
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features: features,
      });
      setPrediction(response.data.prediction * 100); // Convert to percentage
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Error occurred while fetching prediction.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 p-6 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg">
        Flood Risk Prediction
      </h1>

      {/* City Selection (Later, convert to dropdown) */}
      <h2 className="text-xl font-semibold text-white mb-4">Selected City: {city}</h2>

      <button
        onClick={handlePredict}
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
        disabled={features.length === 0}
      >
        Predict Flood Risk
      </button>

      {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}

      {prediction !== null && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg text-center border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700">Predicted Flood Risk</h2>
          <p className={`text-3xl font-bold mt-2 ${prediction > 70 ? "text-red-600" : prediction > 40 ? "text-orange-500" : "text-green-600"}`}>
            {prediction.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}
