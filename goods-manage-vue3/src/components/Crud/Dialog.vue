<!-- 
    公共的弹出框，主要用于表格:
    后续仅对插槽、传入值/事件拓展
-->
<template>
    <el-dialog v-model="dialogVisible" :title="title" :width="width" :before-close="handleClose" @opened="handleOpen">
        <slot>
            <el-form :model="rowInfo" label-width="80px">
                <el-row>
                    <el-form-item label="ID" v-if="rowInfo.id">
                        <el-input :value="rowInfo.id" disabled />
                    </el-form-item>
                </el-row>

                <template v-for="(item, index) in tableCols.value" :key="index">

                    <!-- 成双的索引先渲染
                        无论是总数偶数、奇数时，都可以先渲染成对的。
                        只有索引不是最后一个即可，若总数偶数，最后一个索引是奇数，不会有问题。若是奇数，最后一个索引是偶数。会溢出、且应该单独渲染。
                    -->
                    <template v-if="(index % 2 == 0) && (index != tableCols.value.length - 1)">
                        <el-row>
                            <el-col :span="24" :lg="12">
                                <el-form-item :label="item.label">
                                    <el-input :value="rowInfo[item.prop]" disabled />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24" :lg="12">
                                <el-form-item :label="tableCols.value[index + 1].label">
                                    <el-input :value="rowInfo[(tableCols.value[index + 1].prop)]" disabled />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </template>
                    <!-- 奇数时才会多出一个，并且是最后一个索引-->
                    <template v-if="(tableCols.value.length % 2 != 0) && (index == tableCols.value.length - 1)">
                        <el-row>
                            <el-col :span="24" :lg="12">
                                <el-form-item :label="item.label">
                                    <el-input :value="rowInfo[item.prop]" disabled />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </template>



                </template>

            </el-form>
        </slot>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">
                    关闭
                </el-button>
                <el-button v-if="needSubmit" type="primary" :loading="loadingStatus" @click="handleSumit">提交</el-button>
            </span>
        </template>

    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'

let props1 = defineProps(
    {
        // rowInfo为行对象，专门用于表格详细，没有label属性，只有整行的变量属性名与属性值
        rowInfo: {
            type: Object,
            default: {}
        },
        //表格列初始化时的结构,专门用于表格详细
        tableCols: {
            type: Object,
            default: {}
        },
        title: {
            type: String
        },
        needSubmit: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            required: true
        }
    }
)

//  handleOpenBefore:打开弹框前需执行的函数，如获取下拉框
let $emit = defineEmits(['submitFn', 'handleCloseBefore', 'handleOpenBefore']);

const dialogVisible = ref<boolean>(false)
let loadingStatus = ref<boolean>(false)

const handleClose = () => {
    console.log("关闭");

    $emit('handleCloseBefore');
    dialogVisible.value = false;
}

const handleSumit = () => {
    loadingStatus.value = true;
    $emit('submitFn', (result: boolean) => {
        loadingStatus.value = false;
        if (result) { //只有成功提交才关闭弹出框
            dialogVisible.value = false;
        }
    })
}

const handleOpen = () => {
    $emit('handleOpenBefore');
}


defineExpose({
    dialogVisible
})



</script>

<style scoped lang='scss'></style>

