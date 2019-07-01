import axios from "axios";




// 获取阶段信息
export async function GetTask<T>() {
  let data = await axios.get<T>('/startup/api/v1/project/template');

  return data.data;
}

// 获取用户信息
export async function getUserData<T>() {
  let data = await axios.get<T>('/startup/api/v1/user');

  return data.data;
}
