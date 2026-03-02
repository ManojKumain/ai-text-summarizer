import axios from "axios";

export const summarizeText = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    // Call Gemini AI API
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [
              { text: `Summarize this: ${text}` }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    // Gemini returns text in candidates → content → parts
    const summary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.json({ summary });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to summarize text" });
  }
};