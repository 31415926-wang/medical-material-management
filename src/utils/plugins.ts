
//自定义插件：将全局组件、指令等写一起，后续全局组件太多也可分离文件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
    install(app: any) {
        //全局注册el-icon，entries拆分对象为数组，元素为[键,值]，再解构赋值
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }

    }
}