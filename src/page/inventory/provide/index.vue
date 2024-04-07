<template>
    <CrudTable ref="CrudTableRef" :needOperate="true" :customOperate="true" :operateColWidth='210'
        :defaultToolBtList="['export']">
        <!-- 批量位置自定义按钮 -->
        <template v-slot:batchSlot>
            <router-link to="/inventory/addProvide" style="margin-right: 12px">
                <el-button type="primary" icon="Plus">发放</el-button>
            </router-link>

        </template>

        <!-- 自定义查询 -->
        <template v-slot:search-custom="{ scope }">
            <el-form-item label="发放类型">
                <el-select v-model="scope.searchParam.type" placeholder="请选择发放类型" clearable>
                    <el-option v-for="item in ProvideTypeOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="物资状态">
                <el-select v-model="scope.searchParam.status" placeholder="请选择物资状态" clearable>
                    <el-option v-for="item in ProvideStatusOption" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
        </template>


        <!-- 自定义列 -->
        <template v-slot:typeCol="{ scope }">
            <el-tag :type="switchAddStoragesRecordType(scope.row?.type)">{{ GetLabel(scope.row?.type, ProvideTypeOption)
                }}</el-tag>
        </template>
        <template v-slot:statusCol="{ scope }">
            <el-tag :type="switchStoragesStatus(scope.row?.status)">{{ GetLabel(scope.row?.status,
        ProvideStatusOption)
                }}</el-tag>
        </template>
        <template v-slot:priorityCol="{ scope }">
            <el-rate :disabled="true" v-model="scope.row.priority" show-text :texts="ProvidePriorityOption.map((item)=>item.label)">
            </el-rate>
        </template>


        <!-- 自定义操作 -->
        <template #operateExpand="{ rowInfo }">
            <el-button text type='primary' class="mini" icon="View"
                @click="showDialog = true; infoItem = rowInfo">明细</el-button>
            <el-button v-show="rowInfo.status == StoragesStatus.Pending" text type='primary' class="mini"
                icon="CircleCheck" @click="handleOperate(3, rowInfo)">通过</el-button>
            <el-button v-show="rowInfo.status == StoragesStatus.recycle" text type='primary' class="mini" icon="Refresh"
                @click="handleOperate(2, rowInfo)">恢复</el-button>
            <el-popconfirm v-if="rowInfo.status == StoragesStatus.recycle" title="确定永久删除该记录吗？"
                @confirm="handleOperate(4, rowInfo)">
                <template #reference>
                    <el-button text type='primary' class="mini" icon="Delete">永久删除</el-button>
                </template>
            </el-popconfirm>
            <el-popconfirm v-if="rowInfo.status != StoragesStatus.recycle" title="确定加入回收站吗？"
                @confirm="handleOperate(1, rowInfo)">
                <template #reference>
                    <el-button text type='primary' class="mini" icon="Delete">回收站</el-button>
                </template>
            </el-popconfirm>
        </template>


    </CrudTable>

    <Dialog v-model:dialogVisible="showDialog" :infoItem="infoItem"></Dialog>

</template>

<script setup lang='ts'>
import { ref, reactive, watch } from "vue";
import initCrud from "@/hook/crud/initCrud";
import provideApiMethod from "@/api/inventory/provide";
import { tableCol } from "@/types/common/Crud";
import { GetLabel, ProvideStatusOption, ProvidePriorityOption, ProvideTypeOption } from "@/bus/shareData"
import type { listItem } from "@/types/api/inventory/provide";
import Tip from '@/utils/element/elMessageTip'
import Dialog from "./components/dialog.vue";
import { StoragesStatus } from "@/types/api/enum";



let CrudTableRef = ref();

let tableCols = reactive([
    {
        prop: 'outNum',
        label: '发放单号',
        searchType: 'input',
        width: 190
    },
    {
        prop: 'type',
        label: '发放类型',
        rebuild: true,
        width: 120
    },
    {
        prop: 'priority',
        label: '紧急程度',
        rebuild: true,
        width: 190
    },
    {
        prop: 'name',
        label: '发放地点',
    },
    {
        prop: 'productNumber',
        label: '总数',
        sortable: true,
        width: 75
    },
    {
        prop: 'phone',
        label: '联系方式',
        width: 130
    },
    {
        prop: 'status',
        label: '状态',
        rebuild: true,
        width: 120
    },
    {
        prop: 'operator',
        label: '操作员',
        width: 130

    },

] as tableCol[]);


initCrud(CrudTableRef, {
    title: '物资发放',
    apiMethod: provideApiMethod
},
    tableCols
);

let showDialog = ref(false);
let infoItem = ref<listItem>();

const switchAddStoragesRecordType = (type: number) => {
    let result;
    switch (type) {
        case 0:
            result = 'success';
            break;
        case 1:
            result = 'danger';
            break;
        case 2:
            result = 'warning';
            break;
        case 3:
            result = 'info';
            break;
        case 4:
            result = '';
            break;
    }
    return result;
}

const switchStoragesStatus = (status: number) => {
    let result;
    switch (status) {
        case 0:
            result = '';
            break;
        case 1:
            result = 'danger';
            break;
        case 2:
            result = 'warning';
            break;
    }
    return result;
}



//操作列功能
enum operateType {
    remove = 1,
    back,
    pass,
    delete
}
const handleOperate = async (type: operateType, rowItem: listItem) => {
    switch (type) {
        case operateType.remove:
            await provideApiMethod.removeItem(rowItem.id);
            break;
        case operateType.back:
            await provideApiMethod.backItem(rowItem.id);
            break;
        case operateType.pass:
            await provideApiMethod.passItem(rowItem.id);
            break;
        case operateType.delete:
            await provideApiMethod.deleteItem(rowItem.id);
            break;
    }
    Tip('success', '操作成功')
    CrudTableRef.value.hookCrudObject.getData();

}



</script>

<style scoped lang='scss'></style>