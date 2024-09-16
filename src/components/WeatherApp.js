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
    setError(null); // Resetar erro antes da nova busca
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Chave da API inválida. Verifique a chave e tente novamente.");
      } else if (error.response && error.response.status === 404) {
        setError("Cidade não encontrada. Verifique o nome e tente novamente.");
      } else {
        setError("Erro ao buscar a previsão. Tente novamente mais tarde.");
      }
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

      {/* Exibição de erro */}
      {error && <p className="error">{error}</p>}

      {/* Exibição dos dados da previsão */}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Condição: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
