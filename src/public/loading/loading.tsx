import * as React from "react";

interface Props {
  className?: string;
}
export class Loading extends React.Component<Props> {
  render() {
    let {className} = this.props;

    return (
      <div className={"loading " + (className || "")}>
        <img src={require('./loading.gif')}
             alt="loading"/>
      </div>
    )
  }
}

export class LoadingLine extends React.Component<Props> {
  render() {

    return (
      <img className="loadingLine"
           src={require('./loading.gif')}
           alt="loading"/>
    )
  }
}
export class LoadingLG extends React.Component<Props> {
  render() {
    return (
      <div className='loadingLG' 
        style={{
          position:'fixed',
          top:0,
          bottom:0,
          left:0,
          right:0,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'rgba(0,0,0,0.3)',
          zIndex:9999,
        }}
      >
        <img className="loadingLine"
           src={require('./loading.gif')}
           alt="loading"/>
      </div>
    )
  }
}
