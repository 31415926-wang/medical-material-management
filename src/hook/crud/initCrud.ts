
import {  onMounted, } from "vue"
export default function (tableVm: any, option: object) {

    onMounted(() => {
        tableVm.value.hookCrudObject.crudInit(option);
    })
}