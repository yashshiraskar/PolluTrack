export interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  co2: number;
  nox: number;
  so2: number;
  carbonEmission: number;
  status: "Good" | "Moderate" | "Hazardous";
  timestamp: string;
}

const mockHistoricalData: AirQualityData[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const aqi = Math.floor(50 + Math.random() * 150);
  return {
    aqi,
    pm25: Math.floor(20 + Math.random() * 80),
    pm10: Math.floor(40 + Math.random() * 100),
    co2: Math.floor(350 + Math.random() * 150),
    nox: Math.floor(10 + Math.random() * 50),
    so2: Math.floor(5 + Math.random() * 40),
    carbonEmission: +(1 + Math.random() * 5).toFixed(1),
    status: aqi < 80 ? "Good" : aqi < 150 ? "Moderate" : "Hazardous",
    timestamp: `${hour.toString().padStart(2, "0")}:00`,
  };
});

export const fetchAirQuality = async (): Promise<AirQualityData> => {
  await new Promise((r) => setTimeout(r, 300));
  const aqi = 135;
  return {
    aqi,
    pm25: 60,
    pm10: 90,
    co2: 420,
    nox: 35,
    so2: 25,
    carbonEmission: 3.1,
    status: "Moderate",
    timestamp: new Date().toLocaleTimeString(),
  };
};

export const fetchHistoricalData = async (): Promise<AirQualityData[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return mockHistoricalData;
};

export const searchCityAQI = async (city: string): Promise<AirQualityData & { city: string }> => {
  await new Promise((r) => setTimeout(r, 500));
  const aqi = Math.floor(30 + Math.random() * 170);
  return {
    city,
    aqi,
    pm25: Math.floor(15 + Math.random() * 80),
    pm10: Math.floor(30 + Math.random() * 110),
    co2: Math.floor(300 + Math.random() * 200),
    nox: Math.floor(10 + Math.random() * 50),
    so2: Math.floor(5 + Math.random() * 35),
    carbonEmission: +(1 + Math.random() * 5).toFixed(1),
    status: aqi < 80 ? "Good" : aqi < 150 ? "Moderate" : "Hazardous",
    timestamp: new Date().toLocaleTimeString(),
  };
};
