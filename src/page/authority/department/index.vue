<template>
    <CustomTable ref="customTable">
            <el-table-column prop="name" label="部门名称" />
            <el-table-column prop="phone" label="办公电话" />
            <el-table-column prop="address" label="办公地址" />
    </CustomTable>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import depApiMethod from '@/api/department/index';
import initCrud from '@/hook/crud/initCrud'




let customTable = ref();
initCrud(customTable, {
    title: '部门',
    pagination: {
        size: 20,
    },
    apiMethod: depApiMethod
});



</script>

<style scoped lang='scss'></style>