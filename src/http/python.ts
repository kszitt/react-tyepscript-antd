import axios from "axios";




// 获取用户
export async function GetUser<T>() {
  let data = await axios.get<T>('/api/kszitt/user');

  return data.data;
}

// 添加用户
export async function PostUser<T>(params) {
  let data = await axios.post<T>('/api/kszitt/user', params);

  return data.data;
}
