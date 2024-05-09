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
                { name: '防毒面具',  max: 6500 },
                { name: '感冒康胶囊',  max: 16000 },
                { name: 'N95口罩',  max: 30000 },
                { name: '普通温度计',  max: 38000 },
                { name: '呼吸机',  max: 52000 },
                { name: '康师傅矿泉水',  max: 25000 }
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
                        value: [4200, 3000, 20000, 35000, 40000, 18000],
                        name: '入库'
                    },
                    {
                        value: [5000, 14000, 18000, 26000, 12000, 21000],
                        name: '发放'
                    }
                ]
            }
        ]
    })
})
</script>

<style scoped lang='scss'></style>