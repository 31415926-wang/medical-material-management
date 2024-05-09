<template>
    <div class="top-left">
        <img src="@/assets/images/screen/dataScreen-header-btn-bg-l.png" alt="">
        <span @click="goHome" class="text">首页</span>
    </div>
    <div class="top-middle">
        <img src="@/assets/images/screen/dataScreen-header-center-bg.png" alt="">
        <div class="text-box">
            <span class="text">防疫物资智慧数据平台</span>
        </div>
    </div>
    <div class="top-right">
        <span class="text">统计报告</span>
        <img src="@/assets/images/screen/dataScreen-header-btn-bg-r.png" alt="">
        <span class="time">当前时间：{{ nowTime }}</span>
    </div>
</template>
  
<script setup lang='ts'>
import moment from 'moment';
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
let $router = useRouter();
let nowTime = ref('');
let Interval = ref<any>(null);

const goHome = () => {
    $router.push('/')
}
onMounted(() => {
    Interval.value = setInterval(() => {
        nowTime.value = moment().format('YYYY年MM月DD日 HH:mm:ss');
        // console.log("刷新时间");
    }, 1000)
})
onUnmounted(() => {
    clearInterval(Interval.value);
    Interval.value=null;
})


</script>
  
<style scoped lang='scss'>
@mixin light-border {
    border-radius: 5px;
    border: 1px solid rgb(0, 153, 184);
    box-shadow: 0 0 9px rgb(0, 153, 184) inset, 0 0 3px rgb(0, 153, 184);
}

@mixin light-font {
    color: #29fcff;
}

.top-left {
    width: 30%;
    // position: relative;
    display: flex;
    justify-content: end;
    align-items: center;
    @include light-border;

    img {
        float: right;
    }

    .text {
        // 层级较高
        position: absolute;
        margin-right: 50px;
        font-size: 20px;
        @include light-font;
        cursor: pointer;
    }
}

.top-middle {
    width: 40%;
    position: relative;

    img {
        width: 100%;
        position: absolute
    }

    .text-box {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .text {
            @include light-font;
            font-size: 28px;
            margin-top: 30px;
        }
    }

}

.top-right {
    display: flex;
    align-items: center;
    width: 30%;
    @include light-border;
    position: relative;

    img {
        float: left;
    }

    .text {
        position: absolute;
        margin-left: 35px;
        @include light-font;
        font-size: 18px;
    }

    .time {
        position: absolute;
        right: 0;
        @include light-font;
        font-size: 18px;
        padding-right: 12px;
    }
}
</style>