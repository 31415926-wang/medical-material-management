<template>
    <div class="navBlock">
        <a @click="$router.push('/goods/info')">
            <img src="@/assets/images/home/1.svg" alt="">
            <span>物资资料</span>
        </a>
        <a @click="$router.push('/goods/source')">
            <img src="@/assets/images/home/2.svg" alt="">
            <span>物资来源</span>
        </a>
        <a @click="$router.push('/inventory/storage')">
            <img src="@/assets/images/home/3.svg" alt="">
            <span>物资入库</span>
        </a>
        <a @click="$router.push('/inventory/provide')">
            <img src="@/assets/images/home/3.svg" alt="">
            <span>物资发放</span>
        </a>

    </div>
</template>


<script setup lang='ts'>
import { useRouter } from 'vue-router'

let $router=useRouter();


</script>

<style scoped lang='scss'>
.navBlock {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;

    &>a {
        display: flex;
        gap: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: rgb(117, 117, 117);
        font-size: 14px;

        img {
            width: 60.8px;
        }

       &:hover{
            font-weight: bold;
            cursor: pointer;
        }
    }
}
</style>