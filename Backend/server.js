const express = require("express");
const cors = require("cors");
const aqiService = require("./aqiService");

const app = express();

// ✅ IMPORTANT: put this BEFORE routes
app.use(cors({
  origin: "http://localhost:8080", // your frontend
}));

app.use(express.json());

// API route
app.get("/aqi", async (req, res) => {
  try {
    const data = await aqiService.generateAQIWithPrediction();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});