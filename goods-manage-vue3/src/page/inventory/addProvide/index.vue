<template>
    <router-link class="link" to="/inventory/provide">
        <el-icon><DArrowLeft /></el-icon>
        返回发放记录</router-link>
    <div class="card-box">
        <el-card class="left-card">
            <el-steps :space="200" :active="1" simple class="steps">
                <el-step title="填写" icon="EditPen" />
                <el-step title="审核" icon="Postcard" />
                <el-step title="发放" icon="Operation" />
            </el-steps>

            <Baseform></Baseform>
        </el-card>

        <el-card class="right-card">
            <BaseTable></BaseTable>
        </el-card>
    </div>


</template>

<script setup lang='ts'>
import Baseform from './components/baseform.vue'
import BaseTable from './components/baseTable.vue'


</script>
 
<style scoped lang='scss'>
.link{
    display: inline-flex;
    align-items: center;
    gap:8px;
    text-decoration: none;
    color: rgb(119, 119, 119);
    margin-bottom: 20px;
}
.card-box {
    display: flex;
    gap: 30px;

}

.steps {
    margin-bottom: 20px;
}

.left-card {
    width: 45%;
}

.right-card {
    width: 55%;
}
</style>
