<template>
  <div class="screen-box">
    <!-- 容器宽高与设计稿一致 -->
    <div class="container">
      <div class="top">
          <Top />
      </div>

      <div class="bottom">
        <div class="left">
          <left/>
        </div>
        <div class="middle">
          <div class="middle-top">
            <countryMap />
          </div>
          <div class="middle-bottom">
            <middleBottom />
          </div>
        </div>
        <div class="right">
          <right/>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang='ts'>
import Top from './top/index.vue';
import left from './left/index.vue';
import right from './right/index.vue';
import middleBottom from './middleBottom/index.vue';
import countryMap from './countryMap.vue';

import { onMounted, onUnmounted } from 'vue';


const changeScale = () => {
  let containerDom: any = document.querySelector('.container');
  //设置行内样式;  注意读取时只能读取行内样式
  containerDom.style.transform = `translate(-50%, -50%) scale(${scaleValue()})`
}

//根据16:9的比例(即1920X1080)，缩放容器，确保在屏幕内容器最大程度保持比例
const scaleValue = (w = 1920, h = 1080) => {
  let scaleX = window.innerWidth / w;  //意义：设计稿宽度*该比例=屏幕宽度，即该比例能使容器宽度占满全屏
  let scaleY = window.innerHeight / h;
  //使用其中一个比例缩放，找小的；值一样返回其中一个
  return Math.min(scaleX, scaleY)
}

onMounted(() => {
  changeScale();
  window.addEventListener('resize', changeScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', changeScale)
})


</script>

<style scoped lang="scss" >
.screen-box {
  // background-color: aquamarine;
  height: 100vh;
  width: 100vw;
  background: url('@/assets/images/screen/bg.png') no-repeat;
  //一定铺满容器，但是比例不适合时会截取掉一部分
  background-size: cover;

  .container {
    // background-color: burlywood;
    // border: 1px solid red;
    height: 1080px;
    width: 1920px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5px;
    $top-height: 40px;

    .top {
      // border: 1px solid rgb(12, 46, 240);
      height: $top-height;
      display: flex;
    }


    .bottom {
      height: calc(100% - $top-height - 10px);
      display: flex;
      // border: 1px solid yellow;


      //辅轴默认自动拉伸
      .left {
        width: 28%;
        // border: 1px solid rgb(12, 240, 31);
      }

      .middle {
        // border: 1px solid rgb(8, 186, 209);
        //其实就是占比三分之一的意思
        width: 44%;


        .middle-top {
          height: 75%;
        }

        .middle-bottom {
          height: 25%;
          padding: 0 33px;
        }

      }

      .right {
        // border: 1px solid rgb(230, 170, 8);
        width: 28%;
      }
    }

  }
}</style>