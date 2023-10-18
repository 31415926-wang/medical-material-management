<template>
    <div class="box-bottom">
        <div class="box-bottom-title">
            <div class="text-font">未来七天趋势图</div>
            <img src="@/assets/images/screen/dataScreen-title.png" alt="">
        </div>

        <div class="box-bottom-chart">
            <trendChart />
        </div>
    </div>
</template>

<script setup lang='ts'>
import trendChart from "./trendChart.vue";
  
</script>

<style scoped lang='scss'>
.text-font {
    color: white;
    font-size: 20px;
}
@mixin chart-bg {
    background-size: 100% 100%;
    //不让背景覆盖内边距
    background-clip: content-box;
    padding-top: 20px;
}

.box-bottom{
    height: 100%;
    background: url('@/assets/images/screen/dataScreen-main-cb.png') no-repeat;
    @include chart-bg;
    display: flex;
    flex-direction: column;

    .box-bottom-title{
        padding: 12px;
        padding-top: 0px;
        padding-bottom: 0;
    }
    
    .box-bottom-chart{
        flex-grow: 1;
    }
}
</style>