import React, { useState } from "react";
import { getWeatherByCity } from "../services/weatherService";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

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
    </div>
  );
}
{
  weatherData && (
    <div>
      <h2>{weatherData.name}</h2>
      <p>Temperatura: {weatherData.main.temp}°C</p>
    </div>
  );
}

const handleSearch = () => {
  console.log(`Buscando a previsão para: ${city}`);
};

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

export default WeatherApp;
const [error, setError] = useState(null);
