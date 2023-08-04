import request from '@/utils/request'
import type {loginFrom} from './type'
enum Urls {
    Login_url='/user/login', //模拟的
    // Login_url='/admin/acl/index/login',
    UserInfo_url='/admin/acl/index/info',
    LoginOut_url='/admin/acl/index/logout',
}

export const reqLogin = (data:loginFrom) => {
    return request({
        url: Urls.Login_url,
        method: 'post',
        data
    })<any>
}

export const reqUserInfo = () => {
    return request({
        url: Urls.UserInfo_url,
        method: 'get',
    })<any>
}

export const reqLoginOut = () => {
    return request({
        url: Urls.LoginOut_url,
        method: 'post',
    })<any>
}







