import axios from "axios";
import {Code} from "@http/index";



// 获取验证码
export async function GetCaptcha<T>(){
  let data = await axios.get<T>('/main/api/v1/captcha');
  return data.data;
}

// 登录
export async function UserLogin<T>(params) {
  let data = await axios.post<T>('/startup/api/v1/login', params);

  return data.data;
}

