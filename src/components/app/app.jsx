import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Scene from "../scene/scene";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" ><Scene /></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
