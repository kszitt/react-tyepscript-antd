import * as React from "react";
import {connect} from 'react-redux'
import { Component, ReactNode, MouseEvent, ChangeEvent } from 'react'
import {Button} from "antd"
import {RouteProps} from "@public/interface";
import {GetVip} from "@http/about"
import {Http, Page} from "@http/index";


interface VipItems {
  id: number;
  phase_name: string;
  name: string;
}
interface VipObj {
  name: string;
  age: number;
}
interface State {
  vip: VipItems[];
  loadingBtn: string;
}

class AboutBundle extends Component<RouteProps, State> {
  state = {
    vip: [],
    loadingBtn: ""
  };

  componentWillMount(): void {
    console.log("about", this.props.User);
    this.getVip();
  }

  async getVip(): Promise<void> {
    interface Result extends Http {
      result: Page & {items: VipItems[]}
    }

    let data = await GetVip<Result>();
    if(data.code !== 200) return;

    this.setState({
      vip: data.result.items
    });
  }

  go(): void {
     this.props.history.push({
       pathname: '/',
     })
  }

  render(): ReactNode {
    let {vip} = this.state;

    return (
      <div id="about">
        <h1>About组件</h1>
        <Button onClick={() => {this.go()}}>跳转到首页</Button>
        <ul className="members">
          {
            vip.map((item, index) => (
              <li key={item.id}>
                {item.phase_name}
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

export default connect(mapStateToProps)(AboutBundle);
