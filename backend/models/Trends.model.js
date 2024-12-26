import mongoose from "mongoose";

const TrendSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  trends: { type: [String], required: true },
  date: { type: Date, required: true },
  ipAddress: { type: String, required: true },
});

export const Trend = mongoose.model("Trend", TrendSchema);
