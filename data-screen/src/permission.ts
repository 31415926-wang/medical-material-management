import router from "./router";
import setting from './setting'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式 
import 'nprogress/nprogress.css'
import { get_tokens } from '@/utils/tokens.ts'



nprogress.configure({ showSpinner: false })// 去掉圈圈

const whitePaths = ['/login'];

router.beforeEach((to, from, next) => { //to,from是路由对象,next()才是通过，其它都是属于重定向


    //先判断有没有token：改
    if (get_tokens()) {


        if (to.path != '/login') {
            next();
        }
        else {
            next({ path: '/' })
        }
    }
    else {
        if (whitePaths.includes(to.path)) {
            next();
        }


        next({ path: '/login', query: { wantToPath: to.path } })
    }
    nprogress.start();
})

router.afterEach((to, from) => {
    //修改网站名称
    document.title = `${setting.title}` + (to.meta?.title ? `-${to.meta.title}` : ``)

    nprogress.done();

})