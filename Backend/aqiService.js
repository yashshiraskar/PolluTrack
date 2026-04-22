// aqiService.js

const axios = require("axios");
require("dotenv").config();

// -----------------------------
// AQI Breakpoints (PM2.5 & PM10)
// -----------------------------
const breakpoints = {
  pm25: [
    { Clow: 0, Chigh: 30, Ilow: 0, Ihigh: 50 },
    { Clow: 31, Chigh: 60, Ilow: 51, Ihigh: 100 },
    { Clow: 61, Chigh: 90, Ilow: 101, Ihigh: 200 },
    { Clow: 91, Chigh: 120, Ilow: 201, Ihigh: 300 },
    { Clow: 121, Chigh: 250, Ilow: 301, Ihigh: 400 },
    { Clow: 251, Chigh: 500, Ilow: 401, Ihigh: 500 }
  ],
  pm10: [
    { Clow: 0, Chigh: 50, Ilow: 0, Ihigh: 50 },
    { Clow: 51, Chigh: 100, Ilow: 51, Ihigh: 100 },
    { Clow: 101, Chigh: 250, Ilow: 101, Ihigh: 200 },
    { Clow: 251, Chigh: 350, Ilow: 201, Ihigh: 300 },
    { Clow: 351, Chigh: 430, Ilow: 301, Ihigh: 400 },
    { Clow: 431, Chigh: 600, Ilow: 401, Ihigh: 500 }
  ]
};

// -----------------------------
// Calculate AQI
// -----------------------------
function calculateSubIndex(C, ranges) {
  for (let range of ranges) {
    if (C >= range.Clow && C <= range.Chigh) {
      const { Clow, Chigh, Ilow, Ihigh } = range;
      return ((Ihigh - Ilow) / (Chigh - Clow)) * (C - Clow) + Ilow;
    }
  }
  return 0;
}

function calculateAQI(data) {
  const subIndices = [];

  if (data.pm25 !== undefined) {
    subIndices.push(calculateSubIndex(data.pm25, breakpoints.pm25));
  }

  if (data.pm10 !== undefined) {
    subIndices.push(calculateSubIndex(data.pm10, breakpoints.pm10));
  }

  return Math.round(Math.max(...subIndices));
}

// -----------------------------
// AQI Category
// -----------------------------
function getAQICategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
}

// -----------------------------
// Fallback Sensor Data
// -----------------------------
function generateSensorData() {
  return {
    pm25: Number((Math.random() * 300).toFixed(2)),
    pm10: Number((Math.random() * 400).toFixed(2)),
    co: Number((Math.random() * 10).toFixed(2)),
    no2: Number((Math.random() * 200).toFixed(2)),
    so2: Number((Math.random() * 100).toFixed(2)),
    o3: Number((Math.random() * 180).toFixed(2))
  };
}

// -----------------------------
// 🌍 Fetch AQI from AQICN
// -----------------------------
async function getRealTimeAQI() {
  try {
    const response = await axios.get(
      `https://api.waqi.info/feed/geo:19.0615;72.9005/?token=${process.env.AQI_TOKEN}`
    );

    const result = response.data;

    if (result.status !== "ok") {
      throw new Error("API error");
    }

    const data = result.data;
    const iaqi = data.iaqi || {};

    return {
      aqi: data.aqi,
      pm25: iaqi.pm25?.v || 0,
      pm10: iaqi.pm10?.v || 0,
      co: iaqi.co?.v || 0,
      no2: iaqi.no2?.v || 0,
      so2: iaqi.so2?.v || 0,
      o3: iaqi.o3?.v || 0
    };

  } catch (error) {
    console.log("⚠️ API failed, using simulated data");
    return generateSensorData();
  }
}

// -----------------------------
// Generate AQI Data
// -----------------------------
async function generateAQIData() {
  const sensorData = await getRealTimeAQI();
  const aqi = sensorData.aqi || calculateAQI(sensorData);

  return {
    ...sensorData,
    aqi,
    category: getAQICategory(aqi),
    timestamp: new Date().toISOString()
  };
}

// -----------------------------
// 🔮 ML Prediction
// -----------------------------
async function getPrediction(data) {
  try {
    const response = await axios.post("http://localhost:5000/predict", {
      pm25: data.pm25,
      pm10: data.pm10,
      co: data.co,
      no2: data.no2
    });

    return response.data.predicted_aqi;

  } catch (error) {
    console.error("Prediction error:", error.message);
    return null;
  }
}

// -----------------------------
// 🤖 AI Suggestions (Ollama)
// -----------------------------
async function getAISuggestions(data) {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",
        prompt: `
You are an environmental health expert.

AQI: ${data.aqi}
Category: ${data.category}
PM2.5: ${data.pm25}

Provide:
- Health risk
- Who is affected
- Precautions

Keep it short (2-3 lines).
        `,
        stream: false
      }
    );

    return response.data.response;

  } catch (error) {
    console.error("Ollama error:", error.message);
    return "AI unavailable";
  }
}

// -----------------------------
// 🚀 FINAL COMBINED FUNCTION
// -----------------------------
async function generateAQIWithPrediction() {
  const data = await generateAQIData();
  const predicted = await getPrediction(data);

  const fullData = {
    ...data,
    predicted_aqi: predicted
  };

  const aiSuggestions = await getAISuggestions(fullData);

  return {
    ...fullData,
    ai_suggestions: aiSuggestions
  };
}

// -----------------------------
// Dataset Generator
// -----------------------------
async function generateDataset(count = 10) {
  const dataset = [];

  for (let i = 0; i < count; i++) {
    const data = await generateAQIData();
    dataset.push(data);
  }

  return dataset;
}

// -----------------------------
// EXPORTS
// -----------------------------
module.exports = {
  generateAQIData,
  generateDataset,
  calculateAQI,
  getAQICategory,
  generateAQIWithPrediction
};