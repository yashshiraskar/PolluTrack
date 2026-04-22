import axios from "axios";

export const fetchAQI = async () => {
  const res = await axios.get("http://localhost:4000/aqi");
  return res.data;
};