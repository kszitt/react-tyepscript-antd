import * as React from "react";
import {RouteProps} from "@public/interface";



class Sidebar extends React.Component<RouteProps> {
  componentWillMount(): void {

  }

  render() {

    return (
      <span id="Sidebar">
        <b>Sidebar组件</b>
      </span>
    );
  }
}

export default Sidebar;
