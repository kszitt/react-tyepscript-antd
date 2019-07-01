import * as React from "react"
import {Suspense, lazy, Component} from 'react'
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {createBrowserHistory} from "history";
import Config from "./config";
import ComponentByUser from "./componentByUser"
const history = createBrowserHistory();
const Header = lazy(() => import("@components/header/header"));
const Sidebar = lazy(() => import("@components/sidebar/sidebar"));




class Routers extends Component {
  componentWillMount(): void {
    // console.log("Routers");
  }

  render(){
    return (
      <Router history={history}>
        <Route render={(props) =>
          <Suspense fallback={null}>
            <ComponentByUser Component={Header} props={{...props}}/>
            <ComponentByUser Component={Sidebar} props={{...props}}/>
            <Switch>
              {
                Config.map(item => (
                  <Route key={item.path}
                         path={item.path}
                         exact={!item.exact}
                         component={
                           props => (
                             <item.component {...props}/>
                           )
                         }/>
                ))
              }
              <Redirect to={{pathname: "/"}}/>
            </Switch>
          </Suspense>
        }/>
      </Router>
    )
  }
}

export default Routers;
