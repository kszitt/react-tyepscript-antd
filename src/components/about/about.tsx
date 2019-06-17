import * as React from "react";
import { Component, ReactNode, MouseEvent, ChangeEvent } from 'react'
import {message} from "antd"
import {LoadingLine} from "@public/loading/loading"
import {RouteProps} from "@public/interface";
import {GetVip} from "@http/about"


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
    this.getVip();
  }

  async getVip(): Promise<void> {
    let data = await GetVip<VipItems, VipObj>();
    console.log(data);

    let vip = data.result.items;
    let obj = data.result.obj;
    console.log(obj.name);
    console.log(obj.age);
    // console.log(obj.ddd);
    vip.forEach(item => {
      console.log(item.name);
    });
    this.setState({
      vip
    });
  }

  go(): void {
     this.props.history.push({
       pathname: '/',
     })
  }

  click(e: MouseEvent<HTMLDivElement>): void {
    let target = e.target;

    console.log(target);
    console.log(target.innerHTML);
    console.log(target.innerText);
    console.log(target.getAttribute("data-type"));
  }

  change(e: ChangeEvent<HTMLInputElement>): void {
    let target = e.target;

    console.log(target.value);
  }

  render(): ReactNode {
    let {vip, loadingBtn} = this.state;

    return (
      <h1 id="about">
        <span>About</span>
        <span onClick={() => {this.go()}}>go Home</span>
        <div className="caption">
          <p data-type="p" onClick={e => {this.click(e)}}>购买月卡</p>
          <input type="text" onChange={e => {this.change(e)}}/>
        </div>
        <ul className="members">
          {
            vip.map((item, index) => (
              <li key={item.id}>
                {item.phase_name}
              </li>
            ))
          }
        </ul>
      </h1>
    );
  }
}

export default AboutBundle;
