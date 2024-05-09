
import {  onMounted, } from "vue"
import { tableCol } from "@/types/common/Crud/index"

//tableVm为引入自定义表格组件，option为请求的基本配置，tableCols为表格列的信息
export default function (tableVm: any, option: object,tableCols:tableCol[],getDataAfter?:Function) {
    //业务页面中，调自定义表格的方法
    onMounted(() => {
        tableVm.value.hookCrudObject.crudInit(option,tableCols,getDataAfter);
    })
}



 