<template>
    <div class="logo ">
        <img :src="setting.logo">
        <span> {{ setting.title }} </span>
    </div>
</template>

<script setup lang='ts'>
import setting from '@/setting.ts';


</script>

<style scoped lang='scss'>
.logo {
    height: $base_menu_logo_height;
    border: 1px solid blue;
    display:flex;
    align-items: center;  

    img {
        width: 2.5rem
    }

    span {
        color: white;
        margin-left:12px;
    }
}
</style>