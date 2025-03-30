const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  monsoonIntensity: { type: Number, required: true },
  topographyDrainage: { type: Number, required: true },
  riverManagement: { type: Number, required: true },
  deforestation: { type: Number, required: true },
  urbanization: { type: Number, required: true },
  climateChange: { type: Number, required: true },
  damsQuality: { type: Number, required: true },
  siltation: { type: Number, required: true },
  agriculturalPractices: { type: Number, required: true },
  encroachments: { type: Number, required: true },
  ineffectiveDisasterPreparedness: { type: Number, required: true },
  drainageSystems: { type: Number, required: true },
  coastalVulnerability: { type: Number, required: true },
  landslides: { type: Number, required: true },
  watersheds: { type: Number, required: true },
  deterioratingInfrastructure: { type: Number, required: true },
  populationScore: { type: Number, required: true },
  wetlandLoss: { type: Number, required: true },
  inadequatePlanning: { type: Number, required: true },
  politicalFactors: { type: Number, required: true },
}, { timestamps: true });

const City = mongoose.models.City || mongoose.model("City", citySchema);

module.exports = City;
