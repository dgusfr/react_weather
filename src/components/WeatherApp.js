import React, { useState } from "react";
import {
  getWeatherByCity,
  getForecastByCity,
  getHourlyForecast,
} from "../services/weatherService";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import CurrentDateTime from "./CurrentDateTime";
import ForecastDetails from "./ForecastDetails"; // Certifique-se de importar o componente
import HourlyForecast from "./HourlyForecast"; // Certifique-se de importar o componente

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }
    setLoading(true);
    setWeatherData(null);
    setForecastData(null);
    setHourlyForecast(null);
    try {
      setError(null);
      const weather = await getWeatherByCity(city);
      const forecast = await getForecastByCity(city);
      const hourly = await getHourlyForecast(city);
      setWeatherData(weather);
      setForecastData(forecast);
      setHourlyForecast(hourly);
      console.clear();
    } catch (error) {
      setError("Cidade não encontrada. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <h1>Previsão do Tempo</h1>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? "Carregando..." : "Buscar"}
        </button>
      </header>

      {/* Exibição do estado de carregamento */}
      {loading && <Loader />}

      {/* Exibição de mensagem de erro */}
      {error && <ErrorMessage message={error} />}

      {/* Exibição dos dados de previsão */}
      {weatherData && (
        <div>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Condição: {weatherData.weather[0].description}</p>
          <CurrentDateTime />
        </div>
      )}

      {/* Exibição da previsão estendida */}
      {forecastData && <ForecastDetails forecastData={forecastData} />}

      {/* Exibição da previsão horária */}
      {hourlyForecast && <HourlyForecast hourlyData={hourlyForecast} />}
    </div>
  );
}

export default WeatherApp;
