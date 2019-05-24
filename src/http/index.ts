import axios from "axios";


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
    console.log("未登录！");
    delete axios.defaults.headers.common['Authorization'];
    return;
  }

  return response.data;
}, function (error) {
  return Promise.reject(error);
});




// 获取验证码
export async function GetCaptcha(){
  return await axios.get('/main/api/v1/captcha');
}


// 获取阶段信息
export async function GetTask() {
  return await axios.get('/startup/api/v1/project/template');
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
