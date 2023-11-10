import { createApp } from 'vue'
//全局样式
import '@/style/globalStyle.scss'
import App from './App.vue'
import router from '@/router/index'
import pinia from '@/store/index'
import globalComponents  from '@/components/index'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//存放不同模式下需要自适应的样式变量
import '@/style/theme.css'
//使用svg图标步骤 
import 'virtual:svg-icons-register'
//引入自定义的loading方法
import loadingObj from '@/utils/element/elLoading'

//获取应用实例对象
const app = createApp(App)

//汉化
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router);
app.use(pinia);
// app.use(plugins);
globalComponents(app);

//引入路由拦截器/路由鉴权
import './permission'

//全局属性、方法的设置，代替vue2的挂载原型
app.provide('loading',loadingObj)


//挂载到节点
app.mount('#app')
