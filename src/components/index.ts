//全局组件入口
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import CustomTable from '@/components/Crud/CustomTable.vue'

const allGlobalComponents :any={ SvgIcon,CustomTable}
//暴露自定义方法，接收app，定义全局组件
export default  (app:any)=>{
        //全局注册el-icon，entries拆分对象为数组，元素为[键,值]，再解构赋值
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        //注册全局的自定义组件
        Object.keys(allGlobalComponents).forEach((item,index)=>{
            app.component(item,allGlobalComponents[item])
        })
 
}
