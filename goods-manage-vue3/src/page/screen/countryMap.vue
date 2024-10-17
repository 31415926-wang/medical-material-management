<template>
    <div ref="countryMap" style="height: 100%;">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import chinaJSON from '@/assets/data/china.json';

let countryMap = ref();

/* 
    给地图加动态点的思路，使用effectScatter，数据结构为重点：
    需要所有地图点信息、要显示的点信息(value决定点的大小)
*/

//注册中国地图
echarts.registerMap('china', chinaJSON as any)
// var mapFeatures = echarts.getMap('china').geoJson.features;  //获取引入的地图数据

var geoCoordMap = {} as any;  //存放地图所有点数据的信息，格式{名称：[经度,纬度]}
chinaJSON.features.forEach(function (v: any) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.center;
});

//点的设置
var scatters = [
    { name: "北京市", showName: "北京", value: "110" },
    { name: "海南省", showName: "海口", value: "90" },
    { name: "上海市", showName: "上海", value: "90" },
    { name: "陕西省", showName: "西安", value: "110" },
    { name: "新疆维吾尔自治区", showName: "乌鲁木齐", value: "90" },
    { name: "西藏自治区", showName: "拉萨", value: "90" },
    { name: "四川省", showName: "成都", value: "110" },
    { name: "黑龙江省", showName: "哈尔滨", value: "90" },
]

//转换格式
var convertData = function (data: any) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].showName,
                value: geoCoord.concat(data[i].value),//[经度,纬度,值]
            });
        }
    }
    return res;
};

let highlightAreaColor = {
    areaColor: 'rgb(236, 220, 126)',
    color: 'rgb(236, 220, 126)'
}

// console.log("断点", convertData(scatters));

onMounted(() => {
    let mycharts = echarts.init(countryMap.value);
    mycharts.setOption({

        geo: {
            map: 'china',
            // roam:true, //鼠标缩放的效果
            label: { //地图上的文字的设置
                show: true,
                color: 'black',
                fontSize: 11
            },
            //初始化放大的比例
            zoom: 1.45,
            itemStyle: {
                areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0, color: 'rgb(103, 214, 12)' // 0% 处的颜色
                        },
                        {
                            offset: 0.7, color: 'rgb(176, 235, 128)' // 70% 处的颜色
                        },
                        {
                            offset: 1, color: 'white' // 100% 处的颜色
                        }],
                },

                opacity: 0.9,
            },
            regions: [
                {
                    name: '北京市',
                    itemStyle: highlightAreaColor
                },
                {
                    name: '海南省',
                    itemStyle: highlightAreaColor
                },
                {
                    name: '上海市',
                    itemStyle: highlightAreaColor
                },
                {
                    name: '陕西省',
                    itemStyle: highlightAreaColor
                },
                {
                    name: '四川省',
                    itemStyle: highlightAreaColor
                },
            ],
            top: 220
        },


        tooltip: {
            show: true,
            trigger: 'item',
        },

        series: [
            //点
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',  //该系列使用的坐标系
                symbolSize: function (val: any) {
                    return val[2] / 10;
                },
                rippleEffect: {
                    brushType: 'stroke'
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(225, 85, 54)',
                        shadowBlur: 10,
                        shadowColor: 'rgb(225, 85, 54)'
                    }
                },
                zlevel: 1,
                data: convertData(scatters),
                showEffectOn: 'render',
                hoverAnimation: true,
                label: {
                    // normal: {
                    //     formatter: '{b}',
                    //     position: 'right',
                    //     show: true
                    // },
                    position: 'right',
                    fontSize: 15,
                    formatter: '{b}',
                    show: true
                },
            },
            //航线
            {
                type: 'lines',
                data: [  //每一个对象为一条线
                    {
                        coords: [ //坐标为起止点
                            [110.33119, 20.031971],
                            [116.405285, 39.904989]
                        ],
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [121.472644, 31.231706]
                        ],
                    },
                    {
                        coords: [
                            [87.617733, 43.792818],
                            [108.948024, 34.263161]
                        ],
                    },
                    {
                        coords: [
                            [91.132212, 29.660361],
                            [104.065735, 30.659462]
                        ],
                    },
                    {
                        coords: [
                            [104.065735, 30.659462],
                            [108.948024, 34.263161]
                        ],
                    },
                    {
                        coords: [
                            [108.948024, 34.263161],
                            [116.405285, 39.904989]
                        ],
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [126.642464, 45.756967]
                        ],
                    },
                    {
                        coords: [
                            [121.472644, 31.231706],
                            [121.509062, 25.044332]
                        ],
                    },

                ],
                //线段是否能选中
                selectedMode: 'single',
                select: {
                    lineStyle: {

                        type: 'solid'
                    }
                },
                tooltip: {
                    formatter: '物资发放线路'
                },
                //所有航线的颜色，也可以在data里面单独设置
                lineStyle: {
                    color: 'rgb(241, 161, 122)',
                    width: 3,
                    // type: 'dashed',

                    type: [20, 20],  //第一个是线的长度，第二个是线的间隔长度
                    curveness: 0.3
                },
                //开启动画特效
                effect: {
                    show: true,
                    symbol: 'arrow',
                    color: 'rgb(225, 85, 54)',
                    symbolSize: 10,
                    delay: 100,
                    constantSpeed: 30,
                    trailLength: 0.01
                }
            }
        ]
    })
})
</script>

<style scoped lang='scss'>
a {
    color: rgb(176, 235, 128);
}
</style>