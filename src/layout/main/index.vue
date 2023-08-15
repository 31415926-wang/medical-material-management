<template>
    <div class="main_box">
        <router-view v-if="showRouterView">
        </router-view>
    </div>
</template>

<script setup lang='ts'>
import { watch, nextTick, ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/layoutSetting';
let layoutSettingStore = useLayoutSettingStore();
let showRouterView = ref(true)

//如果监测到刷新状态变化，肯定是按下刷新，直接重新挂载即可
watch(() => layoutSettingStore.refresh, () => {
    showRouterView.value = false
    nextTick(() => {
        showRouterView.value = true;
    })
})
</script>

<style scoped lang='scss'>
.main_box{
    height: calc(100% - $base_footer_height);
    padding: 30px;
    padding-bottom: 10px;
    // background-color: rgb(230, 230, 230);
    }
</style>