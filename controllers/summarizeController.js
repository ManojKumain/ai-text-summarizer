import axios from "axios";
import Summary from "../models/Summary.js";

export const summarizeText = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    // Call Gemini AI
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: `Summarize this: ${text}` }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const summaryText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Save to MongoDB
    const summaryDoc = new Summary({ text, summary: summaryText });
    await summaryDoc.save();

    res.json({ summary: summaryText });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to summarize text" });
  }
};