import React, { useState } from "react";
import {
  getWeatherByCity,
  getForecastByCity,
} from "../services/weatherService";
import Loader from "./Loader";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weather = await getWeatherByCity(city);
      const forecast = await getForecastByCity(city);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      setError("Erro ao buscar a previsão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-card">
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

      {error && <p className="error">{error}</p>}
      {loading && <Loader />}

      {/* Previsão Atual */}
      {weatherData && (
        <div className="weather-current">
          <h2>
            {weatherData.name} - {weatherData.sys.country}
          </h2>
          <p>{new Date().toLocaleTimeString()}</p>
          <p>{weatherData.weather[0].description}</p>
          <div className="weather-details">
            <p>Humidade: {weatherData.main.humidity}%</p>
            <p>Vento: {weatherData.wind.speed} km/h</p>
            <p>Sensação térmica: {weatherData.main.feels_like}°C</p>
          </div>
        </div>
      )}

      {/* Previsão para os próximos 5 dias */}
      {forecastData && (
        <div className="forecast-container">
          {forecastData.list.slice(0, 5).map((forecast, index) => (
            <div key={index} className="forecast-card">
              <h3>
                {new Date(forecast.dt_txt).toLocaleDateString("pt-BR", {
                  weekday: "long",
                })}
              </h3>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt={forecast.weather[0].description}
              />
              <p>
                {forecast.main.temp_min}° / {forecast.main.temp_max}°
              </p>
              <p>Chuva: {Math.round(forecast.pop * 100)}%</p>{" "}
              {/* Exibindo a probabilidade de chuva */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
