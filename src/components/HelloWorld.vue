
<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <el-row>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </el-row>
</template>


<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { reqLogin } from "@/api/user"


let form = {
  username: 'admin',
  password: '111111'
}
console.log("尝试调接口");
reqLogin(form).then((result) => {
  console.log("成功", result);
}).catch((error) => {
  console.log("失败", error);
})

</script> 

 
<style scoped lang="scss">
.card {
  color: red;

  button {
    color: blue;
  }
}
</style>


