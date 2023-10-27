<template>
    <el-table :data="hookCrudObject.tableData.value" border style="width: 100%" size="small">
        <slot>默认插槽，自定义插入的列</slot>
    </el-table>
    <el-pagination small background layout="total, sizes, prev, pager, next, jumper" class="pagination"
    v-model:current-page="pagination.page"
    :page-size="pagination.size"
    :total="hookCrudObject.total" 
    />
{{hookCrudObject.crudInfo.option.pagination.size}}


</template>

<script setup lang='ts'>
import hookCrud from '@/hook/crud/index'
let hookCrudObject = hookCrud();
let {pagination} =hookCrudObject.crudInfo.option

defineExpose({
    hookCrudObject
})



</script>

<style scoped lang='scss'>
.pagination {
    margin-top: 25px;
}
</style>