<template>
    测试页面
    <br>
    <br>


    <el-transfer
    v-model="transferSelected"
    :data="data"
    filterable
    filter-placeholder="请输入搜索内容"
    :titles="['可分配角色列表', '已选中的角色列表']"
      :button-texts="['移除角色', '添加角色']"
  />

</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

interface Option {
  key: number
  label: string
}

const generateData = () => {
  const data: Option[] = []
  const states = [
    'California',
    'Illinois',
    'Maryland',
    'Texas',
    'Florida',
    'Colorado',
    'Connecticut ',
  ]
  states.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
    })
  })
  return data
}

const data = ref<Option[]>(generateData())
const transferSelected = ref([])


</script>

