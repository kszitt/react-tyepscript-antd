import * as React from "react";
import {RouteProps} from "@public/interface";
import {RouteMap, RouteMapProps} from "@router/router";
import "./main.scss"




interface Props extends RouteMapProps, RouteProps{}
interface State {}
class Main extends React.Component<Props, State> {
  state = {};
  is_Mounted:boolean = true;

  UNSAFE_componentWillMount(): void {

  }

  componentWillUnmount(): void {
    this.is_Mounted = false;
  }

  render() {
    let {routes} = this.props;

    return (
      <div id="main">
        {/*<p id="sidebar">sidebar</p>*/}
        <div id="mainBox">
          {/*<p id="header">header</p>*/}
          <RouteMap routes={routes}
                    redirect={true}/>
        </div>
      </div>
    );
  }
}

export default Main;
