import * as React from "react"
import {Suspense} from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import Config from "./config";
import {RouteObj} from "@router/config";


interface RouteChild extends RouteObj{
  routes?: RouteObj[]
}
export interface RouteMapProps{
  routes: RouteChild[]
  redirect?: boolean;
}
export class RouteMap extends React.Component<RouteMapProps> {
  render(){
    let {routes=[], redirect=false} = this.props;

    return (
      <Switch>
        {
          routes.map(item => (
            <Route key={item.path}
                   path={item.path}
                   exact={item.exact}
                   component={
                     props => (
                       <item.component {...props}
                                       routes={item.routes}/>
                     )
                   } />
          ))
        }
        {
          redirect ?
            <Redirect to={{ pathname: "/404" }} /> :
            null
        }
      </Switch>
    )
  }
}


class App extends React.Component {
  render(){

    return (
      <Suspense fallback={null}>
        <RouteMap routes={Config}/>
      </Suspense>
    )
  }
}

export default App;
