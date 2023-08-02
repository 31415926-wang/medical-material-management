import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//获取应用实例对象
const app=createApp(App)

app.use(ElementPlus, {
    locale: zhCn
})



//挂载到节点
app.mount('#app')
