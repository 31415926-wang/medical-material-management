<template>
    <div class="menu-container">
        <div class="filterRow">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
            <el-button-group>
                <el-button type="primary" @click="appendOrEditoNode(0)" icon="Plus">添加一级菜单</el-button>
                <el-button icon="Download" @click="handleExport">导出</el-button>
            </el-button-group>
        </div>
        <h3 class="titleRow">菜单权限树</h3>
        <el-tree ref="treeRef" :data="treeData" :props="defaultProps" node-key="id" :default-expanded-keys="treeExpandedArr"
            :filter-node-method="filterNode" highlight-current>
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <span class="menu-detail">
                        <el-icon>
                            <component v-if="handleIcon(data.icon) != ''" :is="handleIcon(data.icon)" />
                        </el-icon>
                        <span>{{ node.label }}</span>
                        <el-button :disabled="data.disabled" size="small" :type="data.type == 0 ? 'primary' : 'warning'"
                            plain>
                            {{ data.type == 0 ? '菜单' : `按钮 [ ${data.perms} ]` }}</el-button>
                    </span>
                    <span style="flex-grow: 1;">
                    </span>
                    <span class="button-group">
                        <el-button type="primary" icon="Plus" @click="appendOrEditoNode(1, data)" link>添加</el-button>
                        <el-button type="primary" icon="EditPen" @click="appendOrEditoNode(2, data)" link>编辑</el-button>
                        <el-button type="primary" icon="Delete" @click="removeNode(data)" link>删除</el-button>
                    </span>
                </div>
            </template>
        </el-tree>
    </div>


    <el-dialog v-model="menuDialogVisible" :before-close="handleCloseBefore">
        <template #header="{ close, titleId, titleClass }">
            <span v-html="menuDialogTitle"></span>
        </template>

        <div class="dialog-container">
            <el-form ref="menuDialogCheck" :inline="false" :model="menuDialogForm" label-width="80px" :rules="rules">
                <el-form-item label="节点名称" prop="menuName">
                    <el-input v-model="menuDialogForm.menuName" placeholder="请输入节点名称" />
                </el-form-item>
                <el-form-item label="URL" prop="url">
                    <el-input v-model="menuDialogForm.url" placeholder="请输入URL" />
                </el-form-item>

                <el-form-item label="权限编码" prop="perms">
                    <el-input v-model="menuDialogForm.perms" placeholder="请输入权限编码" />
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="menuDialogForm.icon" placeholder="请输入图标名称" />
                </el-form-item>

                <el-form-item label="是否可用" prop="disabled">
                    <el-radio-group v-model="menuDialogForm.disabled">
                        <el-radio :label="true">否</el-radio>
                        <el-radio :label="false">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否展开" prop="open">
                    <el-radio-group v-model="menuDialogForm.open">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="排序" prop="orderNum">
                    <el-input-number v-model="menuDialogForm.orderNum" :step="1" step-strictly />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="menuDialogForm.type">
                        <el-radio v-for="item in MENUTYPE_OPTIONS" :label="item.value">{{ item.label }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>

        <template #footer>
            <el-button icon="CloseBold" @click="handleCloseBefore">
                取消
            </el-button>
            <el-button type="primary" icon="Setting" :loading="menuLoadingStatus" @click="menuHandleSumit">确定</el-button>
        </template>
    </el-dialog>
</template>



<script setup lang='ts'>
import { onMounted, ref, watch, reactive, onUnmounted } from 'vue'
import { ElTree } from 'element-plus'
import menuApiMethod from '@/api/authority/menu';
import Tip from '@/utils/element/elMessageTip'
import LoadingTool from "@/utils/element/elLoading"
import { handleExportFile } from '@/utils'
import { handleIcon } from '@/utils/index'
import { treeItem } from '@/types/api/authority/menu'
import Confirm from '@/utils/element/elMessageBox'
import { MENUTYPE_OPTIONS } from '@/bus/shareData'


//树的内容
interface Tree {
    [key: string]: any
}
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
    children: 'children',
    label: 'menuName',
}
watch(filterText, (val) => {
    treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
    if (!value) return true
    return data.menuName.includes(value)
}

let treeExpandedArr = ref([] as number[]);
const treeData = ref<Tree[]>([])

onMounted(() => {
    handleGetTree();

})

const handleGetTree = () => {
    LoadingTool.openLoading(document.querySelector('.menu-container') as HTMLElement);

    menuApiMethod.getMenuTree().then((result) => {
        console.log("菜单数据", result.data);
        treeExpandedArr.value = result.data.open;
        treeData.value = result.data.tree;
        LoadingTool.closeLoading();

    }).catch(() => {
        LoadingTool.closeLoading();
    })
}

const handleExport = async () => {
    let tableExcelBlod = await menuApiMethod.exportTable();
    handleExportFile(tableExcelBlod, '菜单权限');
    Tip('success', '导出表格成功!');
}

//添加、编辑菜单的弹框
let menuDialogVisible = ref<boolean>(false);
let menuLoadingStatus = ref<boolean>(false);
let menuDialogTitle = ref<string>('');
let menuDialogForm = ref({} as any); //后续可完善初始结构
let menuDialogCheck = ref();

//@ts-ignore
const rules = reactive<FormRules<RuleForm>>({
    menuName: [
        { required: true, message: '请输入节点名称', trigger: 'blur' }
    ],
    disabled: [
        {
            required: true,
            message: '请选择是否可用',
            trigger: 'change',
        }],
    open: [
        {
            required: true,
            message: '请选择是否展开',
            trigger: 'change',
        }],
    type: [
        {
            required: true,
            message: '请选择节点类型',
            trigger: 'change',
        }]
})



enum paramType {
    appendOneLevel = 0,
    appendNode = 1,
    editorNode = 2,
}

const appendOrEditoNode = (type: paramType, nodeData?: treeItem) => {
    menuDialogVisible.value = true;
    switch (type) {
        case paramType.appendOneLevel:
            menuDialogTitle.value = '添加一级节点';
            menuDialogForm.value.parentId = 0; //一级父节点为0
            break;
        case paramType.appendNode:
            menuDialogTitle.value = `添加节点: 当前<span class="dialogTitle">[${nodeData!.menuName}]</span>`;
            menuDialogForm.value.parentId = nodeData?.id; //新增节点的父节点

            break;
        case paramType.editorNode:
            menuDialogTitle.value = `编辑节点: <span class="dialogTitle">[${nodeData!.menuName}]</span>`;
            console.log("编辑行对象", nodeData);
            menuDialogForm.value = {...nodeData};
            break;
    }
}

const removeNode = (nodeData: treeItem) => {
    Confirm(`删除节点[ ${nodeData.menuName} ]`, () => {
        menuApiMethod.deleteItem(nodeData.id).then(() => {
            Tip('success', `删除节点${nodeData.menuName}成功！`)
            handleGetTree();
        })
    })
}

const handleCloseBefore = () => {
    menuDialogVisible.value = false;

}

const menuHandleSumit = () => {
    menuDialogCheck.value.validate().then(() => {
        menuLoadingStatus.value = true;
        // console.log("提交的表单",menuDialogForm.value);
        let prop = menuDialogForm.value.id ? 'updateItem' : 'addMenuItem';
        // @ts-ignore
        menuApiMethod[prop](menuDialogForm.value).then(() => {
            Tip("success", '提交成功！');
            handleCloseBefore();
            menuLoadingStatus.value = false;
            handleGetTree();
        }).catch(() => {
            menuLoadingStatus.value = false;
        })

    })

}


onUnmounted(() => {
    console.log("页面组件销毁");
})





</script>

<style scoped lang='scss'>
.titleRow {
    margin: 25px 0 13px 0;
}

.filterRow {
    display: flex;

    .el-input {
        margin-right: 20px;
        width: 60%;
    }
}

.custom-tree-node {
    display: flex;
    width: 100%;

    .menu-detail {
        display: flex;
        align-items: center;

        * {
            // margin:0 ;
            margin-right: 10px;
        }

        *:last-child {
            margin-right: 0;
        }

        .el-button {
            padding: 2px 5px;
        }
    }

    .button-group {
        .el-button {
            margin-right: 6px;
            margin-left: 0px;
            font-size: 0.79rem;
        }

        .el-button:last-child {
            margin-right: 0px;
        }
    }
}

::v-deep .el-tree-node {
    margin: 6px auto;
}

::v-deep .dialogTitle {
    color: var(--el-color-primary);
}
</style>


