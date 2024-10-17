<template>
    <div ref="agePie" style="height: 100%;">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let agePie = ref();

onMounted(() => {
    let mycharts = echarts.init(agePie.value);
    mycharts.setOption({
        legend: {
            orient: 'vertical',
            right: '20',
            top: '20',
            textStyle: {
                color: '#fff',
                fontSize: 15,
                padding: [0, 0, 0, 5]
            },
            itemGap: 12

        },
        series: [
            {
                type: 'pie',
                data: [
                    { value: 1048, name: '政府', },
                    { value: 735, name: '医院' },
                    { value: 580, name: '小区' },
                    { value: 484, name: '个人' },
                    { value: 300, name: '其他' },
                ],
                radius: ['50', '84%'],
                // center: ['50%', '50%'],
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 5
                },
                label: {
                    position: 'outside',
                    fontSize: 15,
                    color: '#fff'
                }
            }
        ],
        tooltip: {
            trigger: 'item'
        }

    })
})

</script>

<style scoped lang='scss'></style>