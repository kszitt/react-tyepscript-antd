import * as React from "react";
import {RouteProps} from "@public/interface";



class Header extends React.Component<RouteProps> {
  UNSAFE_componentWillMount(): void {

  }

  render() {

    return (
      <span id="header">
        <b>Header组件</b>
      </span>
    );
  }
}

export default Header;
