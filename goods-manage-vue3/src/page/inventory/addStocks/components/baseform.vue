<template>
    <el-form ref="formRef" :model="stockForm" :rules="rules" label-width="85px">
        <el-form-item label="添加方式">

            <el-col :lg="12" :span="24">
                <el-radio-group v-model="addWay">
                    <el-radio :value="0" :border=true>新增来源</el-radio>
                    <el-radio :value="1" :border=true>已知来源</el-radio>
                </el-radio-group>
              </el-col>

            <el-col :lg="12" :span="24" v-show="addWay==0">
                <el-text  type="warning"> 注意：新增的去向信息会同步至物资来源</el-text>
            </el-col>


        </el-form-item>
        <el-form-item prop="type" label="入库类型">
            <el-radio-group v-model="stockForm.type">
                <el-radio v-for="item in AddStoragesTypeOption" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
        </el-form-item>




        <div v-if="addWay == 0">
            <el-row :gutter="0">
                <el-col :lg="8" :span="24">
                    <el-form-item prop="valueProvince" label="省份">
                        <el-select v-model="stockForm.valueProvince" placeholder="请选择省" clearable>
                            <el-option v-for="item in options1" :label="item.name" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :span="24">
                    <el-form-item prop="valueCity" label="城市">
                        <el-select v-model="stockForm.valueCity" placeholder="请选择市" clearable>
                            <el-option v-for="item in options2" :label="item.name" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :span="24">
                    <el-form-item prop="valueOrigin" label="区县">
                        <el-select v-model="stockForm.valueOrigin" placeholder="请选择区县" clearable>
                            <el-option v-for="item in options3" :label="item.name" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item prop="name" label="具体来源">
                <el-col :lg="8" :span="24">
                    <el-input v-model="stockForm.name" placeholder="请输入具体来源名称" />
                </el-col>
            </el-form-item>
            <el-form-item prop="contact" label="联系人">
                <el-col :lg="8" :span="24">
                    <el-input v-model="stockForm.contact" placeholder="请输入联系人名称" />
                </el-col>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-col :lg="8" :span="24">
                    <el-input v-model="stockForm.email" placeholder="请输入邮箱" />
                </el-col>
            </el-form-item>
            <el-form-item prop="phone" label="电话">
                <el-col :lg="8" :span="24">
                    <el-input v-model="stockForm.phone" placeholder="请输入电话" />
                </el-col>
            </el-form-item>


        </div>

        <div v-else>
            <el-form-item prop="supplierId" label="物资来源">
                <el-select v-model="stockForm.supplierId" placeholder="请选择已知来源" clearable>
                    <el-option v-for="item in supplierAll" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>

            <div v-if="supplierSelected">
                <el-form-item label="物资地址">
                    <el-col :lg="8" :span="24">
                        <el-input v-model="supplierSelected.address" disabled />
                    </el-col>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-col :lg="8" :span="24">
                        <el-input v-model="supplierSelected.phone" disabled />
                    </el-col>
                </el-form-item>
                <el-form-item label="电子邮件">
                    <el-col :lg="8" :span="24">
                        <el-input v-model="supplierSelected.email" disabled />
                    </el-col>
                </el-form-item>
                <el-form-item label="联系人员">
                    <el-col :lg="8" :span="24">
                        <el-input v-model="supplierSelected.contact" disabled />
                    </el-col>
                </el-form-item>
            </div>
        </div>


        <el-row :gutter="30">
            <el-col :span="12">
                <el-form-item prop="sort" label="排序">
                    <el-input-number v-model="stockForm.sort" size="small" :min="1" :max="100" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="物资总类">
                    <el-text type="success">已选 {{ typeNumber }} 个</el-text>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item label="物资明细">
            <div class="tag-box" v-if="stockForm.products.length > 0">
                <el-tag type="warning" v-for="item in stockForm.products">{{ item.name }}</el-tag>
            </div>
            <el-text v-else type="warning">请在右侧选择物资</el-text>

        </el-form-item>

        <el-form-item prop="remark" label="描述信息">
            <el-input v-model="stockForm.remark" type="textarea" placeholder="请填写描述信息" />
        </el-form-item>


        <el-form-item>
            <el-button type="primary" :loading="loading" @click="onSubmit">立即入库</el-button>
            <el-button @click="onReset">重置</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup lang='ts'>
