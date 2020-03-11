import axios from "axios";
import {message} from "antd"
import {GetBrowser} from "@public/interface";
const Browser = GetBrowser();


axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('TOKEN');
    if (token) {
      // 携带token传输
      config.headers['Authorization'] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);

axios.interceptors.response.use(function (response) {
  if(response.data.code == 401){
    message.error("未登录！");
    location.href = "/login";
    return;
  }

  return response;
}, function (error) {
  if(error.response.status === 401){
    location.href = "/login";
    return;
  }
  return Promise.reject(error);
});
if(Browser === 'IE' || Browser === 'Edge'){
  axios.defaults.headers.get['Cache-Control'] = 'no-cache';
  axios.defaults.headers.get['Pragma'] = 'no-cache';
}

// 获取token
export async function GetToken<T>() {
  let data = await axios.get<T>('/main/api/v1/sts/token');

  return data.data;
}

// 获取用户信息
export async function GetUser<T>() {
  let data = await axios.get<T>('/work/api/v1/admin/info');

  return data.data;
}

// 获取用户列表
export async function GetUserAll<T>() {
  let data = await axios.get<T>(`/work/api/v1/company/admin`);

  return data.data;
}

export interface Page {
  page: number;
  per_page: number;
  total?: number;
  has_next: boolean;
}
export interface Http {
  code: number;
  message?: string;
}
