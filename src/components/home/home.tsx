import * as React from "react";
import {connect} from 'react-redux'
import {message, Button} from "antd"
import {RouteProps} from "@public/interface";
import {GetTask, getUserData} from "@http/home";
import {UpdateUSER, ClearUSER} from "@store/actions/user"
import {Http} from "@http/index";


interface Template {
  id: number;
  value: string;
}
interface State {
  captcha: string;
  template: Template[]
}


class Home extends React.Component<RouteProps, State> {
  state = {
    captcha: "",
    template: []
  };

  UNSAFE_componentWillMount(): void {
    // this.getUserData();
  }

  async getUserData(): Promise<void>{
    interface Result extends Http {
      result: {
        email: string
      };
    }

    let data = await getUserData<Result>();
    if(data.code === 200){
      UpdateUSER({email: data.result.email});
    } else {
      message.error("没有登录");
      this.go("/login")
    }
  }

  go(pathname: string): void {
    this.props.history.push({
      pathname,
    })
  }

  async getTask(): Promise<void> {
    interface Result extends Http {
      result: Template[];
    }

    let data = await GetTask<Result>();
    if(data.code !== 200) return;

    let template = data.result;


    this.setState({
      template
    })
  }

  render() {
    let {template} = this.state;

    return (
      <div id="home">
        <h1>Home组件2222</h1>
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
    },

    // 清空数据
    ClearUSER: () => {
      dispatch(ClearUSER());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
