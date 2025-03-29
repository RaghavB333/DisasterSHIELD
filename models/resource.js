import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: String,
  type: String,
  position: {
    lat: Number,
    lng: Number,
  },
});

// Prevent recompiling the model
const Resource = mongoose.models.Resource || mongoose.model("Resource", resourceSchema);

export default Resource;
