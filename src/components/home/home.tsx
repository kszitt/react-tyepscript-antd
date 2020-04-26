import * as React from "react";
import {connect} from 'react-redux'
import {RouteProps} from "@public/interface";
import {UpdateUSER, ClearUSER} from "@store/actions/user"
import {GetLogin, PostLogin} from "@http/home"
import "./home.scss"





interface State {}
class Home extends React.Component<RouteProps, State> {
  state = {};

  componentDidMount(): void {
    this.getLogin();
    // this.postLogin();
  }

  async getLogin(){
    let data = await GetLogin();
    console.log(data);
  }

  async postLogin(){
    let data = await PostLogin();
    console.log(data);
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
