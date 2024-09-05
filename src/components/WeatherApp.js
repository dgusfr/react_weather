import React, { useState } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");

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
      </header>
    </div>
  );
}

const handleSearch = () => {
  console.log(`Buscando a previsão para: ${city}`);
};

export default WeatherApp;
