import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'



//获取应用实例对象
const app=createApp(App)

app.use(ElementPlus, {
    locale: zhCn
})
app.use(router);


//挂载到节点
app.mount('#app')
