import React, { useState } from "react";
import {
  getWeatherByCity,
  getForecastByCity,
  getHourlyForecast,
} from "../services/weatherService";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import CurrentDateTime from "./CurrentDateTime";
import ForecastDetails from "./ForecastDetails";
import HourlyForecast from "./HourlyForecast";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [hourlyLoading, setHourlyLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }
    setLoading(true);
    setForecastLoading(true);
    setHourlyLoading(true);
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
    } catch (error) {
      setError("Cidade não encontrada. Tente novamente.");
    } finally {
      setLoading(false);
      setForecastLoading(false);
      setHourlyLoading(false);
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

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}

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

      {forecastData && <ForecastDetails forecastData={forecastData} />}

      {hourlyForecast && <HourlyForecast hourlyData={hourlyForecast} />}

      {weatherData && (
        <div>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>Temperatura: {weatherData.main.temp}°C</p>
        </div>
      )}
      {forecastLoading && <Loader />}
      {hourlyLoading && <Loader />}
    </div>
  );
}

export default WeatherApp;
