import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { set_tokens, get_tokens } from '@/utils/tokens'
import {constantRoute} from '@/router/routes'

const useUserStore = defineStore('User', {
    state: () => {
        return {
            username: '',
            avatar: '',
            tokens: get_tokens(),
            menuRoutes:constantRoute  //默认是静态路由
        }
    },
    actions: {
        async userLogin(from: any) { //通过返回promise对象让页面区分成功与失败
            try {
                let result = await reqLogin(from);
                //存储token
                console.log("登录接口调用成功", result);
                //这一步不要省略，this可以直接访问该仓库的参数
                this.tokens=result.data.token;
                set_tokens(result.data.token);
                return result
            } catch (error) {
                return Promise.reject(error)
            }

        }
    },
    getters: {}
})


export default useUserStore;


