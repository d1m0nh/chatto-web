// @flow

"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import App from "./app";

import configureStore from "./store";

injectTapEventPlugin();

function render(Component) {
  let el = document.getElementById("container");
  ReactDOM.render(
    <Provider store={configureStore()}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Component />
      </MuiThemeProvider>
    </Provider>,
    el
  );
}

render(App);
