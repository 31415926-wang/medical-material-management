<template>

    <el-alert v-if="isReport" :title="`今日已成功打卡,勤洗手,戴口罩,不群聚,打卡时间: [${defaultform.nowtime}] `" type="success"
        :closable="false" show-icon class="alert-box" />
    <div class="bt-box">
        <el-button type="warning" @click="handleDrawer">签到记录</el-button>
        <el-button type="primary" @click="onsubmit" v-if="!isReport">立即打卡</el-button>
        <el-button @click="reset" v-if="!isReport">重置</el-button>
    </div>
    <div class="from">
        <div class="title">基本信息</div>
        <div class="hr"></div>

        <el-form :inline="true" :model="defaultform" class="demo-form-inline">
            <el-form-item label="打卡人">
                <el-input v-model="UserStore.userInfo.nickname" disabled style="width: 120px;" />
            </el-form-item>
            <el-form-item label="打卡时间">
                <el-date-picker v-model="defaultform.nowtime" type="datetime" format="YYYY/MM/DD HH:mm:ss" disabled />
            </el-form-item>
            <el-form-item label="所属部门">
                <el-input v-model="UserStore.userInfo.department" disabled />
            </el-form-item>
        </el-form>

        <div class="title">健康打卡</div>
        <div class="hr"></div>

        <el-form ref="recordFormRef" :model="recordForm" :rules="rules" label-position="top" class="record-form">
            <el-row :gutter="20">
                <el-col :span="6"> <el-form-item prop="valueProvince" label="省份">
                        <el-select v-model="recordForm.valueProvince" placeholder="请选择省" :disabled="isReport" clearable>
                            <el-option v-for="item in options1" :label="item.name" :value="item.value" />
                        </el-select>
                    </el-form-item></el-col>
                <el-col :span="5"> <el-form-item prop="valueCity" label="城市">
                        <el-select v-model="recordForm.valueCity" placeholder="请选择市" :disabled="isReport" clearable>
                            <el-option v-for="item in options2" :label="item.name" :value="item.value" />
                        </el-select>
                    </el-form-item></el-col>
                <el-col :span="8"> <el-form-item prop="valueOrigin" label="区县">
                        <el-select v-model="recordForm.valueOrigin" placeholder="请选择区" :disabled="isReport" clearable>
                            <el-option v-for="item in options3" :label="item.name" :value="item.value" />
                        </el-select>
                    </el-form-item></el-col>
                <el-col :span="5">
                    <el-form-item prop="" label="打卡位置" v-if="isReport">
                        <el-tag>{{ recordForm.address }}</el-tag>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item prop="situation" label="目前健康状况">
                        <el-radio-group v-model="recordForm.situation" :disabled="isReport">
                            <el-radio :label="0">健康</el-radio>
                            <el-radio :label="1">有咳嗽发热症状</el-radio>
                            <el-radio :label="2">其他情况</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="5"></el-col>
                <el-col :span="8"> <el-form-item prop="reception" label="接触的人是否有疑似症状?(冠状病毒检测结果为阳性或尚在等待检测结构)">
                        <el-radio-group v-model="recordForm.reception" :disabled="isReport">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item></el-col>
                <el-col :span="5"> </el-col>
            </el-row>


            <el-row :gutter="20">
                <el-col :span="6"> <el-form-item prop="passby" label="自2020年1月1日起,是否在湖北省停留过(保存转车路过)">
                        <el-radio-group v-model="recordForm.passby" :disabled="isReport">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item></el-col>
                <el-col :span="5"></el-col>
                <el-col :span="8"> <el-form-item prop="touch" label="自2020年1月1日起,是否有接待过来自湖北的客户(亲戚或朋友)">
                        <el-radio-group v-model="recordForm.touch" :disabled="isReport">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item></el-col>
                <el-col :span="5"> </el-col>
            </el-row>

        </el-form>
    </div>


    <DrawerRecord v-model:visiableDrawer="showDrawer"></DrawerRecord>


