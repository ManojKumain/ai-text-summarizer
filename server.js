import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRoute from "./routes/summarize.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/summarize", summarizeRoute);

app.get("/", (req, res) => {
  res.send("AI Text Summarizer Backend Running!");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);