
import type { responseBody } from ".";
//用户登录入参：
export interface loginFrom {
    username: string | number,
    password: string | number
}


//用户登录返回
export interface loginResponse extends responseBody {
    data: string
}

export interface userInfo {
        //菜单权限、按钮权限待定
        // routes:[],
        // buttons:[],
        // roles:[],

        name:string,
        // avatar:string

        username: string,
        nickname: string,
        avatar: string,
        url: [],
        perms: string[],
        roles: [],
        department: string,
        isAdmin: boolean

}

//用户信息接口返回
export interface userInfoResponse extends responseBody{
    data:userInfo
}