import * as React from "react";

interface Props {
  className?: string;
}
export class Loading extends React.Component<Props> {
  render() {
    let {className} = this.props;

    return (
      <div className={"loading " + (className || "")}>
        <img src={require('./loading.gif')} alt="loading"/>
      </div>
    )
  }
}

export class LoadingLine extends React.Component {
  render() {
    return (
      <img className="loadingLine" src={require('./loading.gif')} alt="loading"/>
    )
  }
}
