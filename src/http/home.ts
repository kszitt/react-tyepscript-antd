import axios from "axios";


export async function GetLogin<T>(){
  let data = await axios.get<T>("/api/user", {params: {name: "雷忠丽"}});
  return data.data;
}

export async function PostLogin<T>(){
  let data = await axios.post<T>("/api/login", {aa: "cc"});
  return data.data;
}
