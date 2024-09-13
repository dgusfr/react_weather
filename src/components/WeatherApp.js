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

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }
    setLoading(true);
    setWeatherData(null);
    setForecastData(null);
    setHourlyData(null);
    try {
      setError(null);
      const weather = await getWeatherByCity(city);
      const forecast = await getForecastByCity(city);
      const hourly = await getHourlyForecastByCity(city);
      setWeatherData(weather);
      setForecastData(forecast);
      setHourlyData(hourly);
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
    </div>
  );
}

export default WeatherApp;