import { ref, onMounted, computed, reactive } from 'vue';
import type { addStocksForm, productItem, SupplierItem } from "@/types/api/inventory/storage";
import { AddStoragesTypeOption } from "@/bus/shareData";
import { AddSocksType } from "@/types/api/enum";
import useRegionSelect from "@/hook/common/regionSelect";
import type { FormInstance, FormRules } from 'element-plus'
import $bus from "@/bus/index";
import { addStocks, findAll } from "@/api/inventory/storage";
import Tip from '@/utils/element/elMessageTip'
import { useRouter } from "vue-router";

let $router = useRouter();

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
    supplierId: [
        { required: true, message: '请选择已知来源', trigger: 'change' },
    ],

    type: [
        { required: true, message: '请填写入库类型', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请填写具体来源', trigger: 'blur' },
    ],
    contact: [
        { required: true, message: '请填写联系人', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请填写邮箱', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请填写电话', trigger: 'blur' },
    ],

    sort: [
        { required: true, message: '请填写序号', trigger: 'blur' },
    ],
    remark: [
        { required: true, message: '请填写描述', trigger: 'blur' },
    ],


})


let stockForm = ref<addStocksForm>({
    address: '',
    province: '',
    city: '',
    origin: '',

    valueProvince: '',
    valueCity: '',
    valueOrigin: '',

    contact: '',
    email: '',
    name: '',
    phone: '',

    remark: '',
    sort: 1,
    type: AddSocksType.donation,
    products: [],
    supplierId: undefined

});
let addWay = ref(0);
let typeNumber = computed(() => {
    return stockForm.value.products.length;
});
let supplierAll = ref<SupplierItem[]>();
let supplierSelected = computed(() => {
    return supplierAll.value?.find((item) => item.id == stockForm.value.supplierId)
})
let loading = ref(false)

let formRef = ref<FormInstance>()

let { reqSpareOption, options1, options2, options3, getName } = useRegionSelect(stockForm, 'valueProvince', 'valueCity', 'valueOrigin');


const onSubmit = async () => {

    formRef.value?.validate().then(() => {  //这种方式不会有控制台警告

        if (stockForm.value.products.length == 0) {
            Tip('info', "请选择物资产品");
            return
        }

        //不同方式过滤不同字段
        if (addWay.value == 0) {
            //部分字段填写
            let { valueCity, valueOrigin, valueProvince } = stockForm.value
            stockForm.value.province = getName(valueProvince!);
            stockForm.value.city = getName(valueCity!);
            stockForm.value.origin = getName(valueOrigin!);
            stockForm.value.address = stockForm.value.province + '/' + stockForm.value.city + '/' + stockForm.value.origin;

            stockForm.value.supplierId = undefined;
        } else {
            let holdkeys = ['type', 'supplierId', 'remark', 'sort', 'products'];
            for (let key in stockForm.value) {
                if (!holdkeys.includes(key)) {
                    //@ts-ignore
                    stockForm.value[key] = undefined;
                }
            }
        }

        //过滤掉产品数组里面多余的属性，追加productId
        stockForm.value.products = stockForm.value.products.map((item, index): productItem => {
            return {
                productId: item.id!,
                productNumber: item.productNumber
            }
        })
        console.log("即将入库", stockForm.value);
        loading.value = true;
        addStocks(stockForm.value).then(() => {
            Tip('success', '物资入库成功');
            $router.push('/inventory/storage');
        }).finally(() => {
            loading.value = false;

        })

    }).catch(() => {

    });



}
const onReset = () => {
    formRef.value?.resetFields();
    console.log("重置", stockForm);
    //部分字段手动置空
    // stockForm.value.products = [];
    stockForm.value.address = '';
    stockForm.value.province = '';
    stockForm.value.city = '';
    stockForm.value.origin = '';
}

onMounted(async () => {
    reqSpareOption();
    $bus.on('listChange', (val: any) => {
        // console.log("检测到产品数组变化",val);
        if (val.length > 0) {
            // console.log("产品数组变化", val);
            //改变ID属性，重新复制到表单
            val.forEach((item: productItem, index: number) => {
                val[index].productNumber = item.productNumber ? item.productNumber : 1;
            })
        }
        stockForm.value.products = JSON.parse(JSON.stringify(val));
    })

    findAll().then((res) => {
        supplierAll.value = res.data;
    }).catch(() => {
        Tip("error", "获取已知来源失败")
    })

})



</script>

<style scoped lang='scss'>
.tag-box {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
</style>
