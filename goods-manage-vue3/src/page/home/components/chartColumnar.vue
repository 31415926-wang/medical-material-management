<template>
    <div id="chartColumnar" style="height: 320px"></div>
</template>

<script setup lang='ts'>
import type { productStocksInfoItem } from '@/types/api/goods/info.d.ts'
import * as echarts from 'echarts';
import { onMounted, nextTick } from "vue";

let $prop = defineProps<{
    tableData?: productStocksInfoItem[]
}>()

var myChart;

onMounted(() => {
    myChart = echarts.init(document.getElementById('chartColumnar'));
    myChart.setOption({
        color: [
            '#0780cf ', '#fa6d1d ', '#ac2026 ', '#701866 ', '#d22e8d ',
            '#FE8463', '#a195c5 ', '#FAD860', '#F3A43B', '#60C0DD',
            '#D7504B', '#a195c5  ', '#F4E001', '#F0805A', '#63b2ee'
        ],
      
        xAxis: {
            type: 'category',
            data: $prop.tableData?.map((item) => item.name),
            axisLabel: {
                fontWeight: 'bold',
                color: '#878787',
                margin: 20,
                fontSize: 11,
            },
            axisTick: {
                alignWithLabel: true,
            },
        },
        yAxis: {
            type: 'value',
            splitNumber: 6,
            axisLabel: {
                fontWeight: 'bold',
                color: '#878787'
            },
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#CACACA']
                }
            }
        },
        
        grid: {
            bottom: 37,
            left: 40,
            right: 10
        },
        // legend:{  //只有多个系列才有效
        // },
        tooltip: {
            show: true,
            // formatter: '剩余库存量<br /> {b}: {c}',
            formatter: function (params:any) {
                let str=`剩余库存量 <br/> ${params.marker} ${params.name}：${params.value} ${$prop.tableData![params.dataIndex].unit}`;
                
                return str;
            },
            borderWidth:'0',
            backgroundColor:'rgba(0,0,0,.5)',
            textStyle:{
                color:'#fff'
            }
        },
        toolbox: {
            show: true,
            itemGap: 12,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
            }
        },
        series: [
            {
                name:'series1',
                data: $prop.tableData?.map((item) => item.stock),
                type: 'bar',
                colorBy: 'data',
                realtimeSort: true,
                showBackground: true,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n {c}',
                    color: 'inherit'
                },
            },
        ]
    });

})

</script>

<style scoped lang='scss'>
</style>
