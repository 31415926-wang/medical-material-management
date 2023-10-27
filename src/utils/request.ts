import axios from "axios";
import { ElMessage } from 'element-plus'
import useUserStore from "@/store/modules/user";

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 120000
})

//使用请求拦截器(英文倒过来)
service.interceptors.request.use((config) => {

    const userStore = useUserStore();
    if (userStore.token) {
        config.headers.Authorization = userStore.token;
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
        console.log("请求响应2", response);
        ElMessage({
            type: 'error',
            message: response?.data?.data?.errorMsg || 'error'
        })

        // 401（未授权）或者403（禁止访问），具体的状态码可能会根据后端的实现而有所不同
        if (response.data.data.errorCode == 50001 || response.data.data.errorCode == 50002) {
           //若是token过期或者没有携带，清空token、用户信息，然后重新加载页面（间接实现了记住路由路径）
        const userStore = useUserStore();
        userStore.resetUserData();
        location.reload();   //页面重载
        }
       
        
        return Promise.reject(new Error('error'))
    }

}, (error) => {
    //通过打印，能发现确实后台没有返回时，也会有响应的状态码
    console.log("请求响应3", error);
    //当在请求接口的时候有处理失败的回调，弹出框会以那边的为主（因为弹出框时间一致，覆盖显示）
    //在此失败都是接口没有返回内容的情况，通过错误对象的响应状态码，尽可能的告诉用户原因
    let msg = '';
    switch (error.response.status) {
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
        message: msg,
    })

    return Promise.reject(error)
})



export default service;

