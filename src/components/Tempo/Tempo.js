import React, { useState } from "react";
import { getForecastByCity } from "../../services/weatherService";
import Loader from "../Loader/Loader";
import styles from "./Tempo.module.css";

function WeatherApp() {
  const [city, setCity] = useState("");
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

    setForecastData(null);

    try {
      const forecast = await getForecastByCity(city);

      const filteredForecast = forecast.list.filter((forecastItem) => {
        return forecastItem.dt_txt.includes("12:00:00");
      });

      setForecastData({ filteredForecast });
    } catch (error) {
      setError("Erro ao buscar a previsão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.weatherCard}>
        <h1>Previsão do Tempo</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          disabled={loading || !city}
          className={styles.button}
        >
          {loading ? "Carregando..." : "Buscar"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
        {loading && <Loader />}

        {forecastData && (
          <div>
            <div className={styles.forecastContainer}>
              {forecastData.filteredForecast.map((forecast, index) => (
                <div key={index} className={styles.forecastCard}>
                  <h3>
                    {new Date(forecast.dt_txt).toLocaleDateString("pt-BR", {
                      weekday: "long",
                    })}
                  </h3>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.weather[0].description}
                  />
                  <p>{forecast.main.temp}°C</p>
                  <p>{forecast.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
