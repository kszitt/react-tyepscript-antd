import axios from "axios";
import {Code} from "./index"


// 获取验证码
export async function GetCaptcha<T>(){
  let data = await axios.get<T>('/main/api/v1/captcha');
  return data.data;
}


// 获取阶段信息
export async function GetTask<T>() {
  interface Result extends Code {
    result: T[];
  }
  let data = await axios.get<Result>('/startup/api/v1/project/template');

  return data.data;
}

// 登录
export async function Login(params) {
  let data = await axios.post<Code>('/startup/api/v1/login', params);

  return data.data;
}
