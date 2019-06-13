import axios from "axios";
import {Code, Page} from "./index"

export interface VipItems {
  id: number;
  phase_name: string;
  name: string;
}
interface GetVipResult extends Code {
  result: Page & {items: VipItems[]}
}
export async function GetVip(): Promise<GetVipResult> {
  let data = await axios.get('/startup/api/v1/project/3550/schedule/3404');

  return data.data;
}
