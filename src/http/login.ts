import axios from "axios";
import {Code} from "@http/index";



// 获取验证码
export async function GetCaptcha<T>(){
  let data = await axios.get<T>('/main/api/v1/captcha');
  return data.data;
}

// 登录
function Post<T extends Code>(url: string, params: object) {
  return new Promise<T>(((resolve, reject) => {
    // setTimeout(() => {
      resolve({code: 200})
    // }, 100)
  }));
}
export async function UserLogin<T>(params) {
  let data = await Post<T>("url", params);

  return data;
}
