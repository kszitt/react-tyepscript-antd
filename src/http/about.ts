import axios from "axios";
import {Code, Page} from "./index"



export async function GetVip<T, O>() {
  interface Result extends Code {
    result: Page & {items: T[], obj: O}
  }
  let data = await axios.get<Result>('/startup/api/v1/project/3550/schedule/3404');

  return data.data;
}
