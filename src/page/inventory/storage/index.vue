<template>
    <CrudTable ref="CrudTableRef" :needOperate="true" :customOperate="true" :operateColWidth='210'
    :defaultToolBtList="['export']"
    >   
        <!-- 批量位置自定义按钮 -->
        <template v-slot:batchSlot>
            <router-link to="/inventory/addStocks" style="margin-right: 12px">
                <el-button  type="primary" icon="Plus">入库</el-button>
             </router-link>

        </template>

        <!-- 自定义查询 -->
        <template v-slot:search-custom="{ scope }">
            <el-form-item label="入库类型">
                <el-select v-model="scope.searchParam.type" placeholder="请选择入库类型" clearable>
                    <el-option v-for="item in AddStoragesTypeOption" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="物资状态">
                <el-select v-model="scope.searchParam.status" placeholder="请选择物资状态" clearable>
                    <el-option v-for="item in AddStoragesStatusOption" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="入库时间">
                <el-date-picker v-model="timeRangeValue" type="datetimerange" start-placeholder="开始时间"
                    end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                    :disabled-date="disabledDate" />
            </el-form-item>
        </template>


        <!-- 自定义列 -->
        <template v-slot:typeCol="{ scope }">
            <el-tag :type="switchAddStoragesRecordType(scope.row?.type)">{{ GetLabel(scope.row?.type, AddStoragesTypeOption)
                }}</el-tag>
        </template>
        <template v-slot:statusCol="{ scope }">
            <el-tag :type="switchAddStoragesRecordStatus(scope.row?.status)">{{ GetLabel(scope.row?.status,
        AddStoragesStatusOption)
                }}</el-tag>
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

    <Dialog v-model:dialogVisible="showDialog" :infoItem="infoItem!" ></Dialog>

</template>

<script setup lang='ts'>
import { ref, reactive, watch } from "vue";
import initCrud from "@/hook/crud/initCrud";
import storageApiMethod from "@/api/inventory/storage";
import { tableCol } from "@/types/common/Crud";
import { GetLabel, AddStoragesTypeOption, AddStoragesStatusOption } from "@/bus/shareData"
import type { listItem } from "@/types/api/inventory/storage";
import Tip from '@/utils/element/elMessageTip'
import Dialog from "./components/dialog.vue";
import { StoragesStatus } from "@/types/api/enum";

let CrudTableRef = ref();

let tableCols = reactive([
    {
        prop: 'inNum',
        label: '入库单号',
        searchType: 'input',
        width: 220
    },
    {
        prop: 'type',
        label: '物资类型',
        rebuild: true,
        width: 120
    },
    {
        prop: 'productNumber',
        label: '数量',
        sortable: true,
        width: 110
    },
    {
        prop: 'phone',
        label: '联系方式',
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
    },
    {
        prop: 'supplierName',
        label: '物资提供方',
    },
    {
        prop: 'createTime',
        label: '入库时间',
        sortable: true,
    }
] as tableCol[]);


initCrud(CrudTableRef, {
    title: '物资入库',
    apiMethod: storageApiMethod
},
    tableCols
);

let showDialog=ref(false);
let infoItem =ref<listItem>();

const switchAddStoragesRecordType = (type: number) => {
    let result;
    switch (type) {
        case 1:
            result = 'success';
            break;
        case 2:
            result = '';
            break;
        case 3:
            result = '';
            break;
        case 4:
            result = 'warning';
            break;
    }
    return result;
}

const switchAddStoragesRecordStatus = (status: number) => {
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

//日期选择
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
let timeRangeValue = ref('');
watch(timeRangeValue, (newValue) => {
    if (newValue == null) { //清空
        CrudTableRef.value.hookCrudObject.crudInfo.value.searchParam.startTime = ''
        CrudTableRef.value.hookCrudObject.crudInfo.value.searchParam.endTime = ''
    } else {
        CrudTableRef.value.hookCrudObject.crudInfo.value.searchParam.startTime = newValue[0]
        CrudTableRef.value.hookCrudObject.crudInfo.value.searchParam.endTime = newValue[1]
    }
    console.log("查询参数", CrudTableRef.value.hookCrudObject.crudInfo.value.searchParam);
})
//清空时时间应手动清空
watch(() => CrudTableRef.value?.hookCrudObject?.crudInfo?.option?.searchParam?.startTime, (newVal) => {
    if (!newVal) {
        timeRangeValue.value = '';
    }
})


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
            await storageApiMethod.removeItem(rowItem.id);
            break;
        case operateType.back:
            await storageApiMethod.backItem(rowItem.id);
            break;
        case operateType.pass:
            await storageApiMethod.passItem(rowItem.id);
            break;
        case operateType.delete:
            await storageApiMethod.deleteItem(rowItem.id);
            break;
    }
    Tip('success','操作成功')
    CrudTableRef.value.hookCrudObject.getData();

}
 


</script>

<style scoped lang='scss'>


</style>