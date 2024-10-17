<template>
    <div ref="sexRate" style="height: 100%;">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let sexRate = ref();

let props = defineProps(['manRate'])

 
onMounted(() => {
    let mycharts = echarts.init(sexRate.value);
    mycharts.setOption({
        title: {
            text: '男女比例',
            left: 'center',
            textStyle: {
                color: 'skyblue'
            }
        },
        yAxis: {
            type: 'category',
            data: ['a', 'b'],
            show: false,
        },
        xAxis: {
            type: 'value',
            show: false,
            max: 100
        },
        series: [
            {
                data: [100],
                type: 'bar',
                itemStyle: {
                    color: 'pink',
                    borderRadius: 10,
                },
                barWidth: 20
            },
            {
                data: [props.manRate],
                type: 'bar',
                barGap: '-100%',
                itemStyle: {
                    color: 'skyblue',
                    borderRadius: 10,
                },
                barWidth: 20
            },
        ]
    })
})

</script>

<style scoped lang='scss'></style>