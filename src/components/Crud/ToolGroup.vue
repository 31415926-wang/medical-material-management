<template>
    <el-button-group>
        <el-button plain type="info" icon="Search" @click="$emit('update:searchStatus', !props.searchStatus)" />
        <el-button plain icon="Refresh" @click="hookCrudObjectParam.getData" />

        <el-popover placement="bottom" title="" :width="100" trigger="click">
            <template #reference>
                <el-button plain icon="Grid" />
            </template>
            <template #default>
                <el-checkbox v-model="checkAllCol" :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group :min="1" class="checkboxGroup" v-model="checkedCol" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="(col, index) in colList" :key="index" :label="col">
                        {{ col }}
                    </el-checkbox>
                </el-checkbox-group>
            </template>

        </el-popover>

    </el-button-group>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue';
import $bus from '@/bus';

let props = defineProps(['searchStatus', 'hookCrudObjectParam'])
let $emit = defineEmits(['update:searchStatus'])


//列的控制，全选列的隐藏和显示功能
const checkAllCol = ref(false)
const isIndeterminate = ref(true)
const checkedCol = ref([] as string[]) //已选中的内容
const colList = ref([] as string[]) //总共列的列表

const handleCheckAllChange = (val: boolean) => {
    console.log("全选", checkAllCol.value);

    //判断是否全不选。checkAllCol为全不选状态的时候为false，不确定状态和全选状态为true
    if (!checkAllCol.value) {
    checkedCol.value = val ? colList.value : [colList.value[0]]
    isIndeterminate.value = true
    }
    else{
    checkedCol.value = val ? colList.value : []
    isIndeterminate.value = false
    }

}

const handleCheckedCitiesChange = (value: string[]) => {
    console.log("单选");

    const checkedCount = value.length
    checkAllCol.value = checkedCount === colList.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < colList.value.length
}



//初始化处理已选中列，将选中列、总共的选项，分别放到新的数组里。
//监测选中列的变化，通过修改响应式的tableCols，从而实现列动态

watch(checkedCol, (newVal, oldVal) => {
    //将已选的值，同步到响应式的tableCols
    props.hookCrudObjectParam.tableCols.value.forEach((item: any, index: any) => {
        if (newVal.includes(item.label)) {
            item.show = true
        } else {
            item.show = false
        }
    })

})

$bus.on('initSelectedCol', () => {
    checkedCol.value = [];
    colList.value = [];

    props.hookCrudObjectParam.tableCols.value.forEach((item: any, index: any) => {
        colList.value.push(item.label);
        if (item.show) {
            checkedCol.value.push(item.label);
        }
    });
    //完善初始化全选状态
    if (checkedCol.value.length == colList.value.length) {
        checkAllCol.value =true;
        isIndeterminate.value = false
    }

})



</script>

<style scoped lang='scss'></style>