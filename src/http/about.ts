import axios from "axios";



export async function GetVip<T>() {
  let data = await axios.get<T>('/startup/api/v1/project/3550/schedule/3404');

  return data.data;
}
