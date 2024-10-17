<template>
    <div ref="waterBall" class="chartBox"></div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import { ref, onMounted } from 'vue'
let waterBall = ref();


onMounted(() => {
    let myEcharts = echarts.init(waterBall.value);
    myEcharts.setOption({
        title: {
            // text: '水球图',
            top:'10',
            left:'5',
            textStyle:{
                color:'white'
            }
        },
 
        series: [{
            type: 'liquidFill',
            data: [0.65, 0.4, 0.3],
            radius: '90%',//半径，直接决定大小
            outline:{
                show:true, 
                borderDistance:8,
                itemStyle:{
                    color: 'skyblue',
                    borderWidth: 8,
                }
            }
        }]
    })
})



</script>

<style scoped lang='scss'>
.chartBox {
    height: 100%;
}
</style>