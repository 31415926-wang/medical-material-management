
//公共组件添加类型声明
import CrudTable from "@/components/Crud/CrudTable.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

declare module 'vue' {
    interface GlobalComponents{
        CrudTable: typeof CrudTable
        SvgIcon: typeof SvgIcon
    }
}