<template>
    <CrudTable ref="CrudTableRef" :needOperate="true" :addCheckForm="addCheckForm" :editorCheckForm="editorCheckForm">

        <!-- 自定义的列 -->
        <template v-slot:totalCol="{ scope }">
            <el-tag>{{ scope.row?.total }}&nbsp;人</el-tag>
        </template>

        <!-- 新增弹框 -->
        <template v-slot:addForm="{ formInfo }">
            <el-form ref="addCheckForm" :inline="false" :model="formInfo" label-width="80px" :rules="rules">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="formInfo.name"  placeholder="请输入部门名称"/>
                </el-form-item>
                <el-form-item label="办公电话" prop="phone">
                    <el-input v-model="formInfo.phone"  placeholder="请输入办公电话"/>
                </el-form-item>
                <el-form-item label="办公地址" prop="address">
                    <el-input v-model="formInfo.address"  placeholder="请输入办公地址"/>
                </el-form-item>
            </el-form>
        </template>

        <!-- 编辑框 -->
        <template v-slot:editorForm="{ formInfo }">
            <el-form ref="editorCheckForm" :inline="false" :model="formInfo" label-width="80px" :rules="rules">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="formInfo.name"  placeholder="请输入部门名称"/>
                </el-form-item>
                <el-form-item label="办公电话" prop="phone">
                    <el-input v-model="formInfo.phone"  placeholder="请输入办公电话"/>
                </el-form-item>
                <el-form-item label="办公地址" prop="address">
                    <el-input v-model="formInfo.address"  placeholder="请输入办公地址"/>
                </el-form-item>
            </el-form>
        </template>


    </CrudTable>



</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import depApiMethod from '@/api/authority/department/index';
import initCrud from '@/hook/crud/initCrud'
import { tableCol } from "@/types/common/Crud/index"
import {rulesValidatePhone,rulesValidateEmail } from '@/utils/validate'


let addCheckForm = ref();
let editorCheckForm = ref();


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
    apiMethod: depApiMethod
},
    tableCols
);


//@ts-ignore
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请输入部门名称', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入办公电话', trigger: 'blur' },
        { validator: rulesValidatePhone, trigger: 'blur' }],
    address: [
        { required: true, message: '请输入办公地址', trigger: 'blur' },
        { min: 3, max: 10, message: '最小长度3-10', trigger: 'blur' }],
})


</script>

<style scoped lang='scss'></style>