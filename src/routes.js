import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherApp from "./components/Tempo/Tempo";
import Footer from "./components/Footer/Footer";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRoutes;
