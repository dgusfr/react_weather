import React, { useState } from "react";
import { getWeatherByCity } from "../services/weatherService";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setError(null);
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      console.clear();
    } catch (error) {
      setError("Cidade não encontrada. Tente novamente.");
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
    </div>
  );
}

export default WeatherApp;
