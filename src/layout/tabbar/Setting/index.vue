<template>
  <el-button icon="Refresh" circle @click="handleRefresh" />
  <el-button icon="FullScreen" circle @click="handleFullScreen" />
  <el-button icon="Setting" circle />
  <img :src="userStore.userInfo.avatar" class="userImg" alt="">


  <el-dropdown class="dropdown">
    <span class="el-dropdown-link">
      <span>{{ userStore.userInfo.username }}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang='ts'>
import useUserStore from "@/store/modules/user";
import useLayoutSettingStore from "@/store/modules/layoutSetting";
import { useRouter } from "vue-router";
let layoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();
let $router = useRouter();

const handleFullScreen = () => {
  if (document.fullscreenElement) {//若是全屏，退出
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}
const handleRefresh = () => {
  layoutSettingStore.changeRefresh();
}

const loginOut = async () => {

  await userStore.loginOut();
  //退出成功后重定向户登录页
  $router.push({ path: '/login' })

}

</script>

<style scoped lang='scss'>
@mixin mx-right {
  margin-right: 16px;
  margin-left: 0 !important;
}

.el-button {
  @include mx-right;
}

.userImg {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  @include mx-right;

  ~.dropdown {
    @include mx-right;
  }
}
</style>