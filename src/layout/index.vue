<template>
    <div class="layout_contain_box">
        <div class="layout_left_side">
            <logo></logo>
            <el-menu default-active="2" background-color="#001529" text-color="white" active-text-color="yellowgreen"
             >
                <Menu :menuList="newMenuList" basePath=""></Menu>
            </el-menu>
        </div>

        <div class="layout_right_side">
            <div class="layout_tabbar"></div>
            <div class="layout_context_main"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import useUserStore from "@/store/modules/user";
let userStore=useUserStore();


//过滤隐藏的菜单，考虑hidden可能存在多个位置
import cloneDeep from 'lodash/cloneDeep'
const filterMenu = (arr: any) => {
    return arr.filter((item: any) => {
        if (item.children) {
            item.children = filterMenu(item.children);  //直接影响原数组
        }
        return !item?.meta?.hidden
    })
}

let newMenuList = filterMenu(cloneDeep(userStore.menuRoutes));
console.log("过滤hidden之后的路由数组", newMenuList);


</script>

<style scoped lang='scss'>
.layout_contain_box {
    height: 100%;
    display: flex;

    .layout_left_side {
        height: 100%;
        width: $base_menu_width;
        // border: 1px solid red;
        background-color: $base-menu-background;
        padding: 5px 0px;

        .el-menu {
            border-right: none;
        }

    }

    .layout_right_side {
        height: 100%;
        width: 100%;
        border: 1px solid rgb(188, 214, 40);

        .layout_tabbar {
            border: 1px solid rgb(214, 110, 40);
            height: $base_tabbar_height
        }

        .layout_context_main {
            height: calc(100% - $base_tabbar_height);
            border: 1px solid rgb(151, 26, 223);
        }
    }
}
</style>