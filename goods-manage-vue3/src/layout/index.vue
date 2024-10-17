<template>
    <div class="layout_contain_box">
        <div class="layout_left_side" :class="{ fold: layoutSettingStore.fold }">
            <logo></logo>
            <el-scrollbar class="el_scrollbar">
                <el-menu :collapse="layoutSettingStore.fold" :default-active="$route.fullPath"
                    background-color="#001529" text-color="rgba(255, 255, 255, 0.75)" active-text-color="#fff">
                    <Menu :menuList="newMenuList" basePath=""></Menu>
                </el-menu>
            </el-scrollbar>

        </div>

        <div class="layout_right_side" :class="{ fold: layoutSettingStore.fold }">
            <div class="layout_tabbar">
                <tabbar></tabbar>
            </div>
            <div class="layout_context_main">
                <Nav></Nav>
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
import Nav from './nav/index.vue'
import footerLogo from './footerLogo/index.vue'
import useUserStore from "@/store/modules/user";
import useLayoutSettingStore from '@/store/modules/layoutSetting'
import tabbar from './tabbar/index.vue'
import { useRoute, useRouter } from "vue-router";
import windowSizeChange from '@/hook/common/resize'
import { watch, ref, toRaw } from 'vue'
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'

let $route = useRoute();
let $router = useRouter();
let userStore = useUserStore();
let layoutSettingStore = useLayoutSettingStore();


//尺寸变化时，全局方法传入回调，折叠菜单
const handleSizeChange = () => {
    // console.log("尺寸变化-布局");
    let clientWidth = document.body.clientWidth;
    if (!layoutSettingStore.fold && clientWidth < 1200) { //屏幕尺寸小于1200的时候，若是还展开着，则折叠
        layoutSettingStore.changeFold();
    }
    if (layoutSettingStore.fold && clientWidth >= 1200) {
        layoutSettingStore.changeFold();
    }
}
let resize = windowSizeChange(handleSizeChange);





/*  
    显示的菜单列表：
    1.过滤掉没有权限的路由（存储在仓库的路由列表已处理）
    2.过滤隐藏的路由，考虑hidden可能存在多个位置
 */
const filterMenu = (arr: any) => {
    return arr.filter((item: any) => {
        if (item.children) {
            item.children = filterMenu(item.children);  //直接影响原数组
        }
        return !item?.meta?.hidden
    })
}

let newMenuList = ref<any>();

const handleMenu = () => {
    newMenuList.value = filterMenu(cloneDeep(userStore.menuRoutes));
    //在第二个路由插入大屏
    // 临时
    // newMenuList.value.splice(1, 0, {
    //     path: '/screen',
    //     // component: () => import('@/page/screen/index.vue'),
    //     component: null,
    //     meta: {
    //         title: '数据大屏',
    //         icon: 'DataAnalysis',
    //     }
    // }
    // )
}

handleMenu();

// const handleRouter=()=>{
//     console.log("仓库路由",userStore.menuRoutes[0].component);
//     userStore.menuRoutes.forEach((item)=>{
//         $router.addRoute(toRaw(item));  //去除响应式结构
//     })
//     console.log("已有路由列表",$router.getRoutes());
// };

// watch(()=>userStore.menuRoutes,()=>{
//     if (userStore.menuRoutes.length>3) {
//         handleMenu();
//         // handleRouter();    
//     }
// },{immediate:true})




//点击菜单存入仓库
// const handleSelect = (clickedIndex: any, levelsIndexArr: any) => {
//     console.log("点击激活", clickedIndex, levelsIndexArr);
//     console.log("单个路由", findItemPath(levelsIndexArr));
// }

//自定义方法，根据层级路径，筛选出单个路由路径
// const findItemPath = (levelsIndexArr: any) => {
//     if (levelsIndexArr.length > 1) {
//         let str = '';
//         for (let i = 0; i <= levelsIndexArr.length - 2; i++) {
//             str = str + levelsIndexArr[i] + '/';
//         }
//         return levelsIndexArr[levelsIndexArr.length - 1].replace(str, '');

//     } else {
//         return levelsIndexArr[0] //一级路径
//     }
// }
// //自定义方法，根据路径找出路由对象
// const findItemRoute = (itemPath:string) => {
// }


</script>

<style scoped lang='scss'>
@media screen and (min-width: 1281px) {
    .layout_left_side {
        width: $base_menu_width;
    }
}

@media screen and (max-width: 1280px) {
    .layout_left_side {
        width: 226px;
    }
}



.layout_contain_box {
    height: 100%;
    display: flex;

    .layout_left_side {
        overflow-x: hidden;
        height: 100%;

        background-color: var(--custom-menu-bg-color);
        padding: 5px 0px;
        transition: all 0.6s;

        .el-menu {
            border-right: none;

            ::v-deep .el-menu-item {
                background-color: var(--custom-menu-bg-color);

                &:hover {
                    color: white;
                }

                &.is-active {
                    //改成主题颜色
                    background-color: var(--el-color-primary);
                }
            }

            //有子菜单的标题背景
            ::v-deep .el-sub-menu .el-sub-menu__title {
                background-color: var(--custom-menu-bg-color) !important;
            }

        }

        // 若是菜单折叠，样式宽度对应减小
        &.fold {
            transition: all 0.6s;
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
        width: calc(100% - $base_menu_width);

        &.fold {
            width: calc(100% - $base_menu_min_width);
        }

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