import * as React from "react";
import {RouteProps} from "@public/interface";
import {GetCaptcha, GetTask, Login} from "@http/index";



interface TemplateObj {
  id: number;
  value: string;
}
interface State {
  captcha: string;
  template: TemplateObj[]
}


class Home extends React.Component<RouteProps, State> {
  captchaVal: string = "";
  page: number = 10;
  state = {
    captcha: "",
    template: []
  };

  go(){
    this.props.history.push({
      pathname: '/about',
    })
  }

  async login(){
    let params = {
      email: "hanxiaoyu@apluslabs.com",
      password: "apl123",
      captcha: this.captchaVal
    };

    let data = await Login(params);
    // console.log(data);
  }

  async getCaptcha(){
    let captcha = await GetCaptcha();

    this.setState({
      captcha
    })
  }

  async getTask(){
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
        <p onClick={() => {this.login()}}>快去登录222</p>

        <ul>
          {
            template.map((item: TemplateObj) => (
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

export default Home;
