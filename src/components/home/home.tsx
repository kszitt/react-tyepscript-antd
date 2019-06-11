import * as React from "react";
import {connect} from 'react-redux'
import {RouteProps} from "@public/interface";
import {GetCaptcha, GetTask, Login, GetTaskItems} from "@http/home";
import {LoginIn} from "@store/actions/user"



interface State {
  captcha: string;
  template: GetTaskItems[]
}


class Home extends React.Component<RouteProps, State> {
  captchaVal: string = "";
  page: number = 10;
  state = {
    captcha: "",
    template: []
  };

  componentWillMount(): void {
    console.log(this.props);
    LoginIn({name: "韩晓雨"})(this.props.dispatch);
    setTimeout(() => {
      console.log(this.props.User);
      console.log(this.props.User.name);
    }, 1000);
  }

  go(): void {
    this.props.history.push({
      pathname: '/about',
    })
  }

  async login(): Promise<void> {
    let params = {
      email: "hanxiaoyu@apluslabs.com",
      password: "apl123",
      captcha: this.captchaVal
    };

    let data = await Login(params);
    // console.log(data);
  }

  async getCaptcha(): Promise<void> {
    let captcha = await GetCaptcha();

    this.setState({
      captcha
    })
  }

  async getTask(): Promise<void> {
    let data = await GetTask();
    if(data.code !== 200) return;

    let template = data.result;


    this.setState({
      template
    })
  }

  render() {
    let {captcha, template} = this.state;

    return (
      <h1 id="home">
        <p>Home</p>
        <p onClick={() => {this.go()}}>go About</p>
        <p onClick={() => {this.getCaptcha()}}>GetCaptcha <img src={captcha} alt=""/></p>
        <p onClick={() => {this.getTask()}}>GetTask</p>
        <input type="text" placeholder="登录验证码" onChange={(e) => {this.captchaVal = e.target.value}}/>
        <p onClick={() => {this.login()}}>快去登录333</p>

        <ul>
          {
            template.map((item) => (
              <li key={item.id}>
                {item.value}
              </li>
            ))
          }
        </ul>
      </h1>
    );
  }
}

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps)(Home);
