import {Action} from "@store/index"
const InitState: object = {};



export default function USER(state=InitState, action: Action) {

  let obj = JSON.parse(JSON.stringify(action));
  delete obj.type;

  switch (action.type) {
    // 清空数据
    case 'CLEAR_USER':
      return {};

    // 更新数据
    case 'UPDATE_USER':
      return obj;

    default:
      return state;
  }
}
