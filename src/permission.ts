import router from "./router";
import setting from './setting'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式 
import 'nprogress/nprogress.css'
import useUserStore from "./store/modules/user";
// import pinia from "./store";
// let userStore = useUserStore(pinia);

nprogress.configure({ showSpinner: false })// 去掉圈圈

const whitePaths = ['/login','/screen'];

router.beforeEach((to, from, next) => { //to,from是路由对象,next()才是通过，其它都是属于重定向
    let userStore = useUserStore();
    //先判断有没有token
    // console.log("判断token", userStore.token);
    if (userStore.token) {//如果有token，哪都可以去，除了登录页
        if (to.path != '/login') {
            next(); 
        }
        else {
            next({ path: '/' })
        }
        //有token了，判断有没有用户信息，没有则发请求获取（F5刷新则清空，在此一般不使用持久化存储用户信息）
        //同时解决在404页面刷新还弹出欢迎回来的弹窗
        
        if (Object.keys(userStore.userInfo).length ==0 && to.path != '/404') {
            userStore.getUserInfo();
        }
    }
    else {
        //没有token，如果是去不用token的页面，直接通过
        if (whitePaths.includes(to.path)) {
            next();
        }

        //没有token，重定向到登录页(相当于不用校验的页面)，并保存想要去但没去成的路径
        next({ path: '/login', query: { wantToPath: to.path } })
    }
    nprogress.start();
})

router.afterEach((to, from) => {
    //修改网站名称
    document.title = `${setting.title}` + (to.meta?.title ? `-${to.meta.title}` : ``)

    nprogress.done();

})