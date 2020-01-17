import * as React from "react";
import {connect} from 'react-redux'
import {message, Input, Button} from "antd"
import {RouteProps} from "@public/interface";
import {GetCaptcha, UserLogin} from "@http/login"
import {UpdateUSER} from "@store/actions/user"
import {Http} from "@http/index";


interface State {
  captcha: string;
}

class Login extends React.Component<RouteProps, State> {
  state = {
    captcha: ""
  };
  captchaVal:string = "";

  UNSAFE_componentWillMount(): void {
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
      email: "hanxiaoyu@apluslabs.com",
      password: "apl123",
      captcha: this.captchaVal,
    };
    if(!params.captcha){
      message.error("请输入验证码");
      return;
    }

    let data = await UserLogin<Http>(params);
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
      <div id="login">
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);
