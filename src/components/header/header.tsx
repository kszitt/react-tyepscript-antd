import * as React from "react";
import {RouteProps} from "@public/interface";


interface Props extends RouteProps {
  name: string;
}

class Header extends React.Component<Props> {
  componentWillMount(): void {
    console.log("Header name is: ", this.props);
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
