// const mongoose = require("mongoose");
// const { connectDB } = require("../../../utils/db");
// const Resource = require("../../../models/resource.js");

// async function seedDatabase() {
//   try {
//     await connectDB();
//     console.log("Database connected!");

//     const sampleData = [
//       { name: "Dehradun Relief Camp", type: "Shelter", position: { lat: 30.3256, lng: 78.0437 } },
//       { name: "Gandhi Road Shelter Home", type: "Shelter", position: { lat: 30.3178, lng: 78.0331 } },
//       { name: "Kargi Chowk Relief Shelter", type: "Shelter", position: { lat: 30.3050, lng: 78.0085 } },
//       { name: "Raipur Community Shelter", type: "Shelter", position: { lat: 30.3452, lng: 78.0596 } },
//       { name: "Indira Market Shelter", type: "Shelter", position: { lat: 30.3251, lng: 78.0412 } },
//       { name: "Dehradun Food Bank", type: "Food Supply", position: { lat: 30.3165, lng: 78.0322 } },
//       { name: "Shivaji Market Food Center", type: "Food Supply", position: { lat: 30.3200, lng: 78.0400 } },
//       { name: "Doon Community Kitchen", type: "Food Supply", position: { lat: 30.3125, lng: 78.0289 } },
//       { name: "Indira Nagar Relief Food Supply", type: "Food Supply", position: { lat: 30.3301, lng: 78.0553 } },
//       { name: "Clock Tower Food Distribution", type: "Food Supply", position: { lat: 30.3249, lng: 78.0421 } },
//       { name: "Max Super Specialty Hospital", type: "Hospital", position: { lat: 30.3429, lng: 78.0544 } },
//       { name: "Shri Mahant Indiresh Hospital", type: "Hospital", position: { lat: 30.3155, lng: 78.0322 } },
//       { name: "CMI Hospital", type: "Hospital", position: { lat: 30.3240, lng: 78.0437 } },
//       { name: "Arihant Hospital", type: "Hospital", position: { lat: 30.3250, lng: 78.0480 } },
//       { name: "Doon Hospital", type: "Hospital", position: { lat: 30.3180, lng: 78.0290 } },
//       { name: "Synergy Institute of Medical Sciences", type: "Hospital", position: { lat: 30.3215, lng: 78.0410 } },
//       { name: "Fortis Escorts Hospital", type: "Hospital", position: { lat: 30.3110, lng: 78.0500 } },
//       { name: "Himalayan Hospital", type: "Hospital", position: { lat: 30.4000, lng: 78.0700 } },
//       { name: "Velmed Hospital", type: "Hospital", position: { lat: 30.3150, lng: 78.0500 } },
//       { name: "Kailash Hospital", type: "Hospital", position: { lat: 30.3255, lng: 78.0430 } },
//       { name: "Luthra Maternity & Infertility Centre", type: "Hospital", position: { lat: 30.3252, lng: 78.0425 } },
//       { name: "Doon MRI & Research Centre", type: "Hospital", position: { lat: 30.3185, lng: 78.0305 } },
//     ];

