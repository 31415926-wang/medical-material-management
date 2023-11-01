<template>
    <CrudTable ref="CrudTableRef">

        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column type="index" label="序号" />
        <el-table-column min-width="3" prop="phone" label="办公电话"></el-table-column>
        <el-table-column min-width="2" prop="name" label="部门名" :hasSearch="true"></el-table-column>
        <el-table-column min-width="2" prop="total" label="人数" sortable>
            <template #default="scope">
                <el-tag>{{ scope.row.total }}人</el-tag>
            </template>
        </el-table-column>
        <el-table-column min-width="2" prop="createTime" label="创建时间" :hasSearch="true" searchType="date" ></el-table-column>
        <el-table-column min-width="2" prop="modifiedTime" label="修改时间"></el-table-column>
        <el-table-column min-width="3" prop="address" label="地址"></el-table-column>

    </CrudTable>


</template>

<script setup lang='ts'>
import { ref, reactive,computed } from 'vue'
import depApiMethod from '@/api/department/index';
import initCrud from '@/hook/crud/initCrud'




let CrudTableRef = ref();
initCrud(CrudTableRef, {
    title: '部门',
    pagination: {
        size: 20,
    },
    apiMethod: depApiMethod
});



</script>

<style scoped lang='scss'></style>