import * as React from "react";
import {connect} from 'react-redux'
import {RouteProps} from "@public/interface";
import {RouteMap, RouteMapProps} from "@router/router";
import "./main.scss"




interface Props extends RouteMapProps, RouteProps{}
class Main extends React.Component<Props> {

  UNSAFE_componentWillMount(): void {

  }

  render() {
    let {routes} = this.props;

    return (
      <div id="main">
        main
        <RouteMap routes={routes}
                  redirect={true}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps)(Main);
