<template>

    <el-drawer @open="open" @update:model-value="$emit('update:visiableDrawer', $event)" :model-value="visiableDrawer"
        title="签到记录" direction="rtl">
        <div class="drawer-content">
            <ul v-for="item in list" :key="item.id">
                <li>打卡ID：{{ item.userId }}</li>
                <li>打卡位置{{ item.address }}</li>
                <li>打卡时间{{ item.createTime }}</li>
                <li>健康状况:
                    <el-tag :type="item.situation == 0 ? 'success' : 'danger'" effect="dark" style="float: right;">
                        {{ item.situation == 0 ? '健康' : '发热' }}
                    </el-tag>
                </li>
            </ul>


            <el-pagination small background layout="prev, pager, next" :total="total"
            v-model:current-page="params.pageNum"
            @current-change="change"
            :page-size="5"
            class="pagination"
            />

        </div>
    </el-drawer>


</template>


<script setup lang='ts'>
import { ref } from 'vue';
import type { RecordItem } from "@/types/api/report/record";
import { reCordList } from "@/api/report/record";
import type { searchParam } from "@/types/api/index";
import loadingObj from '@/utils/element/elLoading'


let params = ref<searchParam>({
    pageNum: 1,
    pageSize: 5
})
let total =ref(0)
let list = ref<RecordItem[]>();

defineProps<{
    visiableDrawer: boolean
}>()

let $emit = defineEmits<{
    (e: 'update:visiableDrawer', value: boolean): void
}>()

const open = async () => {
    loadingObj.openLoading(document.querySelector(".drawer-content") as HTMLElement);
    let { data } = await reCordList(params.value);
    list.value = data.rows;
    total.value=data.total;
    loadingObj.closeLoading();

    
}

const change = () => {
    open();
}

</script>

<style scoped lang='scss'>
ul {
    list-style: disc;
}

.drawer-content {
    height: 100%;
    &>ul {
        padding: 20px 40px 20px 80px;
        margin-bottom: 10px;

        &>li:not(:last-child) {
            margin-bottom: 7px;
        }
    }

    &>ul:not(:last-of-type) {
        box-shadow: 0px 10px 2px rgba(0, 0, 0, 0.1);
    }
    .pagination{
        margin-top: 20px;
    }

}
</style>


<style>
.el-drawer__body {
    padding: 0;
}

.el-drawer__header {
    margin-bottom: 20px;
}
</style>