import axios from "axios";
const API_KEY = "your_api_key";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar dados de previsão.");
  }
};

export const getForecastByCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar previsão estendida.");
  }
};

export const getHourlyForecast = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar previsão horária.");
  }
};
