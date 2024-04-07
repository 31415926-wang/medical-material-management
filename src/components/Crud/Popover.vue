
<!-- 气泡确认框 -->
<template>
    <el-popover :visible="visiblePopover" :text="true" placement="top" :width="160">
        <p><el-icon style="color: orange;">
                <QuestionFilled />
            </el-icon>确定{{props.title}}选中项吗?</p>
        <div style="text-align: right; margin-top:15px ; ">
            <el-button size="small" text @click="visiblePopover = false">取消</el-button>
            <el-button size="small" type="primary" @click="visiblePopover = false;
            $emit('handle')">确定</el-button>
        </div>
        <template #reference>
            <el-button  v-bind="useAttrs()" @click="visiblePopover = true">{{operate}}</el-button>
        </template>
    </el-popover>
</template>
 
<script setup lang='ts'>
import {  ref, useAttrs } from 'vue';

let $emit = defineEmits(['handle'])
let props =defineProps({
    title:{
        type:String,
    },
    operate:{
        type:String,
        default:''
    }
})
    

let visiblePopover = ref(false)

</script>

<style scoped lang='scss'></style>