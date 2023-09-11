import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo,reqLoginOut } from '@/api/user'
import { set_tokens, get_tokens,remove_tokens } from '@/utils/tokens'
import { constantRoute } from '@/router/routes'
import { ElMessage } from 'element-plus'
import {  ElNotification } from 'element-plus'
import { getTimeState } from "@/utils/hourRegion";
import { loginFrom,loginResponse,userInfo,userInfoResponse } from "@/types/api/user.api";

const useUserStore = defineStore('User', {
    state: () => {
        return { 
            userInfo: <userInfo>{}, 
            // token: get_tokens(),
            token: '',
            menuRoutes: constantRoute  //默认是静态路由
        }
    },
    persist:{
        enabled:true,   
    },

    actions: {
        async userLogin(from: loginFrom) { //通过返回promise对象让页面区分成功与失败
            try {
                let result: loginResponse= await reqLogin(from);
                //存储token
                console.log("登录接口调用成功", result);
                //这一步不要省略，this可以直接访问该仓库的参数
                this.token = result.data;
                // set_tokens(result.data);
                return result ;
            } catch (error) { 
                return Promise.reject(error)
            }

        },
        async getUserInfo() {
            
            try {
                let result:userInfoResponse = await reqUserInfo();
                this.userInfo = result.data;
                //若欢迎的提示需带用户名，需在此，即获取用户信息后
                ElNotification({
                    title: `嗨！${this.userInfo.name},${getTimeState()}好`,
                    message: '欢迎回来',
                    type: 'success',
                    duration: 3000
                  })

            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: '获取用户信息失败'
                })
            }
        },
        async loginOut(){//是否需要保存路由地址，以供登录后跳转
            try {
                await reqLoginOut();
                this.resetUserData();
                return 'Ok'; //告诉页面可以请求退出登录成功，可以重定向到login了，因为不需要记住路径，不考虑原地加载页面
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: '退出登录失败'
                })
            }
        },
        resetUserData(){
            console.log("清空用户信息");
               //清除token,用户信息，重定向登录页
            this.token = ''
            // remove_tokens();
            this.userInfo=<userInfo>{}
        }
    },
    getters: {}
})


export default useUserStore;


