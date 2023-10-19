<template>
    <div ref="radarChart" style="height: 100%;">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let radarChart = ref();

onMounted(() => {
    let mycharts = echarts.init(radarChart.value);
    mycharts.setOption({
        radar: {
            indicator: [
                { name: '消费', max: 6500 },
                { name: '好感', max: 16000 },
                { name: '出行', max: 30000 },
                { name: '小吃', max: 38000 },
                { name: '爱好', max: 52000 },
                { name: '景点', max: 25000 }
            ],
        },
        legend:{
            right:'8%',
            orient:'vertical',
            textStyle:{
                color:'#fff',
                padding:[2,0,0,3]
            }
        },


        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '购物'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '吃饭'
                    }
                ]
            }
        ]
    })
})
</script>

<style scoped lang='scss'></style>