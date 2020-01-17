interface Types {
  type: "CLEAR_USER" | "UPDATE_USER";
}


// 更新数据
export function UpdateUSER(obj:object){
  let action: Types = {
    type: "UPDATE_USER",
    ...obj
  };
  return action;
}

// 清空数据
export function ClearUSER(){
  let action: Types = {
    type: "CLEAR_USER",
  };
  return action;
}

