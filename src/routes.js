import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WeatherApp from "./Components/WeatherApp/WeatherApp";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WeatherApp} />
      </Switch>
    </Router>
  );
}

export default Routes;
