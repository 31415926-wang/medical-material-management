import request from '@/utils/request'
import type {loginFrom,loginResponse} from '@/types/user.api'
enum Urls {
    Login_url='/user/login', //模拟的
    // Login_url='/admin/acl/index/login',
    UserInfo_url='/admin/acl/index/info', 
    LoginOut_url='/admin/acl/index/logout',
} 
 
export const reqLogin = (data:loginFrom) => {
    return request<any,loginResponse>({
        url: Urls.Login_url,
        method: 'post',
        data
    })
}

export const reqUserInfo = () => {
    return request<any,any>({
        url: Urls.UserInfo_url,
        method: 'get',
    })
}

export const reqLoginOut = () => {
    return request<any,any>({
        url: Urls.LoginOut_url,
        method: 'post',
    })
}







