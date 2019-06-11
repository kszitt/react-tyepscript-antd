import * as React from 'react'
import {RouteProps} from "@public/interface"
import Loadable from 'react-loadable';
import Loading from "@public/loading/loading"


interface Props {
  component: any;
  routeProps: RouteProps;
}
interface State {
  Component: any;
}


class GetComponent extends React.Component<Props, State> {
  constructor(props){
    super(props);

    this.state = {
      Component: null
    }
  }

  componentWillMount(): void {
    this.get();
  }

  async get(){
    let {component} = this.props;

    try {
      const Component = Loadable({
        loader: component,
        loading: Loading,
      });
      this.setState({
        Component
      });
    } catch (e) {
      console.error(e);
    }
  }

  render(){
    let {Component} = this.state;

    return (
        <Component {...this.props.routeProps}/>
    )
  }
}

export default GetComponent;
