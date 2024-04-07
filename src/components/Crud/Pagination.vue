<template>
     <el-pagination v-bind="useAttrs()"
        @size-change="(val: number) => hanleChange(val, 'size')"
        @current-change="(val: number) => hanleChange(val, 'current')" 
        />

</template>

<script setup lang='ts'>
import {useAttrs} from 'vue'  

let props=defineProps(['hookCrudObjectParam']);

const hanleChange = (val: number, type: string) => {
    if (type == 'current') {
        props.hookCrudObjectParam.page.value = val;
    } else {
        props.hookCrudObjectParam.size.value = val;
        props.hookCrudObjectParam.page.value = 1;
    }
    //请求接口 
    props.hookCrudObjectParam.getData();
}


</script>

<style scoped lang='scss'>
  
</style>