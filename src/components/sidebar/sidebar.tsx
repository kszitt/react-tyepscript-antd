import * as React from "react";
import {RouteProps} from "@public/interface";


interface Props extends RouteProps {
  name: string;
}

class Sidebar extends React.Component<Props> {
  componentWillMount(): void {
    console.log("Sidebar name is: ", this.props.name);
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
