import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from "./router/router"
import {Provider} from 'react-redux'
import createStore from './store/index'
const store = createStore();



ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById("example")
);
