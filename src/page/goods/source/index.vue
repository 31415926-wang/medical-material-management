
<template>
    <CrudTable ref="CrudTableRef" :addCheckForm="addCheckForm" :editorCheckForm="editorCheckForm" :needOperate="true"
        :closeViewDetail="true" operateButtonType="textType" :operateColWidth="180" 
        :needReqDetail="true" :dialogWidths="{
            add: '35%',
            editor: '32%',
            detail: '34%'
        }" @openDialogBefore="reqSpareOption" @beforeSubmitHanle="beforeSubmitHanle">

        <template v-slot:nestCol>
            <el-table-column label="物资提供方地址">
                <el-table-column prop="address1" label="省份" >
                    <template #default="scope">
                            <span style="color: #529b2e;">{{ scope.row.address1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address2" label="市" >
                    <template #default="scope">
                            <span style="color: #b88230;">{{ scope.row.address2 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address3" label="区县" >
                    <template #default="scope">
                            <span style="color: #f89898;">{{ scope.row.address3 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="地址" >
                </el-table-column>
            </el-table-column>
        </template>


        <!-- 新增弹框 -->
        <template v-slot:addForm="{ formInfo }">
            <el-form ref="addCheckForm" :model="formInfo" label-width="80px" :rules="rules">
                <el-row>
                    <el-col v-for="(item, index) of ['省份', '城市', '区县']" :span="24" :lg="8">
                        <el-form-item :label="item" :prop="'address' + (index + 1)">
                            <el-select v-model="formInfo[`address${(index + 1)}`]" :placeholder="`请选择${item}`"
                                @change="(variable: any) => { switchEvent(index, variable, formInfo) }">
                                <template v-if="index == 0">
                                    <el-option v-for="inItem in options1" :key="inItem.value" :label="inItem.name"
                                        :value="inItem.name" />
                                </template>
                                <template v-else-if="index == 1">
                                    <el-option v-for="inItem in options2" :key="inItem.value" :label="inItem.name"
                                        :value="inItem.name" />
                                </template>
                                <template v-else>
                                    <el-option v-for="inItem in options3" :key="inItem.value" :label="inItem.name"
                                        :value="inItem.name" />
                                </template>

                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-form-item label="详细地址" prop="name">
                    <el-input type="textarea" v-model="formInfo.name" placeholder="请输入来源详细地址" />
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="formInfo.contact" placeholder="请输入联系人" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formInfo.email" placeholder="请输入邮箱地址" />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="formInfo.phone" placeholder="请输入电话号码" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="formInfo.sort" :min="1" />
                </el-form-item>
            </el-form>
        </template>

        <!-- 编辑弹框 -->
        <template v-slot:editorForm="{ formInfo }">
            <el-form ref="editorCheckForm" :model="formInfo" label-width="80px" :rules="rules">
                <el-form-item label="省市区县" prop="address">
                    <el-input v-model="formInfo.address" disabled="" />
                </el-form-item>
                <el-form-item label="详细地址" prop="name">
                    <el-input type="textarea" v-model="formInfo.name" placeholder="请输入来源详细地址" />
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="formInfo.contact" placeholder="请输入联系人" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formInfo.email" placeholder="请输入邮箱地址" />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="formInfo.phone" placeholder="请输入电话号码" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="formInfo.sort" :min="1" />
                </el-form-item>

            </el-form>
        </template>



    </CrudTable>
</template>

<script setup lang='ts'>
import { tableCol } from "@/types/common/Crud";
import { ref, reactive } from "vue";
import sourceApiMethod from "@/api/goods/source";
import initCrud from "@/hook/crud/initCrud";
import { pageRes } from "@/types/api";
import { itemList, cityItem } from "@/types/api/goods/source";
import { rulesValidatePhone, rulesValidateEmail } from '@/utils/validate'


//@ts-ignore
const rules = reactive<FormRules<RuleForm>>({
    address1: [
        { required: true, message: '请选择省份', trigger: 'change' },
    ],
    address2: [
        { required: true, message: '请选择城市', trigger: 'change' },
    ],
    address3: [
        { required: true, message: '请选择区县', trigger: 'change' },
    ],

    name: [
        { required: true, message: '请输入详细地址', trigger: 'blur' },
    ],
    contact: [
        { required: true, message: '请输入联系人', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: rulesValidateEmail, trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { validator: rulesValidatePhone, trigger: 'blur' }
    ],
    sort: [
        { required: true, message: '请输入排序号', trigger: 'blur' },
    ],



})

let tableCols = reactive([
    {
        prop: 'address',
        label: '省市区县',
        searchType: 'input',
        show: false
    },
    {
        prop: 'name',
        label: '地址',
        searchType: 'input',
        show: false
    },
    {
        prop: 'createTime',
        label: '创建时间',
    },
    {
        prop: 'email',
        label: '邮箱',
    },
    {
        prop: 'contact',
        label: '联系人',
        searchType: 'input'
    },
    {
        prop: 'phone',
        label: '电话',
    },
    {
        prop: 'sort',
        label: '排序',
        width:100
    },

] as tableCol[]);

let addCheckForm = ref();
let editorCheckForm = ref();

let CrudTableRef = ref();
const handleTable = (tableData: pageRes<itemList>) => {
    //追加属性
    tableData.rows.forEach((item: itemList) => {
        let addressArr = item.address.split('/');
        item.address1 = addressArr[0];
        item.address2 = addressArr[1];
        item.address3 = addressArr[2];
    })

}
initCrud(CrudTableRef, {
    title: '物资来源',
    apiMethod: sourceApiMethod
},
    tableCols, handleTable
);


//地区选项
const optionList = ref([] as cityItem[]);
const options1 = ref([] as cityItem[]);
const options2 = ref([] as cityItem[]);
const options3 = ref([] as cityItem[]);

const reqSpareOption = async () => {
    //若已经有加载下拉数据，就不需要再请求了
    if (optionList.value.length > 0) {
        return 0;
    }
    let result = await sourceApiMethod.getCityList();
    console.log("城市数据", result.data);
    optionList.value = result.data;
    //一级地区
    options1.value = optionList.value.filter((item: cityItem) => {
        return !item.parent
    })
}


const switchEvent = (index: number, selectValue: string, formInfo: any) => {
    // eval(`change${index + 1}(selectValue)`)
    if (index == 2) {
        return
    }
    let goalID: string;
    optionList.value.forEach((item, index) => {
        if (item.name == selectValue) {
            goalID = item.value;
        }
    })
    eval(`(options${index + 2}).value = optionList.value.filter((item) => {
        return item.parent == goalID
    })
    `)

    //改变上级，下级都需清空
    if (index == 0) { //第一个选择框
        formInfo.address2 = '';
        formInfo.address3 = '';
    } else {
        formInfo.address3 = '';
    }

}

const beforeSubmitHanle = (formInfo: any) => {
    if (formInfo.value.address) {  //若已经有地址了，说明是编辑，不用处理
        return
    }
    let { address1, address2, address3 } = formInfo.value;
    formInfo.value.address = [address1, address2, address3].join('/')
    formInfo.value.address1 = undefined
    formInfo.value.address2 = undefined
    formInfo.value.address3 = undefined
}


</script>

<style scoped lang='scss'></style>