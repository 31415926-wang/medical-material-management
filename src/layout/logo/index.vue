<template>
    <div class="logo">
        <img :src="setting.logo">
        <span> {{ setting.title }} </span>
    </div>
</template>

<script setup lang='ts'>
import setting from '@/setting';


</script>

<style scoped lang='scss'>
.logo {
    height: $base_menu_logo_height;
    display:flex; 
    align-items: center;  
    padding: 0 8px;

    img {
        width: 2.5rem
    }

    span {
        color: white;
        margin-left:12px;
        font-size:1.1rem
    }
}
</style>