import React from "react";

function ForecastDetails({ forecastData }) {
  return (
    <div className="forecast-details">
      <h3>Previsão para os próximos dias</h3>
      <div className="forecast-list">
        {forecastData.list.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>Temperatura: {day.main.temp}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDetails;
