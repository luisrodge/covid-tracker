import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Main from "./Views/Main";
import Update from "./Views/Update";
import * as serviceWorker from "./serviceWorker";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/update" component={Update} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
