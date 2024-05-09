<template>
    <div class="tableBlock">
        <el-table border :data="tableData" stripe :cell-style="{ 'height': '55px' }"
            :header-cell-style="{ 'height': '60px', 'background': 'rgb(249, 250, 254) !important' }">
            <el-table-column   prop="id" label="物资ID" width="100"/>
            <el-table-column prop="name" label="物资名称" >
                <template #default="scope">
                    <el-text type="warning"> {{ scope.row.name }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="model" label="物资规格" />
            <el-table-column prop="unit" label="单位" width="100" />
            <el-table-column prop="stock" label="库存">
                <template #default="scope">
                    <el-tag size="large"> {{ scope.row.stock }}{{ scope.row.unit }}</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang='ts'>
import type { productStocksInfoItem } from '@/types/api/goods/info'
import { ref, watch, onUnmounted } from 'vue'

let $prop = defineProps<{
    tableData?: productStocksInfoItem[]
}>()

var timer;

watch(() => $prop.tableData, (val) => {
    // console.log("检测",val);
    if (val) {
        let listLength = $prop.tableData?.length;
        let body_dom = document.querySelector('.tableBlock .el-scrollbar') as HTMLElement;
        // console.log(body_dom);
        let distance=55;
        timer = setInterval(() => {
            //加完总长度的次数后，设置回0。
            if ((distance/55-1) == listLength) {
                distance=55;
                body_dom!.style.bottom=0+'px';
            }else{
                body_dom!.style.bottom=distance+'px';
                distance+=55;
            }
        }, 2000)
    }
}, { immediate: true })

onUnmounted(() => {
    timer = undefined;
    clearInterval(timer);
})

</script>

<style scoped lang='scss'>
.el-table {
    width: auto;

    ::v-deep .el-table__header th {
        background-color: transparent !important;
    }
}

.tableBlock {
    padding: 0 20px;
    margin-top: 17px;
    max-height: 580px;
    overflow: hidden;
}


</style>

<style>
 .tableBlock .el-scrollbar{
    transition: all 1s;
    position: relative;
    bottom:0;
}</style>