<template>
  <el-icon @click="changeExpandStatus" style="margin-right: 20px;cursor: pointer;">
    <component :is="!layoutSettingStore.fold?'Fold' :'Expand'"></component>
  </el-icon>

  <el-breadcrumb separator-icon="ArrowRight">
    <template  v-for="(item, index) in $route.matched">
      <el-breadcrumb-item v-if="item.path!='/'" :key="index" 
      :to="{ path: item.path }">
      <el-icon class="breadcrumbIcon"  >
      <component :is="item.meta?.icon" ></component>
      </el-icon>
      <span class="breadcrumbTitle" >{{ item.meta?.title }}</span>
    </el-breadcrumb-item>
    </template>

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

.breadcrumbTitle{
  margin-left:5px
}
@media screen and (max-width:768px) {
  .breadcrumbTitle{
  display: none
}
}


</style>
