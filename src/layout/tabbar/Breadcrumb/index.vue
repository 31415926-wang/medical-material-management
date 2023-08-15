<template>
  <el-icon @click="changeExpandStatus" style="margin-right: 20px;">
    <component :is="!layoutSettingStore.fold?'Fold' :'Expand'"></component>
  </el-icon>

  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index"
      :to="{ path: item.path }">
      <el-icon class="breadcrumbIcon" >
      <component :is="item.meta?.icon"></component>
      </el-icon>
      {{ item.meta?.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang='ts'>
import useLayoutSettingStore from "@/store/modules/layoutSetting";
let layoutSettingStore = useLayoutSettingStore();
import { useRoute } from "vue-router";
let $route = useRoute();
const changeExpandStatus = () => {
  layoutSettingStore.changeFold();
}

// console.log("匹配到的路由分支", $route.matched);


</script>

<style scoped lang='scss'>
.breadcrumbIcon{
  transform: scale(1.1);
  position: relative;
  top: 1.5px;
}
</style>
