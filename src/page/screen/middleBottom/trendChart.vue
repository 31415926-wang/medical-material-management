<template>
    <div ref="trendChart" style="height: 100%;">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let trendChart = ref();

onMounted(() => {
    let mycharts = echarts.init(trendChart.value);
    mycharts.setOption({
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            //内容区在该轴两侧不留白
            boundaryGap: false,

        },
        yAxis: {
            type: 'value',
            //分割线不要
            splitLine: {
                show: false
            },
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            }
        },
        grid: {
            top: "12%",
            bottom: "14%",
            left: "7%",
            right: "5%",
        },
        series: {
            type: 'line',
            data: [120, 1240, 66, 2299, 321, 890, 1200],
            smooth: true,
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'red' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        }
    })
})
</script>

<style scoped lang='scss'></style>