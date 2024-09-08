import React, { useState } from "react";
import { getWeatherByCity } from "../services/weatherService";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }
    setLoading(true);
    setWeatherData(null);
    try {
      setError(null);
      const data = await getWeatherByCity(city);
      setWeatherData(data);
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
        <button onClick={fetchWeather}>Buscar</button>
      </header>

      {/* Exibição de mensagem de erro */}
      {error && <p>{error}</p>}

      {/* Exibição dos dados de previsão */}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
        </div>
      )}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Condição: {weatherData.weather[0].description}</p>
        </div>
      )}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Condição: {weatherData.weather[0].description}</p>
        </div>
      )}

      {loading && <p>Carregando...</p>}

      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </div>
  );
}

export default WeatherApp;
