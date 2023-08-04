import axios from "axios";
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout:120000
})

//使用请求拦截器(英文倒过来)
service.interceptors.request.use((config) => {
    return config;
})

service.interceptors.response.use((response) => {
    return response.data

}, (error) => {
    //一般在此失败都是接口没有返回内容的，尽可能的告诉用户原因，401有可能是接口有返回的，属于成功回调
    let msg='';
    switch (error.response.status) {
        case 401:
            msg='TOKEN过期'
            break;
        case 403:
            msg='没有访问权限'
            break;
        case 404:
            msg='请求路径出错'
            break;
        case 500:
            msg='服务器出错'
            break;

        default:
            msg='网络出现问题'
            break;
    }

    ElMessage({
        type: 'error',
        message: msg
      })
  
    return Promise.reject(error)
})



export default service;

