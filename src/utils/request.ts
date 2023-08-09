import axios from "axios";
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 120000
})

//使用请求拦截器(英文倒过来)
service.interceptors.request.use((config) => {
    return config;
})

service.interceptors.response.use((response) => {
    //如果返回的不是200，是其它特殊状态码，个性化显示
    if (response.data.code == 200) {
        console.log("请求响应1", response);
        return response.data
    }
    else {
        console.log("请求响应2", response);
        ElMessage({
            type: 'error',
            message:  response?.data?.data?.message || 'error'
        })
        return Promise.reject(new Error('error'))
    }

}, (error) => {
    //通过打印，能发现确实后台没有返回时，也会有响应的状态码
    console.log("请求响应3", error);

    //在此失败都是接口没有返回内容的情况，通过错误对象的响应状态码，尽可能的告诉用户原因
    let msg = '';
    switch (error.response.status) {
        case 401:
            msg = 'TOKEN过期'
            break;
        case 403:
            msg = '没有访问权限'
            break;
        case 404:
            msg = '请求路径出错'
            break;
        case 500:
            msg = '服务器出错'
            break;

        default:
            msg = '网络出现问题'
            break;
    }

    ElMessage({
        type: 'error',
        message: msg
    })

    return Promise.reject(error)
})



export default service;

