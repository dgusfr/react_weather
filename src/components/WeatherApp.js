import React, { useState } from "react";
import { getWeatherByCity } from "../services/weatherService";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import CurrentDateTime from "./CurrentDateTime";
import WeatherDetails from "./WeatherDetails";

function WeatherApp() {
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [slowConnection, setSlowConnection] = useState(false);

  const fetchWeather = async () => {
    const timeoutId = setTimeout(() => setSlowConnection(true), 5000);
    try {
      setLoading(true);
      setError(null);
      setSlowConnection(false);
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
      clearTimeout(timeoutId);
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
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </header>

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {weatherData && (
        <div>
          <WeatherDetails weatherData={weatherData} />
          <CurrentDateTime />
        </div>
      )}

      {forecastData && <ForecastDetails forecastData={forecastData} />}
      {hourlyData && <HourlyForecast hourlyData={hourlyData} />}

      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Carregando..." : "Buscar"}
      </button>

      {hourlyForecast && <HourlyForecast hourlyData={hourlyForecast} />}
      {slowConnection && (
        <p className="error">Conexão lenta. Tente novamente.</p>
      )}
    </div>
  );
}

export default WeatherApp;
