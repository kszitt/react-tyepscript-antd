import axios from "axios";
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

export interface Page {
  page: number;
  per_page: number;
  total: number;
}
export interface Code {
  code: number;
}
