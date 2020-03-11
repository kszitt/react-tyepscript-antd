import * as React from "react";
import { connect } from 'react-redux'
import { RouteProps } from "@public/interface";
import { UpdateUSER } from "@store/actions/user"
import "./login.scss"


interface State {}

class Login extends React.Component<RouteProps, State> {
	state = {};

	UNSAFE_componentWillMount(): void {

	}

	render() {
		let { } = this.state;

		return (
			<div id="login">
				login
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
