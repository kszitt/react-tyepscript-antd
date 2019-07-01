import * as React from "react";
import {RouteProps} from "@public/interface";



class Header extends React.Component<RouteProps> {
  componentWillMount(): void {

  }

  render() {

    return (
      <span id="Header">
        <b>Header组件</b>
      </span>
    );
  }
}

export default Header;
