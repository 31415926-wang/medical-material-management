<template>
    <el-dialog :modelValue="dialogVisible" @update:modelValue="$emit('update:dialogVisible', $event)" title="发放明细"
    @open="getDetail"
    width="45%"
    >
        <div class="dialog-box">
            <el-card class="el-card">
                <el-form  label-width="85px">
                    <el-row style="margin-bottom: 10px;">
                        <el-col :span="12">
                            <el-form-item label="省区市:">
                                <el-tag size="large" >{{ detailInfo?.consumerVO.address}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="具体位置:">
                                <el-tag size="large" >{{ detailInfo?.consumerVO.name }}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="联系人:">
                                <el-tag size="large" >{{ detailInfo?.consumerVO.contact }}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话:">
                                <el-tag size="large" >{{ detailInfo?.consumerVO.phone }}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row> 

                </el-form>
            </el-card>

            <el-steps v-if="detailInfo?.status!=StoragesStatus.recycle" :space="200" :active="detailInfo?.status==StoragesStatus.Pending? 2:3" finish-status="success" simple class="steps">
                <el-step title="提交发放单"  />
                <el-step title="审核发放单"  />
                <el-step title="成功发放"  />
            </el-steps>

            <el-table :data="detailInfo?.itemVOS" style="width: 100%"
            :cell-style="{ 'height':'70px' }"
            >
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="pnum" label="商品编号" />
                <el-table-column prop="model" label="规格" />
                <el-table-column prop="count" label="数量" width="100"/>
                <el-table-column prop="unit" label="单位" width="100"/>
            </el-table>
            
            <el-pagination background 
            v-model:current-page="pageNum"
            @current-change="getDetail" layout="prev, pager, next,total" :total="pageTotal" :page-size="3"/>
        </div>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import type { listItem,ProvideStocksRecordDetail } from "@/types/api/inventory/provide";
import provideApiMethod from "@/api/inventory/provide";
import loadingObj from '@/utils/element/elLoading'
import { StoragesStatus } from "@/types/api/enum";


let $prop= defineProps<{ 
    dialogVisible: boolean,
    infoItem?: listItem
}>()

let $emit = defineEmits<{
    (e: 'update:dialogVisible', value: boolean): void
}>();

let detailInfo=ref<ProvideStocksRecordDetail>();
//分页
let pageNum=ref(1);
let pageTotal=ref(0);

const getDetail=async ()=>{
    loadingObj.openLoading(document.querySelector(".dialog-box") as HTMLElement);
    let result=await provideApiMethod.getProvideStocksDetail($prop.infoItem!.id,pageNum.value);
    loadingObj.closeLoading();
    detailInfo.value=result.data;
    pageTotal.value=result.data.total;
}
 
</script>

<style scoped lang='scss'>

.dialog-box{
    &>*{
        margin-bottom: 13px;
    }
}

.el-form-item{
    margin-bottom: 0
}

::v-deep .dialog-box{
    .el-card{
        padding: 20px !important;
    }
}
</style>