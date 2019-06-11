import * as React from "react";
import {RouteProps} from "@public/interface";


class AboutBundle extends React.Component<RouteProps> {

  componentWillMount(): void {

  }

  go(): void {
     this.props.history.push({
       pathname: '/',
     })
  }

  render(): React.ReactNode {
    return (
      <h1 id="about">
        <p>About</p>
        <p onClick={() => {this.go()}}>go Home</p>
      </h1>
    );
  }
}

export default AboutBundle;
