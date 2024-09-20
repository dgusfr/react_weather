import React from "react";

function WeatherDetails({ weatherData }) {
  return (
    <div>
      <h2>
        {weatherData.name}, {weatherData.sys.country}
      </h2>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      />
      <p>Temperatura: {weatherData.main.temp}°C</p>
      <p>Umidade: {weatherData.main.humidity}%</p>
      <p>Condição: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default WeatherDetails;
