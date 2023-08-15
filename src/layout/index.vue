<template>
    <div class="layout_contain_box">
        <div class="layout_left_side" :class="{ fold: layoutSettingStore.fold }">
            <logo></logo>
            <el-scrollbar class="el_scrollbar">
                <el-menu :collapse="layoutSettingStore.fold" :default-active="$route.fullPath" background-color="#001529"
                    text-color="rgba(255, 255, 255, 0.75)" active-text-color="#fff">
                    <Menu :menuList="newMenuList" basePath=""></Menu>
                </el-menu>
            </el-scrollbar>

        </div>

        <div class="layout_right_side">
            <div class="layout_tabbar">
                <tabbar></tabbar>
            </div>
            <div class="layout_context_main">
                <Main></Main>
                <footerLogo></footerLogo>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from './main/index.vue'
import footerLogo from './footerLogo/index.vue'
import useUserStore from "@/store/modules/user";
import useLayoutSettingStore from '@/store/modules/layoutSetting'
import tabbar from './tabbar/index.vue'
import { throttle } from "lodash";
import { useRoute } from "vue-router";

let $route = useRoute();
let userStore = useUserStore();
let layoutSettingStore = useLayoutSettingStore();
// console.log("断点", $route);


const foldFn = throttle(() => {
    console.log("尺寸变化");
    let clientWidth = document.body.clientWidth;
    if (!layoutSettingStore.fold && clientWidth < 1200) { //屏幕尺寸小于1200的时候，若是还展开着，则折叠
        layoutSettingStore.changeFold();
    }
    if (layoutSettingStore.fold && clientWidth >= 1200) {
        layoutSettingStore.changeFold();
    }
}, 500)
// 监听窗口大小变化，折叠侧边栏
window.addEventListener('resize', foldFn)

//销毁组件时将监听销毁
onBeforeUnmount(() => {
    window.removeEventListener('resize', foldFn);
})


//过滤隐藏的菜单，考虑hidden可能存在多个位置
import cloneDeep from 'lodash/cloneDeep'
import { onBeforeUnmount } from "vue";
const filterMenu = (arr: any) => {
    return arr.filter((item: any) => {
        if (item.children) {
            item.children = filterMenu(item.children);  //直接影响原数组
        }
        return !item?.meta?.hidden
    })
}

let newMenuList = filterMenu(cloneDeep(userStore.menuRoutes));
// console.log("过滤hidden之后的路由数组", newMenuList);


</script>

<style scoped lang='scss'>
.layout_contain_box {
    height: 100%;
    display: flex;

    .layout_left_side {
        overflow-x: hidden;
        height: 100%;
        width: $base_menu_width;
        background-color: $base-menu-background;
        padding: 5px 0px;
        transition: all 0.6s;


        .el-menu {
            border-right: none;

            ::v-deep .el-menu-item {
                &:hover {
                    color: white;
                }

                &.is-active {
                    //后续改成主题颜色
                    background-color: rgb(58, 158, 204);
                }
            }

        }

        // 若是菜单折叠，样式宽度对应减小
        &.fold {
            width: $base_menu_min_width;

            ::v-deep .logoTitle {
                display: none;
                transition: all 1s;

            }
        }

        .el_scrollbar {
            height: calc(100% - $base_menu_logo_height);
            overflow-x: hidden;
        }

    }

    .layout_right_side {
        height: 100%;
        width: 100%;

        .layout_tabbar {
            height: $base_tabbar_height;
            line-height: $base_tabbar_height;
        }

        .layout_context_main {
            // padding: 0 30px;
            // padding-bottom: 10px;
            height: calc(100% - $base_tabbar_height);
        }
    }
}
</style>