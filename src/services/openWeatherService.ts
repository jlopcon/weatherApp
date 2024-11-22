import axios from "axios";

const API_KEY = "1bcb591af197e9d738c61c2d802fb95a"; // Reemplaza con tu propia API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeather = async (city: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        units: "metric",
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
