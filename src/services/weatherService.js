import axios from "axios";

// URL base da API e chave de API a partir das variáveis de ambiente
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; // Chave retirada do .env

// Função para buscar o clima atual pela cidade
export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "pt",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar dados de previsão.");
  }
};

// Função para buscar a previsão de 5 dias pela cidade
export const getForecastByCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "pt",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar dados de previsão.");
  }
};
