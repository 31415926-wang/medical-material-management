<template>
    <CrudTable ref="CrudTableRef" :needBatch="true">

        <!-- 自定义的列 -->
        <template v-slot:totalCol="{ scope }">
            <el-tag>{{ scope.row?.total }}&nbsp;人</el-tag>
        </template>

        <!-- 新增弹框 -->
        <template v-slot:addForm="">
          2222
        </template>

        <!-- 编辑框 -->
        <template v-slot:editorForm="{ formInfo }">
            <el-form :inline="false" :model="formInfo" label-width="100px" style="text-align: center;">
                <el-form-item label="部门名称" >
                    <el-input v-model="formInfo.id" />
                </el-form-item>
                <el-form-item label="办公电话" >
                    <el-input v-model="formInfo.phone" />
                </el-form-item>
                <el-form-item label="办公地址" >
                    <el-input v-model="formInfo.address" />
                </el-form-item>
            </el-form>
        </template> 


    </CrudTable>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import depApiMethod from '@/api/department/index';
import initCrud from '@/hook/crud/initCrud'
import { tableCol } from "@/types/common/Crud/index"


let CrudTableRef = ref();
let tableCols = reactive([
    {
        prop: 'phone',
        label: '办公电话',
        width: 3,
    },
    {
        prop: 'name',
        label: '部门名',
        width: 2,
        searchType: 'input'
    },
    {
        prop: 'total',
        label: '人数',
        width: 2,
        rebuild: true
    },
    {
        prop: 'createTime',
        label: '创建时间',
        width: 2,
        sortable: true,
        searchType: 'date'
    },
    {
        prop: 'modifiedTime',
        label: '修改时间',
        width: 2
    },
    {
        prop: 'address',
        label: '办公地址',
        width: 3,
    }
] as tableCol[]);

initCrud(CrudTableRef, {
    title: '部门',
    pagination: {
        size: 20,
    },
    apiMethod: depApiMethod
},
    tableCols
);



</script>

<style scoped lang='scss'></style>