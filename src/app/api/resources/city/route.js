import  connectDB  from "@/utils/db";
import City from "@/models/city";

export async function GET(req) {
  await connectDB();

  // Extract city name from query params
  const url = new URL(req.url);
  const cityName = url.searchParams.get("name");

  if (!cityName) {
    return new Response(JSON.stringify({ error: "City name is required" }), { status: 400 });
  }

  try {
    const city = await City.findOne({ name: cityName });

    if (!city) {
      return new Response(JSON.stringify({ error: "City not found" }), { status: 404 });
    }

    const features = [
      city.monsoonIntensity, city.topographyDrainage, city.riverManagement, city.deforestation,
      city.urbanization, city.climateChange, city.damsQuality, city.siltation,
      city.agriculturalPractices, city.encroachments, city.ineffectiveDisasterPreparedness,
      city.drainageSystems, city.coastalVulnerability, city.landslides, city.watersheds,
      city.deterioratingInfrastructure, city.populationScore, city.wetlandLoss,
      city.inadequatePlanning, city.politicalFactors
    ];

    return new Response(JSON.stringify({ city: city.name, features }), { status: 200 });
  } catch (error) {
    console.error("Error fetching city data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
