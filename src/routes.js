import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherApp from "./Components/Tempo/Tempo";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
