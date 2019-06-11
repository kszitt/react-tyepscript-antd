import {Dispatch} from 'redux'
interface Types {
  type: "LOGIN_IN" | "SIGN_OUT" | "UPDATE_USER";
}
interface ActionFn {
  (obj: object | void): (dispatch: Dispatch) => object
}
export interface UserState {
  name: string;
}




// 登录
export const LoginIn: ActionFn = obj => dispatch => {
  let action: Types = {
    type: "LOGIN_IN",
    ...obj
  };

  return dispatch(action);
};

// 退出
export const SignOut: ActionFn = obj => dispatch => {
  // let type: Type = "SIGN_OUT";
  let action: Types = {
    type: "SIGN_OUT",
    ...obj
  };

  return dispatch(action);
};

// 更新数据
export const UpdateUser: ActionFn = obj => dispatch => {
  let action: Types = {
    type: "UPDATE_USER",
    ...obj
  };

  return dispatch(action);
};
