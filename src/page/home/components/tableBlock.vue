<template>
    <div class="tableBlock">
        <el-table :data="tableData" stripe :cell-style="{ 'height': '55px' }" :header-cell-style="{ 'height': '60px' }"
            max-height="570">
            <el-table-column prop="id" label="物资ID" />
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

defineProps<{
    tableData?: productStocksInfoItem[]
}>()

</script>

<style scoped lang='scss'>
.el-table {
    width: auto;

    ::v-deep .el-table__header th {
        background-color: transparent !important;
    }
}

.tableBlock {
    padding: 0 20px
}
</style>