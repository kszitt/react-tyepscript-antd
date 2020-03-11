import {History, Location} from 'history';
import { match } from "react-router";
import {Dispatch} from 'redux'
import {USERState} from "@store/reducers/user"

export interface RouteProps {
  history: History;
  location: Location;
  match: match;
  dispatch?: Dispatch;
  UpdateUSER?: (obj: USERState) => USERState;
  ClearUSER?: () => object;
  USER?: USERState
}

// 获取url中search对象
export function getHttpSearch(){
  let search = location.search,
    obj = {};

  if(search === '') return obj;

  search = search.replace(/^\?/, '');
  search = search.replace(/&/g, '",').replace(/=/g, ': "');
  obj = eval('({' + search + '"})');

  for(let k in obj){
    if(/^\d+$/.test(obj[k])){
      obj[k] = parseFloat(obj[k]);
    }

    if(/%/.test(obj[k])){
      obj[k] = decodeURI(obj[k]);
    }
  }

  return obj;
}

// 将数字用","分割
export function numToString(num:number|string): string{
  if(!num && num !== 0) return "";

  let string = typeof num === "number" ? num.toString() : num;
  return string.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
}

// 判断是哪个浏览器
export function GetBrowser(){
  let userAgent = navigator.userAgent;

  if(/Edge/.test(userAgent)){
    return 'Edge';
  } else if(/Trident/.test(userAgent)){
    return 'IE';
  } else if(/Firefox/.test(userAgent)){
    return 'Firefox';
  } else if(/Version/.test(userAgent)){
    return 'Safari';
  } else if(/Chrome/.test(userAgent)){
    return 'Chrome';
  }
}

export function getStyle(obj:any,attr:string){
  if(!obj) return 0;

  let value;
  if(obj.currentStyle){
    value = obj.currentStyle[attr];
  } else{
    value = document.defaultView.getComputedStyle(obj,null)[attr];
  }

  if(/^\d+/.test(value)) value = parseInt(value);

  return value;
}

