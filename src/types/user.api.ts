
import  type { ResponseBody } from "./index.api";
//用户登录入参：
export interface loginFrom {
    username: string,
    password: string
}


//用户登录返回
export interface loginResponse extends ResponseBody{
    data:{
        token:string
    }
}

