<template>
    <!-- 三级展开模版：
                el-menu-item代表一个，el-sub-menu代表是可以展开的项
            -->
    <!-- <el-menu-item index="1">
        <template #title>一级功能1</template>
    </el-menu-item>
    <el-sub-menu index="2">
        <template #title><span>一级功能2</span></template>
        <el-menu-item index="1-4-1">二级功能2</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
        <template #title><span>一级功能3</span></template>
        <el-sub-menu index="3-1">
            <template #title><span>二级功能3</span></template>
            <el-menu-item index="1-4-1">三级功能3</el-menu-item>
        </el-sub-menu>
    </el-sub-menu> -->

    <template v-for="(item, index ) in menuList" :key="index" >
        <!-- 没有展开节点的 -->
        <template v-if="!item.children">
            <el-menu-item :index="basePath + '/' + repalceStr(item.path)" @click="goRouter(basePath + '/' + repalceStr(item.path))">
                <el-icon>
                    <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
        </template>
        <!-- 有子节点，需展开 -->
        <template v-else>
            <!-- 拦截掉'/' -->
            <template v-if="item.path != '/'"> 
                <el-sub-menu :index="item.path">
                    <template #title> 
                        <el-icon>
                            <component :is="item.meta.icon" />
                        </el-icon> 
                       <!-- <span v-show="!layoutSetting.fold"> {{ item.meta.title }}</span> -->
                       <span> {{ item.meta.title }}</span>
                    </template>
                    <!-- 此位置其实在重复上面的判断：有可能是一个项。也可能是需展开(children里面的其实和整个路由数组是一样的) -->
                    <Menu :menuList="item.children" :basePath="basePath + '/' + repalceStr(item.path)"></Menu>
                </el-sub-menu>
            </template>
            <template v-else>
                <el-menu-item :index="'/'+item.children[0].path" @click="goRouter(item.path)">
                    <el-icon>
                        <component :is="item.children[0].meta.icon" />
                    </el-icon>
                    <span>{{ item.children[0].meta.title }}</span>
                </el-menu-item>
            </template>

        </template>


    </template>
</template> 

<script setup lang='ts'>
import { useRouter } from "vue-router";
// import useLayoutSettingStore from '@/store/modules/layoutSetting'
// let layoutSetting=useLayoutSettingStore();
defineProps(['menuList', 'basePath'])
let $router = useRouter();

//将所有路由的path都去掉
const repalceStr = (str: string) => {
    return str.replaceAll('/', '');
}

const goRouter = (path: string) => {
    // console.log("跳转", path);
    $router.push(path)
}

</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped lang='scss'></style>