import axios from "axios";


export async function GetActivity<T>(){
  let data = await axios.get<T>("/work/api/v1/home/activity");
  return data.data;
}