</template>

<script setup lang='ts'>
import { ref, onMounted, computed, watch, reactive, onUnmounted } from 'vue';
import type { RecordForm } from "@/types/api/report/record";
import { reqReport } from "@/api/report/record";
import useRegionSelect from "@/hook/common/regionSelect";
import type { FormInstance, FormRules } from 'element-plus'
import Tip from '@/utils/element/elMessageTip'
import { ElNotification } from 'element-plus'
import useUserStore from "@/store/modules/user";
import dayjs from "dayjs"
import DrawerRecord from './components/drawerRecord.vue'
import loadingObj from '@/utils/element/elLoading'


let UserStore = useUserStore();
let timer: any;
const defaultform = ref({
    username: '',
    nowtime: '',
    department: '',
})

const recordForm = ref<RecordForm>({
    passby: null,
    reception: null,
    situation: null,
    touch: null,
    address: '',
    province: '',
    city: '',
    origin: '',
    valueProvince: '',
    valueCity: '',
    valueOrigin: ''
})

let recordFormRef = ref<FormInstance>();
let isReport = ref(false);
let showDrawer = ref(false);

let { reqSpareOption, options1, options2, options3, getName } = useRegionSelect(recordForm, 'valueProvince', 'valueCity', 'valueOrigin');



const rules = reactive<FormRules<{}>>({
    valueProvince: [
        { required: true, message: '请选择省份', trigger: 'change' },
    ],
    valueCity: [
        { required: true, message: '请选择城市', trigger: 'change' },
    ],
    valueOrigin: [
        { required: true, message: '请选择区县', trigger: 'change' },
    ],
    touch: [
        { required: true, message: '请勾选选项', trigger: 'change' },
    ],
    passby: [
        { required: true, message: '请勾选选项', trigger: 'change' },
    ],
    reception: [
        { required: true, message: '请勾选选项', trigger: 'change' },
    ],
    situation: [
        { required: true, message: '请勾选选项', trigger: 'change' },
    ]
})



const onsubmit = async () => {
    console.log("点击提交", recordForm.value);
    await recordFormRef.value?.validate();
    //处理地址
    let { valueCity, valueOrigin, valueProvince } = recordForm.value
    recordForm.value.province = getName(valueProvince)!;
    recordForm.value.city = getName(valueCity)!;
    recordForm.value.origin = getName(valueOrigin)!;
    recordForm.value.address = recordForm.value.province + '/' + recordForm.value.city + '/' + recordForm.value.origin
    
    loadingObj.openLoading(document.querySelector(".from") as HTMLElement);
    reqReport(recordForm.value).then(()=>{
        isReport.value = true;
        clearTimer();
        Tip('success', '打卡成功!');
    }).finally(()=>{
         loadingObj.closeLoading();
    })
   
}

const reset = () => {
    recordFormRef.value!.resetFields();
}

const clearTimer = () => {
    if (timer) {
        clearInterval(timer);
        timer = undefined;
    }
}

const handleDrawer = () => {
    showDrawer.value = true;
}

onMounted(() => {
    reqSpareOption();
    timer = setInterval(() => {
        defaultform.value.nowtime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000)
    ElNotification({
        title: '温馨提示',
        message: '您今日还未打卡,别忘记了哟~',
        type: 'warning',
    })
})


onUnmounted(() => {
    clearTimer();
})


</script>

<style scoped lang='scss'>
.alert-box {
    position: relative;
    bottom: 10px;
    margin-bottom: 15px;
}

.from {
    &>* {
        margin-bottom: 30px;
    }
}

.title {
    font-size: 15px;
    font-weight: bold;
}

.bt-box {
    display: block;
    gap: 2px;
    float: right;
}

.hr {
    border-bottom: 1px solid rgb(220, 223, 230);
}

.record-form {
    &>.el-row {
        margin-bottom: 10px;
    }
}

::v-deep .el-alert__title {
    font-size: 15px;
}
</style>