import axios from "axios";
import {Code} from "./index"


// 获取验证码
export async function GetCaptcha(): Promise<string> {
  let data = await axios.get('/main/api/v1/captcha');
  return data.data;
}


// 获取阶段信息
export interface GetTaskItems {
  id: number;
  value: string;
}
interface GetTaskResult extends Code {
  result: GetTaskItems[];
}
export async function GetTask(): Promise<GetTaskResult> {
  let data = await axios.get('/startup/api/v1/project/template');

  return data.data;
}

// 登录
interface LoginParams {
  email: string;
  password: string;
  captcha: string;
  iphone?: number;
}
export async function Login(params: LoginParams) {
  let data = await axios.post('/startup/api/v1/login', params);

  return data.data;
}
