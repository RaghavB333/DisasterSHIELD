"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const DEFAULT_CENTER = [30.3165, 78.0322];

const icons = {
  Shelter: L.icon({ iconUrl: "/icons/shelter.png", iconSize: [32, 32] }),
  Hospital: L.icon({ iconUrl: "/icons/hospital.png", iconSize: [32, 32] }),
  "Food Supply": L.icon({ iconUrl: "/icons/food.png", iconSize: [32, 32] }),
};

// Routing Component
const RoutingMachine = ({ start, end }) => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    if (routingControl) {
      map.removeControl(routingControl);
    }

    const control = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      createMarker: () => null, // Hide default markers
    }).addTo(map);

    setRoutingControl(control);

    return () => {
      if (map && routingControl) {
        try {
          map.removeControl(routingControl);
        } catch (error) {
          console.error("Error removing routing control:", error);
        }
      }
    };
  }, [map, start, end]);

  return null;
};

export default function MapComponent() {
  const [resources, setResources] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();

    // Check if Geolocation is available
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      setCurrentLocation(DEFAULT_CENTER); // Fallback to default location
      return;
    }

    // Check location permission status
    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "denied") {
          console.error("Location access denied. Please enable location permissions.");
          setCurrentLocation(DEFAULT_CENTER); // Fallback to default location
        }
      })
      .catch((error) => console.error("Error checking geolocation permissions:", error));

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error(
          "Error getting location:",
          error.message || `Code: ${error.code}`
        );
        alert("Failed to retrieve location. Ensure location services are enabled.");
        setCurrentLocation(DEFAULT_CENTER); // Fallback to default location
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer center={currentLocation || DEFAULT_CENTER} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User Location Marker */}
        {currentLocation && (
          <Marker position={currentLocation} icon={L.icon({ iconUrl: "/icons/user.png", iconSize: [32, 32] })}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {/* Resource Markers */}
        {resources.map((resource) => (
          <Marker
            key={resource._id}
            position={[resource.position.lat, resource.position.lng]}
            icon={icons[resource.type]}
          >
            <Popup>
              <strong>{resource.name}</strong> <br />
              Type: {resource.type} <br />
              <button
                onClick={() => setSelectedResource([resource.position.lat, resource.position.lng])}
                className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
              >
                Get Directions
              </button>
            </Popup>
          </Marker>
        ))}

        {/* Routing if both start and destination exist */}
        {currentLocation && selectedResource && <RoutingMachine start={currentLocation} end={selectedResource} />}
      </MapContainer>
    </div>
  );
}
