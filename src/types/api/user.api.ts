
import type { ResponseBody } from "./common.api";
//用户登录入参：
export interface loginFrom {
    username: string,
    password: string
}


//用户登录返回
export interface loginResponse extends ResponseBody {
    data: string
}

export interface userInfo {
        routes:[],
        buttons:[],
        roles:[],
        name:string,
        avatar:string
}

//用户信息接口返回
export interface userInfoResponse extends ResponseBody{
    data:userInfo
}