<template>
  <div class="tabbal_out">
    <div class="tabbal_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbal_right">
      <Setting ></Setting>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import Breadcrumb from './Breadcrumb/index.vue'
  import Setting from './Setting/index.vue'

</script>

<style scoped lang='scss'>
  .tabbal_out {
    height: 100%;
    display: flex;
    padding: 0px 15px;

    .tabbal_left, .tabbal_right {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
    .tabbal_left{
      justify-content: flex-start;
    }
    .tabbal_right{
      justify-content: flex-end;
    }
  }
</style>