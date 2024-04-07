
<template>
    <CrudTable ref="CrudTableRef" :needOperate="true" :closeViewDetail="true" :operateColWidth="175"
        :addCheckForm="addCheckForm" :editorCheckForm="editorCheckForm" operateButtonType='textType' 
        :customOperate="true"
        :dialogWidths="{
            add: '32%', 
            editor: '32%',
            detail: '34%'
        }">

        <!-- 查询 -->
        <template v-slot:search-custom="{ scope }">
            <el-form-item label="物资状态">
                <el-select v-model="scope.searchParam.status" placeholder="请选择物资状态">
                    <el-option v-for="item in GOODSTATUS_OPTIONS" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="分类查询">
                <el-cascader v-model="scope.searchParam.categorys"
                    @change="(selected: []) => { handleChange(selected, scope.searchParam) }" :options="categoryOption"
                    :props="propCascader" clearable placeholder="请选择分类查询" />
            </el-form-item>

        </template>

        <!-- 自定义操作列 -->

        <template #operateExpand="{ rowInfo }">
            <el-button text type='primary' class="mini" icon="EditPen" @click="handleColEditor(rowInfo.id)">编辑</el-button>

            <el-popconfirm title="确定加入回收站吗？" @confirm="handleColDelete(rowInfo.id)">
                <template #reference>
                    <el-button text type='primary' class="mini" icon="Delete" >回收站</el-button>
                </template>
            </el-popconfirm>
        </template>



        <!-- 自定义的列 -->
        <template v-slot:unitCol="{ scope }">
            <el-text type="warning">{{ scope.row?.unit }}</el-text>
        </template>
        <template v-slot:modelCol="{ scope }">
            <el-tag>{{ scope.row?.model }}</el-tag>
        </template>
        <template v-slot:statusCol="{ scope }">
            <el-tag :type="statusHanlde(scope.row?.status)">
                {{ GetLabel(scope.row?.status, GOODSTATUS_OPTIONS) }}
            </el-tag>
        </template>


        <!-- 新增弹框 -->
        <template v-slot:addForm="{ formInfo }">
            <el-form ref="addCheckForm" :model="formInfo" label-width="80px" :rules="rules">
                <el-form-item label="物资名称" prop="name">
                    <el-input v-model="formInfo.name" placeholder="请输入物资名称" />
                </el-form-item>
                <el-row>
                    <el-col :span="24" :lg="10">
                        <el-form-item label="物资规格" prop="model">
                            <el-input v-model="formInfo.model" placeholder="请输入规格" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="14">
                        <el-form-item label="分类" prop="categoryKeys">
                            <!-- <el-input v-model="formInfo.categoryKeys" placeholder="请选择分类" /> -->
                            <el-cascader v-model="formInfo.categoryKeys" :options="categoryOption"
                                :props="propCascaderDialog" clearable placeholder="请选择分类" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="10">
                        <el-form-item label="单位" prop="unit">
                            <el-input v-model="formInfo.unit" placeholder="请填写单位" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="14">
                        <el-form-item label="排序" prop="sort">
                            <el-input-number v-model="formInfo.sort" :min="1" placeholder="" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="备注信息" prop="remark">
                    <el-input type="textarea" v-model="formInfo.remark" placeholder="请输入备注信息" />
                </el-form-item>

                <el-form-item label="" prop="" v-show="false">
                    <el-input v-model="formInfo.imageUrl" />
                </el-form-item>

            </el-form>
        </template>

    </CrudTable>

    
        <!-- 编辑弹框-->

        <el-dialog v-model="dialogEditorVisible" title="编辑物资" width="32%" 
        :before-close="handleClose" >
            <el-form ref="editorCheckForm" :model="editorInfo" label-width="80px" :rules="rules">
                <el-form-item label="物资名称" prop="name">
                    <el-input v-model="editorInfo.name" placeholder="请输入物资名称" />
                </el-form-item>
                <el-row>
                    <el-col :span="24" :lg="10">
                        <el-form-item label="物资规格" prop="model">
                            <el-input v-model="editorInfo.model" placeholder="请输入规格" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="14">
                        <el-form-item label="分类" prop="categoryKeys">
                            <el-cascader v-model="editorInfo.categoryKeys" :options="categoryOption"
                                :props="propCascaderDialog" clearable placeholder="请选择分类" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="10">
                        <el-form-item label="单位" prop="unit">
                            <el-input v-model="editorInfo.unit" placeholder="请填写单位" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="14">
                        <el-form-item label="排序" prop="sort">
                            <el-input-number v-model="editorInfo.sort" :min="1" placeholder="" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="备注信息" prop="remark">
                    <el-input type="textarea" v-model="editorInfo.remark" placeholder="请输入备注信息" />
                </el-form-item>

                <el-form-item label="" prop="" v-show="false">
                    <el-input v-model="editorInfo.imageUrl" />
                </el-form-item>

            </el-form>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="handleClose">
                            关闭
                        </el-button>
                        <el-button  type="primary" :loading="editorLoadingStatus" @click="handleSumitEditor">提交</el-button>
                    </span>
                </template>

    </el-dialog> 


