import * as React from "react";
import {message, Input, Button} from "antd"
import {RouteProps} from "@public/interface";
import {GetCaptcha, UserLogin} from "@http/login"
import {Code} from "@http/index";


interface State {
  captcha: string;
}

class Login extends React.Component<RouteProps, State> {
  state = {
    captcha: ""
  };
  captchaVal:string = "";

  componentWillMount(): void {
    this.getCaptcha();
  }

  async getCaptcha(): Promise<void> {
    let captcha = await GetCaptcha<string>();

    this.setState({
      captcha
    })
  }

  async login(): Promise<void> {
    interface Params {
      email: string;
      password: string;
      captcha: string;
      iphone?: number;
    }
    let params: Params = {
      email: "email",
      password: "password",
      captcha: this.captchaVal,
    };
    if(!params.captcha){
      message.error("请输入验证码");
      return;
    }

    let data = await UserLogin<Code>(params);
    if(data.code === 200){
      message.success("登录成功");
      this.go("/")
    } else {
      message.error("登录失败");
    }
  }

  go(pathname: string): void {
    this.props.history.push({
      pathname,
    })
  }

  render() {
    let {captcha} = this.state;

    return (
      <div id="Login">
        <p>
          {
            captcha ?
              <img src={captcha} alt=""/> :
              null
          }
        </p>
        <Input placeholder="登录验证码"
               onChange={(e) => {
                  this.captchaVal = e.target.value
                }}/>
        <p>
          <Button onClick={() => {this.login()}}>
            点击登录
          </Button>
        </p>
      </div>
    );
  }
}

export default Login;
