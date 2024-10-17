<template>
    <div ref="scatterChart" style="height: 100%;">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
 
let scatterChart = ref();

onMounted(() => {
    let mycharts = echarts.init(scatterChart.value);
    mycharts.setOption({
        title: {
            text: "", 
            textStyle: {
                color: '#fff',
                fontSize: 16
            },
            left: 'center'
        },
        grid: {
            left: 20,
            top: 30,
            right: 15,
            bottom: 30
        },
        xAxis: {
            type: 'category',
            //不写则从0递增
            data: [1, 2, 3, 4, 5,6,7,8,9,10,11,12],
            // 下面两个二选一
            axisTick:{
                alignWithLabel:true
            },
            boundaryGap:false
        },
        yAxis: {
            type: 'value',
            show: false,

        },
        series: [
            {
                type: 'scatter',
                data: [334, 234, 113, 1231, 674, 523, 818, 33, 251, 888, 3332, 313, 123],
                symbol: 'diamond',
                symbolSize: 14,
                //显示点的值
                label: {
                    show: true,
                    position: 'top',
                    color: 'red',
                },
                itemStyle: {
                    color: {
                        type: 'linear',
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                    }
                },
            }
        ]


    })
})
</script>

<style scoped lang='scss'></style>