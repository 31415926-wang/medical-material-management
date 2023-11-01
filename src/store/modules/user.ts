import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import { constantRoute } from '@/router/routes'
import { ElNotification } from 'element-plus'
import { getTimeState } from "@/utils/hourRegion";
import { loginFrom, loginResponse, userInfo, userInfoResponse } from "@/types/api/user";
import Tip from '@/utils/elMessageTip'


const useUserStore = defineStore('User', {
    state: () => {
        return {
            userInfo: <userInfo>{},
            // token: get_tokens(),
            token: '',
            menuRoutes: constantRoute,  //默认是静态路由
            rememberUser: {} as loginFrom//记住的用户
        }
    },
    persist: {
        enabled: true,
        strategies: [ //按需存储不同地方
            {
                storage: localStorage,
                paths: ['rememberUser']
            },
            {
                storage: sessionStorage,
                paths: ['userInfo','token','menuRoutes']
            }
        ]
    },



    actions: {
        async userLogin(from: loginFrom) { //通过返回promise对象让页面区分成功与失败
            try {
                let result: loginResponse = await reqLogin(from);
                //存储token
                console.log("登录接口调用成功", result);
                //这一步不要省略，this可以直接访问该仓库的参数
                this.token = result.data;
                return result;
            } catch (error) {
                return Promise.reject(error)
            }

        },
        async getUserInfo() {

            try {
                let result: userInfoResponse = await reqUserInfo();
                this.userInfo = result.data;
                //若欢迎的提示需带用户名，需在此，即获取用户信息后
                ElNotification({
                    title: `嗨！${this.userInfo.nickname},${getTimeState()}好`,
                    message: '欢迎回来',
                    type: 'success',
                    duration: 3000
                })

            } catch (error) {
                Tip('error','获取用户信息失败')
            }
        },
        async loginOut() {//是否需要保存路由地址，以供登录后跳转
            try {
                // 少接口
                // await reqLoginOut();
                this.resetUserData();
                return 'Ok'; //告诉页面可以请求退出登录成功，可以重定向到login了，因为不需要记住路径，不考虑原地加载页面
            } catch (error) {
                Tip('error','退出登录失败')

            }
        },
        resetUserData() {
            console.log("清空用户信息");
            //清除token,用户信息
            this.token = ''
            this.userInfo = <userInfo>{}
        },
        addRememberUser(username: string | number, password: string | number) {
            this.rememberUser.username = username;
            this.rememberUser.password = password;
        },
        resetRememberUser() {
            this.rememberUser = <loginFrom>{};
        }
    },
    getters: {}
})


export default useUserStore;


