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
                    {
                        value: 1048,
                        name: '军事',
                        itemStyle: {
                            color: 'skyblue'
                        }
                    },
                    { value: 735, name: '新闻' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '娱乐' },
                    { value: 300, name: '财经' }
                ],
                radius: ['55', '84%'],
                // center: ['50%', '50%'],
                itemStyle: {
                    borderWidth: 4,
                    borderColor: '#fff',
                    borderRadius: 11
                },
                label: {
                    position: 'inside',
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