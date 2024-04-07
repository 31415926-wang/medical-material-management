<template>
    <CrudTable ref="CrudTableRef" :default-tool-bt-list="[]" :dialogWidths="{
        add: '32%',
        editor: '32%',
        detail: '34%'
    }" :needIndex="false" :needBatch="true" :hiddenToolSection="true" rowHeight="62px"
        :pageSizes="[6, 12, 18, 24]">

        <!-- 查询 -->
        <template v-slot:search-custom="{ scope }">
            <el-form-item label="分类查询">
                <el-cascader v-model="scope.searchParam.categorys"
                    @change="(selected: []) => { handleChange(selected, scope.searchParam) }" :options="categoryOption"
                    :props="propCascader" clearable placeholder="请选择分类查询" />
            </el-form-item>
        </template>

        <!-- 在批量工具中自定义内容 -->
        <template v-slot:batchSlot>
            <div class="alert-container">
                <el-alert :title="`物资明细：勾选先下方物资后,添加其入库数量`" type="info" :closable="false" show-icon class="alert-box" />
            </div>
        </template>

        <!-- 自定义的列 -->
        <template v-slot:unitCol="{ scope }">
            <el-text type="warning">{{ scope.row?.unit }}</el-text>
        </template>
        <template v-slot:modelCol="{ scope }">
            <el-tag>{{ scope.row?.model }}</el-tag>
        </template>

        <template v-slot:productNumberCol="{ scope }">
            <el-input-number v-model="scope.row.productNumber" size="small" 
            :min="scope.row.productNumber == 0 ? 0:1" :max="1000" 
            :disabled="scope.row.productNumber == 0"
            />
        </template>

    </CrudTable>



</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch } from 'vue'
import infoApiMethod from '@/api/goods/info'
import initCrud from '@/hook/crud/initCrud'
import { tableCol } from "@/types/common/Crud/index"
import { GOODSTATUS_OPTIONS, GetLabel } from "@/bus/shareData"
import { itemCategory } from '@/types/api/goods/info'
import Tip from '@/utils/element/elMessageTip'
import $bus from "@/bus/index";
import type { infoItem } from "@/types/api/goods/info";
import type { pageRes ,operateRes } from "@/types/api/index";
import type { productItem } from "@/types/api/inventory/storage";



let tableCols = reactive([
    {
        prop: 'name',
        label: '物资名称',
        searchType: 'input'
    },
    {
        prop: 'model',
        label: '物资规格',
        rebuild: true,
        width: 140

    },
    {
        prop: 'unit',
        label: '单位',
        rebuild: true,
        width: 90

    },
    {
        prop: 'remark',
        label: '备注',
    },
    {
        prop: 'productNumber',
        label: '入库数量',
        rebuild:true,
        width: 160
    }

] as tableCol[]);

//处理请求后的数据结果
const handleAfterData = (result:pageRes<infoItem>) => {
    //追加数量属性
    result.rows.forEach((item: infoItem) => {
        // @ts-ignore
        item.productNumber = 0;
    })
}

let CrudTableRef = ref();
initCrud(CrudTableRef, {
    title: '物资',
    apiMethod: infoApiMethod,
    searchParam: {
        status: 0
    },
    pagination: {
        page: 1,
        size: 6,
    }
},
    tableCols,handleAfterData
);


let categoryOption = ref([] as itemCategory[]);  //存对象数组
let propCascader = ref({
    value: 'id',
    label: 'name',
    expandTrigger: 'hover' as const,
    checkStrictly: true, //遵守父子节点不互相关联，使得可以只选择一级，而不需要三个都选
});

const handleChange = (selectCategorys: [], searchParam: any) => {
    searchParam.categorys = selectCategorys.join();  //这里执行比v-model慢，覆盖刚刚好
}

//监听选中列表的变化，选择项改变时执行，数量改变时也会执行
watch(() => CrudTableRef.value?.hookCrudObject?.crudInfo?.value?.selectedItems, (newVal:productItem[],oldVal:productItem[]) => {
    // console.log("选中变化",newVal);
    $bus.emit('listChange',newVal);
    // console.log("断点",newVal,oldVal);
    //找出取消的项，将数量改为0
    if(newVal?.length<oldVal?.length){
        let newIds =[] as number[];
        newVal.forEach((item)=>{
            newIds.push(item.id!);
        })
        oldVal.forEach((item,index)=>{
            if (!newIds.includes(item.id!)) {
                oldVal[index].productNumber=0;
            }
        })

    }

},{deep:true})


onMounted(async () => {
    let result = await infoApiMethod.getCategoryTree();
    // console.log("请求分类", result.data.rows);
    categoryOption.value = result.data.rows;
})




</script>

<style scoped lang='scss'>
.alert-box {
    position: absolute;
    top: 0;
    width: 100%;
}

.alert-container {
    padding: 12px 0;
}
</style>
