import mongoose from "../db.js";

const summarySchema = new mongoose.Schema({
  text: { type: String, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Summary", summarySchema);