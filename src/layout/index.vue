<template>
    <div class="layout_contain_box">
        <div class="layout_left_side">
            <logo></logo>
            <el-menu default-active="2">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>Navigator One</span>
                    </template>
                    <el-sub-item index="1-4">
                        <template #title>item four
                            <span>Navigator One</span>
                        </template>
                    </el-sub-item>
                </el-sub-menu>
                <el-menu-item index="2">
                    <el-icon><icon-menu /></el-icon>
                    <span>Navigator Two</span>
                </el-menu-item>
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
</script>

<style scoped lang='scss'>
.layout_contain_box {
    height: 100%;
    display: flex;

    .layout_left_side {
        height: 100%;
        width: $base_menu_width;
        border: 1px solid red;
        background-color: $base-menu-background;
        padding: 5px 10px;

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