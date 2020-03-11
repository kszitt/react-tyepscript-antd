import * as React from "react";
import {connect} from 'react-redux'
import {RouteProps} from "@public/interface";
import {UpdateUSER, ClearUSER} from "@store/actions/user"
import "./home.scss"
import {Loading} from "@public/loading/loading";




interface State {}
class Home extends React.Component<RouteProps, State> {
  state = {};

  componentDidMount(): void {

  }

  render() {
    let {} = this.state;

    return (
      <div id="home">
        home1111
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    USER: state.USER
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新数据
    UpdateUSER: (obj) => {
      dispatch(UpdateUSER(obj));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
