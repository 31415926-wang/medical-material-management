<template>
    <div ref="radarChart" style="height: 100%;">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, reactive, ref } from 'vue';

let radarChart = ref();

let arrDataBar = reactive([15, 28, 31, 44, 57, 62, 99]);
let arrDataLine = reactive([10, 20, 30, 40, 50, 60, 95]);

//自定义放大数组方法
const arrHandle=(goalArr:Array<number>,multiple:number)=>{
    goalArr.forEach((item,index,arr) => {
        arr[index]  = item * multiple;
    })
}

onMounted(() => {
    //数据加倍
    arrHandle(arrDataBar,10);
    arrHandle(arrDataLine,10);
  
    let mycharts = echarts.init(radarChart.value);
    let backgroundStyleSet = {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'black' // 0% 处的颜色
            }, {
                offset: 1, color: 'blue' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        }
    };

    mycharts.setOption({
        //如果柱子没有设置颜色，会默认按此颜色
        color: [
            '#94CCF4',
            '#BA94F4',
            '#94A4F4',
            '#F494C2',
        ],
        title: {
            text: '物资来源地区排行',
            textStyle: {
                color: 'yellowgreen',
                fontSize: 20
            },
            left: 'center',
            top: 7,
            subtext: '点击查看详细',
            subtextStyle: {
                color: 'yellowgreen',
                fontSize: 12
            },
            link: '#/goods/source'
        },
        xAxis: {
            type: 'category',
            data: ['深圳市', '北京市', '邯郸市', '鄂尔多斯市', '晋城市', '阳泉市', '大同市'],
            axisLabel:{
                margin:20,
                rotate:15,
                align:'center'
            },

        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    width: 2,
                    opacity: 0.3
                }
            },

        },
        grid: {
            top: '21%',
            bottom: '13%',
            left: '9%',
            right: '7%',
        },
        series: [
            // {
            //     type: 'bar',
            //     data: arrDataBar,
            //     barWidth: 21,
            //     showBackground: true,
            //     backgroundStyle: {
            //         ...backgroundStyleSet
            //     },
            //     itemStyle: {
            //         borderRadius: [9, 9, 0, 0],
            //     },
            //     label: {
            //         show: true,
            //         position: 'insideTop',
            //         offset: [0, 6]
            //     }
            // },
            {
                type: 'bar',
                data: arrDataBar,
                barWidth: 21,
                showBackground: true,
                backgroundStyle: backgroundStyleSet,
                itemStyle: {
                    borderRadius: [9, 9, 0, 0],
                    color: (params: any) => {
                        let arr = ['red', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'white'];
                        return arr[params.dataIndex]
                    }
                },
                label: {
                    show: true,
                    position: 'insideTop',
                    offset: [0, 6]
                }
            },
            {
                type: 'line',
                data: arrDataBar,
                // smooth: true,
                itemStyle: {
                    color: 'green'
                },
                lineStyle: {
                    width: 3
                }
            }
        ]
    })
})
</script>

<style scoped lang='scss'></style>