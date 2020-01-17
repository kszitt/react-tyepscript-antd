import * as React from "react";



class NotFound extends React.Component {
  UNSAFE_componentWillMount() {
    console.log("404");
  }

  render() {

    return (
      <div id="NotFound">
        <b>404</b>
      </div>
    );
  }
}

export default NotFound;
