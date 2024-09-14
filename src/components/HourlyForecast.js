import React from "react";

function HourlyForecast({ hourlyData }) {
  return (
    <div className="hourly-forecast">
      <h3>Previsão Horária</h3>
      <div className="hourly-list">
        {hourlyData.list.slice(0, 8).map((hour, index) => (
          <div key={index} className="hourly-item">
            <p>
              {new Date(hour.dt_txt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>Temp: {hour.main.temp}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
