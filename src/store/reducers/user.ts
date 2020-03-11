import {Action} from "@store/index"
export interface USERState {
  user_id: number;
  name: string;
  phone: string;
  company_id: number;
  job_title: string|null;
  avatar_url: string|null;
  active: boolean;
  department: string;
  has_password: boolean;
}
const InitState:(USERState|object) = {};



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