</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import infoApiMethod from '@/api/goods/info'
import initCrud from '@/hook/crud/initCrud'
import { tableCol } from "@/types/common/Crud/index"
import { GOODSTATUS_OPTIONS, GetLabel } from "@/bus/shareData"
import { itemCategory } from '@/types/api/goods/info'
import Tip from '@/utils/element/elMessageTip'
import {infoItem} from "@/types/api/goods/info"

//@ts-ignore
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请输入物资名称', trigger: 'blur' },
    ],
    model: [
        { required: true, message: '请填写物资规格', trigger: 'blur' }],
    categoryKeys: [
        { required: true, message: '请选择分类', trigger: 'blur' }
    ],
    unit: [
        { required: true, message: '请填写单位', trigger: 'blur' }
    ],
    sort: [
        { required: true, message: '请填写序号', trigger: 'blur' }
    ],
    remark: [
        { required: true, message: '请填写备注信息', trigger: 'blur' }
    ]

})



let tableCols = reactive([
    {
        prop: 'name',
        label: '物资名称',
        searchType: 'input'
    },
    {
        prop: 'pnum',
        label: '物资编号',
    },
    {
        prop: 'model',
        label: '物资规格',
        rebuild: true,
        width:150

    },
    {
        prop: 'unit',
        label: '单位',
        rebuild: true,
        width:150

    },
    {
        prop: 'remark',
        label: '备注',
    },
    {
        prop: 'status',
        label: '状态',
        rebuild: true,
        width:150
    },
    {
        prop: 'createTime',
        label: '创建时间',
    }

] as tableCol[]);

let addCheckForm = ref();
let editorCheckForm = ref();

let CrudTableRef = ref();
initCrud(CrudTableRef, {
    title: '物资',
    apiMethod: infoApiMethod
},
    tableCols
);

const statusHanlde = (status: any) => {
    let result = ''
    switch (status) {
        case 0:
            result = 'success';
            break;
        case 1:
            result = 'info';
            break;
        case 2:
            result = 'warning';
            break;
    }
    return result;
}

let categoryOption = ref([] as itemCategory[]);  //存对象数组
let propCascader = ref({
    value: 'id',
    label: 'name',
    expandTrigger: 'hover' as const,
    checkStrictly: true, //遵守父子节点不互相关联，使得可以只选择一级，而不需要三个都选
});
let propCascaderDialog = ref({
    value: 'id',
    label: 'name',
    expandTrigger: 'hover' as const,
});


const handleChange = (selectCategorys: [], searchParam: any) => {
    // console.log('断点',selectCategorys);
    searchParam.categorys = selectCategorys.join();  //这里执行比v-model慢，覆盖刚刚好
}

//自定义列的操作点击功能

let dialogEditorVisible=ref(false);
let editorLoadingStatus=ref(false);
let editorInfo=ref({} as infoItem);

const handleClose=()=>{
    dialogEditorVisible.value=false;
    editorInfo.value={} as infoItem; //初始化时清空
}

const handleColEditor = async (id: number) => {
    dialogEditorVisible.value= true;
    console.log("打开编辑框", dialogEditorVisible.value);
    
    let result = await infoApiMethod.getGoodsItem(id);
    console.log("单行请求的详细数据", result);
    editorInfo.value=result.data;
    editorInfo.value.categoryKeys =[
        editorInfo.value.oneCategoryId!,
        editorInfo.value.twoCategoryId!,
        editorInfo.value.threeCategoryId!
    ]

    editorInfo.value.oneCategoryId= undefined;
    editorInfo.value.twoCategoryId= undefined;
    editorInfo.value.threeCategoryId= undefined;

}
const handleColDelete = async (id: number) => {
    await infoApiMethod.deleteItem(id);
    Tip('success', '移入回收站成功');
    CrudTableRef.value.hookCrudObject.getData();
}

const handleSumitEditor=async ()=>{
    await infoApiMethod.updateItem( editorInfo.value);
    Tip('success', '更新物资成功');
    handleClose();
    CrudTableRef.value.hookCrudObject.getData();
    }

onMounted(async () => {
    let result = await infoApiMethod.getCategoryTree();
    // console.log("请求分类", result.data.rows);
    categoryOption.value = result.data.rows;
})


</script>

<style scoped lang='scss'></style>



















