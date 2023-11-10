<!-- 公共的弹出框，主要用于表格:
    后续仅对插槽、传入值/事件拓展
-->
<template>
    <el-dialog v-model="dialogVisible" :title="title" :width="width" :before-close="handleClose">
        <slot>
            <el-form :inline="true" :model="rowInfo" label-width="80px" style="text-align: center;">
                <el-form-item label="ID" v-if="rowInfo.id">
                    <el-input :value="rowInfo.id" disabled />
                </el-form-item>
                <el-form-item label=" " class="emtyItem">
                    <el-input value=" " />
                </el-form-item>
                <template v-for="(item, index) in tableCols.value" :key="index">
                    <el-form-item :label="item.label">
                        <el-input :value="rowInfo[item.prop]" disabled />
                    </el-form-item>
                </template>
            </el-form>
        </slot>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">
                    关闭
                </el-button>
                <el-button v-if="needSubmit" type="primary" @click="handleSumit">提交</el-button>
            </span>
        </template>

    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import windowSizeChange from '@/hook/comman/resize'

// rowInfo为行对象，需结合表格的列配置对象
let props = defineProps(['rowInfo', 'tableCols', 'title','needSubmit'])
let $emit =defineEmits(['submitFn']);

const dialogVisible = ref(false)

let width= ref("" as string);


//尺寸变化时，变量改变（此情况是在PC一行有两个表单下）
const handleSizeChange = () => {
    // console.log("尺寸变化-弹框");
    let clientWidth = document.body.clientWidth;

    switch (true) {
        //在前两个区间弹出框大些，避免出现换行
        case 1400 < clientWidth && clientWidth < 1700:
            width.value = '45%'
            break;

        case 1250 < clientWidth && clientWidth < 1400:
            width.value = '50%'
            break;

        case 1250 >= clientWidth: //1250以下会换行，此时空白项需不占位(通过Css)，且不需要太大
            width.value = '33%'
            break;

        default :
             width.value = '33%'
        break;

    }

}

let resize = windowSizeChange(handleSizeChange);


const handleClose = () => {
    dialogVisible.value = false
}

const handleSumit = () => {
    dialogVisible.value = false;
    $emit('submitFn');
}


defineExpose({
    dialogVisible
})



</script>

<style scoped lang='scss'>
.emtyItem {
    opacity: 0;
}

@media screen and (max-width: 1250px) {
    .emtyItem {
        display: none !important;
    }
}
</style>

