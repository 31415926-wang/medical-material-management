import request from '@/utils/request'
import type {loginFrom,loginResponse,userInfoResponse} from '@/types/api/user'
enum Urls {
    Login_url='/system/user/login',
    UserInfo_url='/system/user/info', 
    // LoginOut_url='/system/user/logout',
}  
  
export const reqLogin = (data:loginFrom) => {
    return request<any,loginResponse>({
        url: Urls.Login_url,
        method: 'post', 
        data
    }) 
} 

export const reqUserInfo = () => {
    return request<any,userInfoResponse>({
        url: Urls.UserInfo_url,
        method: 'get',
    })
}

// export const reqLoginOut = () => {
//     return request<any,any>({
//         url: Urls.LoginOut_url,
//         method: 'post',
//     })
// }







