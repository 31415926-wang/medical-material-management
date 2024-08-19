import axios from "axios";
import { ElMessage } from 'element-plus'
import Tip from '@/utils/element/elMessageTip'
import {get_tokens ,remove_tokens} from './tokens.ts'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 120000
})

//使用请求拦截器(英文倒过来)
service.interceptors.request.use((config) => {

    //请求头添加tokens，需改 
    if (get_tokens()) {
        config.headers.Authorization = get_tokens();
        // config.headers.Authorization ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTI3Mzc2NTIsInVzZXJuYW1lIjoiYWRtaW4ifQ.XLr-2sizaEPRai9e2-ez0yMy9f1z0cPnVCgPZ-pyJZs';
    } 
    return config;
})


service.interceptors.response.use((response) => {

    //如果返回的不是200，是其它特殊状态码，个性化显示
    if (response.data.success == true) { //其实就是200
        // console.log("请求响应1", response);
        return response.data
    }
    else {
        ElMessage({
            type: 'error',
            message: response?.data?.data?.errorMsg || 'error'
        })
        // 401（未授权）或者403（禁止访问），具体的状态码可能会根据后端的实现而有所不同
        if (response.data.data.errorCode == 50001 || response.data.data.errorCode == 50002) {   
            remove_tokens();    
            console.log("断点1")
            // location.reload();   //页面重载
        }
        return Promise.reject(new Error('error'))
    }


}, (error) => {
    let msg = '';
    // console.log("请求失败",error);
    
    if (error.code == "ERR_NETWORK") {
        msg = '网络出现问题'
    } else {
        switch (error.response.status) {
            case 404:
                msg = '请求路径出错'
                break;
            case 500:
                msg = '服务器出错'
                break;

            default:
                msg = '请求出现问题'
                break;
        }
    }

    Tip('error', msg);

    return Promise.reject(error)
})



export default service;

