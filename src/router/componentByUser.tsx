import * as React from "react";
import {connect} from 'react-redux'
import {RouteProps} from "@public/interface";


interface Props extends RouteProps {
  Component: React.LazyExoticComponent<any>,
  props?: object
}

class ComponentByUser extends React.Component<Props> {

  componentWillMount(): void {
    console.log("ComponentByUser");
  }

  render() {
    let {User, Component, props={}} = this.props;

    return (
      <div>
        <span>登录后可见的组件：</span>
        {
          User.email ?
            <Component {...props}/> :
            null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps)(ComponentByUser);
