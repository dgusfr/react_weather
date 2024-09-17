import React, { useState } from "react";
import {
  getWeatherByCity,
  getForecastByCity,
} from "../services/weatherService";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const validateCity = (city) => /^[a-zA-Z\s]+$/.test(city.trim());

  if (!validateCity(city)) {
    setError("Por favor, insira o nome de uma cidade válida.");
    return;
  }

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }
    setLoading(true);
    setWeatherData(null);
    setForecastData(null);
    try {
      setError(null);
      const weather = await getWeatherByCity(city);
      const forecast = await getForecastByCity(city);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      setError("Erro ao buscar a previsão.");
    } finally {
      setLoading(false);
    }
    if (error.response && error.response.status === 404) {
      setError("Cidade não encontrada. Verifique o nome e tente novamente.");

      if (error.response && error.response.status === 401) {
        setError("Chave da API inválida. Contate o suporte.");
      }
    }
  };
  setError("Erro de conexão. Tente novamente mais tarde.");

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

      {error && <p className="error">{error}</p>}

      {/* Exibição dos dados atuais */}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>
            Coordenadas: Lat {weatherData.coord.lat}, Lon{" "}
            {weatherData.coord.lon}
            {loading && <Loader />}
          </p>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Sensação térmica: {weatherData.main.feels_like}°C</p>
          <p>Temperatura mínima: {weatherData.main.temp_min}°C</p>
          <p>Temperatura máxima: {weatherData.main.temp_max}°C</p>
          <p>Pressão atmosférica: {weatherData.main.pressure} hPa</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Nuvens: {weatherData.clouds.all}% de cobertura</p>
          {error && <p className="error">{error}</p>}

          {weatherData.rain && (
            <>
              <p>
                Chuva na última 1h:{" "}
                {weatherData.rain["1h"] ? weatherData.rain["1h"] : 0} mm
              </p>
              <p>
                Chuva nas últimas 3h:{" "}
                {weatherData.rain["3h"] ? weatherData.rain["3h"] : 0} mm
              </p>
            </>
          )}
          <p>Fuso horário: UTC {weatherData.timezone / 3600} horas</p>
        </div>
      )}

      {/* Exibição da previsão para os próximos 5 dias */}
      {forecastData && (
        <div>
          <h2>Previsão para os próximos dias</h2>
          {forecastData.list.slice(0, 5).map((forecast, index) => (
            <div key={index}>
              <p>Data: {forecast.dt_txt}</p>
              <p>Temperatura: {forecast.main.temp}°C</p>
              <p>Condição: {forecast.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
