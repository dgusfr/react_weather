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

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }
    setLoading(true);
    setWeatherData(null); // Limpar dados antigos
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
    </div>
  );
}

export default WeatherApp;
