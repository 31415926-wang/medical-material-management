
<template>
    <CrudTable ref="CrudTableRef" :needOperate="true" :closeViewDetail="true" :operateWidth="155"  operateButtonType ='textType'>
        <!-- 自定义的列 -->
        <template v-slot:unitCol="{ scope }">
            <el-text type="warning">{{ scope.row?.unit}}</el-text>
        </template>
        <template v-slot:modelCol="{ scope }">
            <el-tag>{{ scope.row?.model }}</el-tag>
        </template>
        <template v-slot:statusCol="{ scope }">
            <el-tag :type="statusHanlde(scope.row?.status)">
                {{GetLabel(scope.row?.status,GOODSTATUS_OPTIONS)}}
            </el-tag>
        </template>
        
    </CrudTable>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import infoApiMethod from '@/api/goods/info.ts'
import initCrud from '@/hook/crud/initCrud'
import { tableCol } from "@/types/common/Crud/index"
import { GOODSTATUS_OPTIONS , GetLabel} from "@/bus/shareData.ts"


let tableCols = reactive([
    // {
    //     prop: 'phone',
    //     label: '图片',
    //     width: 3,
    // },
    {
        prop: 'name',
        label: '物资名称',
        width: 3,
        searchType: 'input'
    },
    {
        prop: 'pnum',
        label: '物资编号',
        width: 4,
    },
    {
        prop: 'model',
        label: '物资规格',
        width: 2,
        rebuild: true
    },
    {
        prop: 'unit',
        label: '单位',
        width: 1,
        rebuild: true
    },
    {
        prop: 'remark',
        label: '备注',
        width: 3,
    },
    {
        prop: 'status',
        label: '状态',
        width: 2,
        rebuild: true
    },
    {
        prop: 'createTime',
        label: '创建时间',
        width: 2,
    }

] as tableCol[]);

let CrudTableRef = ref();
initCrud(CrudTableRef, {
    title: '物资',
    apiMethod: infoApiMethod
},
    tableCols
);

const statusHanlde =(status)=>{
    let result=''
    switch (status) {
        case 0:
        result='success';
            break;
        case 1:
        result='info';
            break;
        case 2:
        result='warning';
            break;
    }
    return result;

}

</script>

<style scoped lang='scss'></style>








