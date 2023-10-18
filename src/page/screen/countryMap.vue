<template>
    <div ref="countryMap" style="height: 100%;">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import chinaJSON from '@/assets/data/china.json';

let countryMap = ref();

//注册中国地图
echarts.registerMap('china', chinaJSON as any)

onMounted(() => {
    let mycharts = echarts.init(countryMap.value);
    mycharts.setOption({

        geo: {
            map: 'china',
            // roam:true, //鼠标缩放的效果
            label: { //地图上的文字的设置
                show: true,
                color: 'white',
                fontSize: 14
            },
            //初始化放大的比例
            zoom: 1.25,
            itemStyle: {
                areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0, color: 'rgb(207, 31, 31)' // 0% 处的颜色
                        },
                        {
                            offset: 0.7, color: 'orange' // 70% 处的颜色
                        },
                        {
                            offset: 1, color: 'white' // 100% 处的颜色
                        }],
                }
            },
            top: 170
        },

        series: [
            {
                type: 'lines',
                data: [  //每一个对象为一条线
                    {
                        coords: [ //坐标为起止点
                            [116.405285, 39.904989],  // 起点
                            [119.306239, 26.075302]   // 终点
                        ],

                    },
                    {
                        coords: [
                            [116.405285, 39.904989],  // 起点
                            [114.298572, 30.584355]   // 终点
                        ],

                    },
                    {
                        coords: [
                        [116.405285, 39.904989],  // 起点
                            [
                            88.388277,
                    31.56375
                            ]   // 终点
                        ],

                    }
                ],
                //所有航线的颜色，也可以在data里面单独设置
                lineStyle: {
                    color: 'yellow',
                    width: 5
                },
                //开启动画特效
                effect: {
                    show: true,
                    symbol: 'arrow',
                    color: 'black',
                    symbolSize: 10
                }
            }
        ]
    })
})
</script>

<style scoped lang='scss'></style>