import * as React from "react";
import {message} from "antd"
import {LoadingLine} from "@public/loading/loading"
import {RouteProps} from "@public/interface";
import {GetVip, VipItems} from "@http/about"

interface State {
  vip: VipItems[];
  loadingBtn: string;
}

class AboutBundle extends React.Component<RouteProps, State> {
  state = {
    vip: [],
    loadingBtn: ""
  };

  componentWillMount(): void {
    this.getVip();
  }

  async getVip(): Promise<void> {
    let data = await GetVip();
    console.log(data);

    let vip = data.result.items;
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

  render(): React.ReactNode {
    let {vip, loadingBtn} = this.state;

    return (
      <h1 id="about">
        <span>About</span>
        <span onClick={() => {this.go()}}>go Home</span>
        <div className="caption">
          <p>购买月卡</p>
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
