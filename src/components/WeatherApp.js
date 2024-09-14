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

  const fetchWeather = async () => {
    const timeoutId = setTimeout(
      () => setError("Conexão lenta. Tente novamente."),
      10000
    );
    try {
      setLoading(true);
      setError(null);
      const weather = await getWeatherByCity(city);
      const forecast = await getForecastByCity(city);
      const hourly = await getHourlyForecastByCity(city);
      setWeatherData(weather);
      setForecastData(forecast);
      setHourlyData(hourly);
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

      {/* Exibição do estado de carregamento */}
      {loading && <Loader />}

      {/* Exibição de mensagem de erro */}
      {error && <ErrorMessage message={error} />}

      {/* Exibição dos dados de previsão */}
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
    </div>
  );
}

export default WeatherApp;
