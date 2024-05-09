<template>
    <div class="main_box custom-scrollbar">
        
        <template v-if=" nohasCardRoute.includes($route.path)">
            <router-view >
            </router-view>
        </template>
        <el-card v-else class="main_card custom-scrollbar">
            <router-view v-if="showRouterView">
            </router-view>
        </el-card>
    </div>

</template>

<script setup lang='ts'>
import { watch, nextTick, ref ,onMounted} from 'vue'
import { useRoute } from "vue-router";
import useLayoutSettingStore from '@/store/modules/layoutSetting';
let layoutSettingStore = useLayoutSettingStore();
let showRouterView = ref(true)
let $route=useRoute();

let nohasCardRoute=ref(['/home'])

//如果监测到刷新状态变化，肯定是按下刷新，直接重新挂载即可
watch(() => layoutSettingStore.refresh, () => {
    showRouterView.value = false
    nextTick(() => {
        showRouterView.value = true;
    })
})


</script>

<style scoped lang='scss'>
.main_box {
    height: calc(100% - $base_footer_height - $base_nav_height);
    padding: 15px 18px;
    padding-bottom: 10px;
    overflow: auto;
    // border: 1px solid red;
    // background-color: rgb(230, 230, 230);
}


</style>