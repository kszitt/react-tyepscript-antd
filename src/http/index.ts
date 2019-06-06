import axios, {AxiosPromise} from "axios";
import {message} from "antd"


axios.interceptors.request.use(function (config) {
  if(!axios.defaults.headers.common['Authorization'] && localStorage.getItem("TOKEN")){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("TOKEN");
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if(response.data.code == 401){
    message.error("未登录！");
    delete axios.defaults.headers.common['Authorization'];
    return;
  }

  return response;
}, function (error) {
  return Promise.reject(error);
});

interface Result {
  code: number;
  msg?: string;
  result?: [];
}



// 获取验证码
export async function GetCaptcha(){
  let data = await axios.get<string>('/main/api/v1/captcha');
  return data.data;
}


// 获取阶段信息
export async function GetTask() {
  let data = await axios.get<Result>('/startup/api/v1/project/template');
  console.log("data.code", data.data.code);

  return data.data;
}

// 登录
interface LoginParams {
  email: string;
  password: string;
  captcha: string;
  iphone?: number;
}
export async function Login(params: LoginParams){
  return await axios.post('/startup/api/v1/login', params);
}