//     await Resource.insertMany(sampleData);
//     console.log("Data inserted successfully!");
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   } finally {
//     mongoose.connection.close();
//     process.exit();
//   }
// }

// // Run the function
// seedDatabase();


const mongoose = require("mongoose");
const { connectDB } = require("../../../utils/db");
const Resource = require("../../../models/city.js");

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Sample city data
    const cities = [
      {
        name: "Dehradun",
        monsoonIntensity: 8,
        topographyDrainage: 6,
        riverManagement: 6,
        deforestation: 4,
        urbanization: 4,
        climateChange: 6,
        damsQuality: 2,
        siltation: 3,
        agriculturalPractices: 2,
        encroachments: 5,
        ineffectiveDisasterPreparedness: 10,
        drainageSystems: 7,
        coastalVulnerability: 4,
        landslides: 2,
        watersheds: 3,
        deterioratingInfrastructure: 4,
        populationScore: 3,
        wetlandLoss: 2,
        inadequatePlanning: 6,
        politicalFactors: 4,
      },
      {
        name: "Mumbai",
        monsoonIntensity: 9,
        topographyDrainage: 5,
        riverManagement: 7,
        deforestation: 5,
        urbanization: 9,
        climateChange: 7,
        damsQuality: 5,
        siltation: 6,
        agriculturalPractices: 3,
        encroachments: 8,
        ineffectiveDisasterPreparedness: 9,
        drainageSystems: 9,
        coastalVulnerability: 10,
        landslides: 1,
        watersheds: 5,
        deterioratingInfrastructure: 6,
        populationScore: 10,
        wetlandLoss: 4,
        inadequatePlanning: 8,
        politicalFactors: 6,
      },
      {
        name: "Chennai",
        monsoonIntensity: 8,
        topographyDrainage: 4,
        riverManagement: 6,
        deforestation: 3,
        urbanization: 8,
        climateChange: 7,
        damsQuality: 4,
        siltation: 7,
        agriculturalPractices: 3,
        encroachments: 7,
        ineffectiveDisasterPreparedness: 8,
        drainageSystems: 8,
        coastalVulnerability: 10,
        landslides: 2,
        watersheds: 4,
        deterioratingInfrastructure: 6,
        populationScore: 9,
        wetlandLoss: 3,
        inadequatePlanning: 7,
        politicalFactors: 6,
      },
      {
        name: "Kolkata",
        monsoonIntensity: 7,
        topographyDrainage: 5,
        riverManagement: 7,
        deforestation: 4,
        urbanization: 9,
        climateChange: 8,
        damsQuality: 3,
        siltation: 6,
        agriculturalPractices: 4,
        encroachments: 9,
        ineffectiveDisasterPreparedness: 7,
        drainageSystems: 8,
        coastalVulnerability: 10,
        landslides: 1,
        watersheds: 5,
        deterioratingInfrastructure: 7,
        populationScore: 10,
        wetlandLoss: 4,
        inadequatePlanning: 9,
        politicalFactors: 7,
      },
      {
        name: "Bengaluru",
        monsoonIntensity: 6,
        topographyDrainage: 4,
        riverManagement: 5,
        deforestation: 6,
        urbanization: 10,
        climateChange: 9,
        damsQuality: 3,
        siltation: 5,
        agriculturalPractices: 3,
        encroachments: 9,
        ineffectiveDisasterPreparedness: 6,
        drainageSystems: 8,
        coastalVulnerability: 5,
        landslides: 2,
        watersheds: 4,
        deterioratingInfrastructure: 8,
        populationScore: 9,
        wetlandLoss: 3,
        inadequatePlanning: 7,
        politicalFactors: 5,
      },
      {
        name: "Delhi",
        monsoonIntensity: 5,
        topographyDrainage: 3,
        riverManagement: 4,
        deforestation: 7,
        urbanization: 10,
        climateChange: 9,
        damsQuality: 2,
        siltation: 5,
        agriculturalPractices: 3,
        encroachments: 10,
        ineffectiveDisasterPreparedness: 5,
        drainageSystems: 7,
        coastalVulnerability: 3,
        landslides: 2,
        watersheds: 3,
        deterioratingInfrastructure: 9,
        populationScore: 10,
        wetlandLoss: 2,
        inadequatePlanning: 8,
        politicalFactors: 8,
      },
      {
        name: "Hyderabad",
        monsoonIntensity: 6,
        topographyDrainage: 4,
        riverManagement: 5,
        deforestation: 5,
        urbanization: 9,
        climateChange: 7,
        damsQuality: 3,
        siltation: 6,
        agriculturalPractices: 3,
        encroachments: 7,
        ineffectiveDisasterPreparedness: 6,
        drainageSystems: 8,
        coastalVulnerability: 5,
        landslides: 2,
        watersheds: 4,
        deterioratingInfrastructure: 7,
        populationScore: 9,
        wetlandLoss: 3,
        inadequatePlanning: 7,
        politicalFactors: 5,
      }
    ];

    // Clear existing data and insert new data
    await Resource.deleteMany();
    await Resource.insertMany(cities);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Execute the function
seedDatabase();
