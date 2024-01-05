<template>
    <el-form :inline="true" :model="hookCrudObjectParam.searchParam" >

        <template v-for="(item, index) in hookCrudObjectParam.tableCols.value" :key="index">
            <el-form-item v-if="item.searchType" :label="item.label">
                <el-input v-model="hookCrudObjectParam.searchParam.value[item.prop]"
                    :placeholder="'请输入' + item.label + '查询'" :type="item.searchType"
                    @keyup.enter.native="hookCrudObjectParam.getData" clearable />
            </el-form-item>
        </template>

        <!-- 
        {{ hookCrudObjectParam.searchParam }}
                通过直接追加属性的形式，增加自定义内容
            -->
            <slot :scope="{
                searchParam: hookCrudObjectParam.searchParam.value,
                getData: hookCrudObjectParam.getData
            }"></slot>
 
        <el-form-item>
            <el-button type="primary" icon="Search" @click="hookCrudObjectParam.getData">查询</el-button>
            <el-button icon="CircleClose" @click="handleReset">清空</el-button>
        </el-form-item>
        
    </el-form>
</template>
 
<script setup lang='ts'>
import { resetObj } from '@/utils'

let props = defineProps(['hookCrudObjectParam'])

const handleReset = () => {
    resetObj(props.hookCrudObjectParam.searchParam.value);
    props.hookCrudObjectParam.getData()
}

</script>

<style scoped lang='scss'></style>