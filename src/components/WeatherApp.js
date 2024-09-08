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

const handleSearch = () => {
  console.log(`Buscando a previsão para: ${city}`);
};

const fetchWeather = async () => {
  try {
    const data = await getWeatherByCity(city);
    console.log(data);
  } catch (error) {
    console.error("Erro ao buscar a previsão:", error.message);
  }
};

export default WeatherApp;
