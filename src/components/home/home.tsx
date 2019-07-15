import * as React from "react";
import {connect} from 'react-redux'
import {message, Button} from "antd"
import {RouteProps} from "@public/interface";
import {GetTask, getUserData} from "@http/home";
import {LoginIn} from "@store/actions/user"
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

  componentWillMount(): void {
    this.getUserData();
  }

  async getUserData(): Promise<void>{
    interface Result extends Http {
      result: {
        email: string
      };
    }

    let data = await getUserData<Result>();
    if(data.code === 200){
      LoginIn({email: data.result.email})(this.props.dispatch);
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
        <h1>Home组件</h1>
        <p>
          <Button onClick={() => {this.go("/about")}}>
            跳转到 About 组件
          </Button>
        </p>
        <p>
          <Button onClick={() => {this.getTask()}}>
            获取数据
          </Button>
        </p>


        <ul>
          {
            template.map((item) => (
              <li key={item.id}>
                {item.value}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps)(Home);
