
<template>
    <!-- 单个svg用法封装 -->
    <svg :style="{width,height}">
        <use :xlink:href="prefix+name" :fill='color'></use>
    </svg> 
</template>


<script setup lang='ts'>
  defineProps({
  //固定的前缀
  prefix:{
    type:String,
    default:'#icon-'
  },
  //图标的名称，对应文件的名称
  name:{
    type:String
  },
  width:{
    type:String,
    default:'22px'
  },
  height:{
    type:String,
    default:'22px'
  },
  color:{
    type:String,
    default:''
  },
})
</script>

<style scoped lang='scss'>
 
</style>