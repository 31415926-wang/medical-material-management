import { createApp } from 'vue'
//全局样式
import App from './App.vue'
import router from '@/router/index'
import pinia from '@/store/index'
import globalComponents from '@/components/index'
import directive from '@/utils/directive'
import ElementPlus from 'element-plus';
import '@/style/globalStyle.scss'
import 'element-plus/dist/index.css'

//引入乾坤
import '@/utils/microApps.ts';

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

//引入路由拦截器/路由鉴权
import './permission'

//获取应用实例对象
const app = createApp(App)

//汉化
app.use(ElementPlus, {
    locale: zhCn
})
// 基于断点的隐藏类
import 'element-plus/theme-chalk/display.css'

app.use(router);
app.use(pinia);
// app.use(plugins);
globalComponents(app);
directive(app);



//全局属性、方法的设置，代替vue2的挂载原型
app.provide('loading', loadingObj)


//挂载到节点
app.mount('#app')
