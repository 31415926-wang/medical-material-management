<template>
    <CrudTable ref="CrudTableRef" :needOperate="true" :operateWidth="260" :addCheckForm="addCheckForm"
        :editorCheckForm="editorCheckForm">

        <template v-slot:statusCol="{ scope }">
            <el-switch v-model="scope.row.status" :loading="scope.row.loadingStatus"
                :before-change="() => { return beforeChangeStatus(scope.row) }" />
        </template>

        <!-- 新增弹框 -->
        <template v-slot:addForm="{ formInfo }">
            <el-form ref="addCheckForm" :inline="false" :model="formInfo" label-width="80px" :rules="rules">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="formInfo.roleName" placeholder="请输入角色名称"/>
                </el-form-item>
                <el-form-item label="描述信息" prop="remark">
                    <el-input v-model="formInfo.remark" placeholder="请输入描述信息"/>
                </el-form-item>
            </el-form>
        </template>

        <!-- 编辑框 -->
        <template v-slot:editorForm="{ formInfo }">
            <el-form ref="editorCheckForm" :inline="false" :model="formInfo" label-width="80px" :rules="rules">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="formInfo.roleName" placeholder="请输入角色名称"/>
                </el-form-item>
                <el-form-item label="描述信息" prop="remark">
                    <el-input v-model="formInfo.remark" placeholder="请输入描述信息"/>
                </el-form-item>
            </el-form>
        </template>

        <!-- 拓展功能 -->
        <template v-slot:operateExpand="{ rowInfo }">
            <el-tooltip content="角色授权" placement="top" effect="dark">
                <el-button icon="Setting" @click="authOpenDialog(rowInfo)"></el-button>
            </el-tooltip>
        </template>

    </CrudTable>

    <!-- 授权弹框 -->
    <el-dialog v-model="authDialogVisible" title="角色权限分配" :before-close="handleCloseBefore">
        <div class="custom-scrollbar dialog-container">
            <el-tree ref="tree" id="tree" :data="treeData.data" show-checkbox node-key="id"
                :default-expanded-keys="expandedArr" :default-checked-keys="checkedArr" :props="defaultProps">
                <template #default="{ node, data }">
                    <span class="custom-tree-node">
                        <span><el-icon style="margin-right:7px ;">
                                <component  v-if="handleIcon(data.icon) != ''" :is="handleIcon(data.icon)" />
                            </el-icon>{{ node.label }}</span>
                    </span>
                </template>
            </el-tree>
        </div>
        <template #footer>
            <el-button icon="CloseBold" @click="handleCloseBefore">
                关闭
            </el-button>
            <el-button type="primary" icon="Setting" :loading="authLoadingStatus" @click="authHandleSumit">授权</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import initCrud from '@/hook/crud/initCrud'
import roleApiMethod from '@/api/authority/role/index';
import { tableCol } from "@/types/common/Crud/index"
import { treeItemInfo, roleListItem } from "@/types/api/authority/role"
import Tip from '@/utils/element/elMessageTip'
import LoadingTool from "@/utils/element/elLoading"
import {handleIcon} from '@/utils/index'



let addCheckForm = ref();
let editorCheckForm = ref();

let CrudTableRef = ref();
let tableCols = reactive([
    {
        prop: 'roleName',
        label: '角色名',
        width: 2,
        searchType: 'input'
    },
    {
        prop: 'createTime',
        label: '创建时间',
        width: 2,
    },
    {
        prop: 'status',
        label: '是否禁用',
        width: 1,
        rebuild: true
    },
    {
        prop: 'remark',
        label: '备注',
        width: 4,
    },
] as tableCol[]);

//获得表格数据后再进行处理
const getDataAfter = (tableDate: any) => {
    //追加属性
    tableDate.rows.forEach((item: roleListItem) => {
        item.loadingStatus = false
    })

}

initCrud(CrudTableRef, {
    title: '角色',
    apiMethod: roleApiMethod
},
    tableCols, getDataAfter
);

//@ts-ignore
const rules = reactive<FormRules<RuleForm>>({
    roleName: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
    ],
    remark: [
        { required: true, message: '请输入描述信息', trigger: 'blur' },
        { min: 3, max: 10, message: '最小长度3-10', trigger: 'blur' }],
})



const beforeChangeStatus = (row: roleListItem) => {
    // console.log("1状态", row);  //能拿到的是改变前的状态

    row.loadingStatus = true
    return new Promise((resolve, reject) => {

        roleApiMethod.isBan(row.id, !row.status).then(() => {
            row.loadingStatus = false;
            resolve(true)
            Tip('success', '修改状态成功');

        }).catch(() => {
            row.loadingStatus = false;
            reject(true)
        })
    })
}

//授权弹框
let authDialogVisible = ref(false);
let authLoadingStatus = ref(false);
let tree = ref();

const defaultProps = {
    children: 'children',
    label: 'menuName',
    disabled: 'disabled',
}

let expandedArr = ref([] as number[]);
let checkedArr = ref([] as number[]);
const treeData = reactive({
    data: [] as treeItemInfo[],
    id: 0  //存储选中的id，供后面提交使用
});

const authOpenDialog = async (rowParam: roleListItem) => {
    authDialogVisible.value = true;
    LoadingTool.openLoading(document.getElementById('tree') as HTMLElement);
    try {
        let authInfoData = (await roleApiMethod.getAuthInfo(rowParam.id)).data;
        console.log("权限初始数据", authInfoData);
        treeData.data = authInfoData.tree;
        treeData.id = rowParam.id;
        expandedArr.value = authInfoData.open
        checkedArr.value = authInfoData.mids
        LoadingTool.closeLoading();
    } catch (error) {
        LoadingTool.closeLoading();
    }

}

const handleCloseBefore = () => {
    authDialogVisible.value = false;
    treeData.id = 0;
    treeData.data = [];
    expandedArr.value = [];
    checkedArr.value = [];
}
const authHandleSumit = async () => {
    console.log("选中的节点");
    authLoadingStatus.value = true
    let selectedNodes = tree.value.getCheckedKeys()
    roleApiMethod.setAuthInfo(treeData.id, selectedNodes).then(() => {
        authLoadingStatus.value = false
        handleCloseBefore();
        Tip('success', '分配权限成功');
    }).catch(() => {
        authLoadingStatus.value = false
    })

}



</script>

<style scoped lang='scss'>

</style> 