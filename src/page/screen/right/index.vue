<template>
  <div class="chart1">
     <div class="title">
            <div class="text-font">{{arrTitle[0] }}</div>
            <img src="@/assets/images/screen/dataScreen-title.png" alt="">
        </div>

  </div>
  <div class="chart2">
     <div class="title">
            <div class="text-font">{{arrTitle[1] }}</div>
            <img src="@/assets/images/screen/dataScreen-title.png" alt="">
        </div>

  </div>
  <div class="chart3">
     <div class="title">
            <div class="text-font">{{arrTitle[2] }}</div>
            <img src="@/assets/images/screen/dataScreen-title.png" alt="">
        </div>

  </div>
</template>
  
<script setup lang='ts'>
import { reactive } from "vue";
let arrTitle=reactive(['热门景区排行','年游客量对比','游客消费统计']);


</script>
  
<style scoped lang='scss'>
@mixin chart-bg {
  background-size: 100% 100%;
  //不让背景覆盖内边距
  background-clip: content-box;
  padding-top: 20px;
}

@mixin text-font {
    color: white;
    font-size: 20px;
    padding: 5px;
}


.chart1 {
  height: 40%;
  background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
  @include chart-bg;
  .text-font{
    padding-top: 12px !important;
  }
}

.chart2 {
  height: 30%;
  background: url('@/assets/images/screen/dataScreen-main-cb.png') no-repeat;
  @include chart-bg;
}

.chart3 {
  height: 30%;
  background: url('@/assets/images/screen/dataScreen-main-cb.png') no-repeat;
  @include chart-bg;
}

.title{
  .text-font{
    @include text-font;
  }
}
</style>