<template>
    <div id="chartCakeshaped" style="height: 250px"></div>

</template>

<script setup lang='ts'>
import type { productStocksInfoItem } from '@/types/api/goods/info'
import { onMounted } from "vue";
import * as echarts from 'echarts';

let $prop= defineProps<{
    tableData?: productStocksInfoItem[]
}>()

var myChart;

onMounted(() => {
    myChart = echarts.init(document.getElementById('chartCakeshaped'));

    myChart.setOption({

        tooltip: {
            trigger: 'item',
            borderWidth:'0',
            backgroundColor:'rgba(0,0,0,.5)',
            textStyle:{
                color:'#fff'
            },
            formatter:function(params:any) {
                return `库存占比:<br/> ${params.marker}${params.name}: ${params.percent}%`     
            }
        },
        legend: {
            orient: 'vertical',
            right: '4%' ,
            bottom: '7%' ,
            type: 'scroll'
        },
        grid: {
        },
        series: [
            {
                name: '库存占比',
                type: 'pie',
                radius: '65%',
              /*   data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ], */
                data:$prop.tableData!.map((item)=>({value:item.stock,name:item.name})),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    color:'inherit'
                }
            }
        ]
    })

})

</script>

<style scoped lang='scss'></style>