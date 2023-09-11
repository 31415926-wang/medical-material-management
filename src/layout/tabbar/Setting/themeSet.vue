<template>
    <el-popover placement="top" title="主题设置" :width="290" trigger="click" content="this is content">
        <!-- 气泡框内容 -->
        <el-form label-width="80px" label-position="left">
            <el-form-item label="主题颜色">
                <el-color-picker @change="themeChange" v-model="TabNavStore.globalTheme" show-alpha :predefine="predefineColors" />
            </el-form-item>

            <el-form-item label="暗黑模式">
                <el-switch v-model="TabNavStore.globalDarkMode" @change="darkModeChange" inline-prompt active-icon="Moon"
                    inactive-icon="Sunny" />
            </el-form-item>
        </el-form>

        <template #reference>
            <el-button icon="Setting" circle />
        </template>

    </el-popover>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue';
import useTabNavStore from '@/store/modules/tabNav';
const TabNavStore = useTabNavStore();

onMounted(()=>{
    //初始化时同步一下全局样式
    themeChange();
    darkModeChange();
})

//默认主题色
// themeColor.value=getComputedStyle(document.documentElement).getPropertyValue(`--el-color-primary`)

const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

const themeChange = () => {
    console.log("颜色改变", TabNavStore.globalTheme);
    //点击清空themeColor.value为null，会按框架默认的主颜色（特殊）
    document.documentElement.style.setProperty('--el-color-primary', TabNavStore.globalTheme)

}

const darkModeChange = () => {
    // TabNavStore.globalDarkMode =true;

    console.log("模式切换");
    let rootDom = document.documentElement
    if (TabNavStore.globalDarkMode) {
        rootDom.classList.contains('dark') ? '' : rootDom.classList.add('dark');
    } else {
        rootDom.classList.contains('dark') ? rootDom.classList.remove('dark') : '';

    }
}




</script>

<style scoped lang='scss'></style>