<template>
    <span  v-for="(item, index) in arr" :key="index">{{item }}{{index}}</span>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue'

let arr = ref({ a: 1111 ,b:222})



</script>

