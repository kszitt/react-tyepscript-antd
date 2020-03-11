import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router} from "react-router-dom";
import APP from "@router/router"
import * as moment from 'moment';
import { AppContainer } from 'react-hot-loader';
import {createBrowserHistory} from "history";
const history = createBrowserHistory();
import {Provider} from 'react-redux'
import createStore from './store/index'
const store = createStore();
import {message} from "antd"
message.config({
  duration: 2,
});
import "@http/index"
import "@public/reset.scss";
import "@assets/iconfont/iconfont.css"
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppContainer>
        <APP />
      </AppContainer>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

declare var module:any;
if (module.hot) {
  module.hot.accept();
}


