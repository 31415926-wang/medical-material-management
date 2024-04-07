<template>
    <el-row :gutter="25" class="one-row">
        <el-col :lg="12" :span="12">
            <el-card style="height: 100%;">
                <UserBlock></UserBlock>
            </el-card>
        </el-col>
        <el-col :lg="12" :span="12">
            <el-card style="height: 100%;">
                <NavBlock></NavBlock>
            </el-card>
        </el-col>
    </el-row>

    <el-row :gutter="25" class="two-row">
        <el-col :lg="12" :span="12">
            <el-card style="height: 100%;">
                <div class="chart-card">
                    <div class="chart-Cakeshaped ">
                        <div class="card-title">· 库存条形图</div>
                        <ChartColumnar :tableData="reportData!" v-if="hasData"></ChartColumnar>
                    </div>

                    <div class="chart-Columnar">
                        <div class="card-title">· 库存占比</div>
                        <ChartCakeshaped :tableData="reportData!" v-if="hasData"></ChartCakeshaped>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :lg="12" :span="12">
            <el-card style="height: 100%;">
                <div class="card-title">· 库存表格</div>
                <TableBlock :tableData="reportData!"></TableBlock>
            </el-card>
        </el-col>
    </el-row>

</template>

<script setup lang='ts'>
import NavBlock from "./components/navBlock.vue";
import UserBlock from "./components/userBlock.vue";
import TableBlock from "./components/tableBlock.vue";
import ChartCakeshaped from "./components/chartCakeshaped.vue";
import ChartColumnar from "./components/chartColumnar.vue";
import { ref, onMounted } from "vue";
import { findProductStocks } from "@/api/goods/info";
import { productStocksInfoItem } from '@/types/api/goods/info'

let reportData = ref<productStocksInfoItem[]>();

let hasData=ref(false);

onMounted(async () => {
    let { data } = await findProductStocks({
        pageNum: 1,
        pageSize: 100
    });
    hasData.value=true;
    // console.log("报表", data);
    reportData.value = data.rows;
})

</script>

<style scoped lang='scss'>
.one-row {
    margin-bottom: 20px;
}

.one-row,
.two-row {
    ::v-deep .el-card__body {
        height: 100%;
    }
}

.card-title {
    font-weight: bold;
    color: var(--el-color-primary);
    opacity: 0.9;
    padding: 0 20px;
    margin-bottom: 4px;
    font-size: 16px;
}

.chart-card {
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100%;

    .chart-Cakeshaped {
        height: 60%
    }

    .chart-Columnar {
        height: 40%
    }
}
</style>
