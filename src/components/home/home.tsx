import * as React from "react";
import {RouteProps} from "@public/interface";
import {GetCaptcha, GetTask, Login} from "@http/index";


interface HomeState {
  captcha: any;
  template: object[]
}
interface TemplateObj {
  id: number;
  value: string;
}
// interface

class Home extends React.Component<RouteProps, HomeState> {
  constructor(props){
    super(props);

    this.state = {
      captcha: "",
      template: []
    };
  }

  captchaVal: string;

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
    console.log(data);
  }

  async getCaptcha(){
    let captcha = await GetCaptcha();

    this.setState({
      captcha
    })
  }

  async getTask(){
    let data = await GetTask();
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
        <p onClick={() => {this.getCaptcha()}}>GetCaptcha {captcha}</p>
        <p onClick={() => {this.getTask()}}>GetTask</p>
        <p onClick={() => {this.login()}}>登录</p>
        <input type="text" onChange={(e) => {this.captchaVal = e.target.value}}/>

        <ul>
          {
            template.map((item: any) => (
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
