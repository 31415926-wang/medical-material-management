<template>
    <!-- 查询
    需要参数：查询字段，查询的标签、输入框类型
    -->
    <div class="searchSection" v-show="(Object.keys(hookCrudObject.searchParam.value).length > 0) && searchStatus">
        <Search :hookCrudObjectParam="hookCrudObject">
            <template #default="{ scope }">
                <slot name="search-custom" :scope="scope"></slot>
            </template>
        </Search>
    </div>

    <!-- 批量、导出、新增 -->
    <div class="toolSection">
        <div>
            <el-button type="primary" icon="Plus" @click="handleAdd">新增</el-button>
            <!-- 自定义添加批量操作的功能 -->
            <slot name="batchSlot">
            </slot>
            <el-button type="danger" icon="Delete" v-show="needBatch"
                :disabled="hookCrudObject.crudInfo.option.selectedItems?.length == 0"
                @click="hookCrudObject.deleteRow(0, true)">删除</el-button>
            <el-button type="success" icon="Download" @click="hookCrudObject.handleExportTable">导出</el-button>
        </div>

        <div class="middleBox"></div>

        <!-- 小工具 -->
        <div class="toolBox">
            <ToolGroup ref="ToolGroupSection" v-model:searchStatus="searchStatus" :hookCrudObjectParam="hookCrudObject">
            </ToolGroup>
        </div>
    </div>

    <!-- 表格体 -->
    <el-table class="tableSection" :data="hookCrudObject.tableData.value" border style="width: 100%;" :size="size"
        :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center', 'color': '#000' }"
        :highlight-current-row="isHighlightRow" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55" v-if="needBatch" />
        <el-table-column type="index" label="序号" width="55" />

        <template v-for="(item, index) in hookCrudObject.tableCols.value" :key="index">
            <el-table-column :label="item.label" :prop="item.prop" :min-width="item.width ? item.width : 0"
                :sortable="item.sortable" v-if="item.show">
                <!-- 在需要自定义列内容时，传入插槽即可；对应字段需设置rebuild -->
                <template #default="scope" v-if="item.rebuild">
                    <slot :name="item.prop + 'Col'" :scope="scope"></slot>
                </template>

            </el-table-column>
        </template>

        <el-table-column v-if="needOperate" fixed="right" label="操作" :width="operateWidth">
            <template #default="scope">
                <div style="padding: 10px 0;">
                    <!-- 嵌入其它操作按钮 -->
                    <slot name="operateExpand" :rowInfo="scope.row"></slot>

                    <!-- 是否使用传统的按钮样式及功能 -->
                    <span v-show="">
                    <!-- 图标操作按钮、还是文字操作按钮 -->
                        <span v-if="operateButtonType == 'iconType'">
                            <el-button v-if="!closeViewDetail" type="info" class="mini" icon="View"
                                @click="handleViewDetail(scope.row)"></el-button>

                            <el-button type="warning" class="mini" icon="EditPen"
                                @click="handleEditor(scope.row)"></el-button>

                            <Popover type="danger" class="mini" icon="Delete" title="删除"
                                @handle="hookCrudObject.deleteRow(scope.row.id)">
                            </Popover>
                        </span>

                        <span v-else-if="operateButtonType == 'textType'">
                            <el-button v-if="!closeViewDetail" text type='primary' class="mini" icon="View"
                                @click="handleViewDetail(scope.row)">详细</el-button>

                            <el-button text type='primary' class="mini" icon="EditPen"
                                @click="handleEditor(scope.row)">编辑</el-button>

                            <Popover type='primary' text icon="Delete" class="mini" title="删除" operate="删除"
                                @handle="hookCrudObject.deleteRow(scope.row.id)">
                            </Popover>
                        </span>
                    </span>

                </div>
            </template>
        </el-table-column>


    </el-table>

    <!-- 对应官网，如果传入page-size、total，要有对应的处理回调，尤其是page-size，且布局有sizes -->
    <Pagination background class="pageSection" :layout="pageLayout" :current-page="hookCrudObject.page.value"
        :page-size="hookCrudObject.size.value" :total="hookCrudObject.total.value" :page-sizes="[10, 20, 30, 40, 50, 100]"
        :hookCrudObjectParam="hookCrudObject"></Pagination>



    <!-- 弹出框 -->
    <!-- 详细:默认有，自定义写插槽即可 -->
    <Dialog ref="detailForm" :width="dialogWidths.detail" :title="hookCrudObject.title.value + '详细'" v-if="!closeViewDetail"
        :rowInfo="rowInfo" :tableCols="hookCrudObject.tableCols">
        <slot name="detailForm" :rowInfo="rowInfo">
        </slot>
    </Dialog>

    <!-- 新增：直接写表单项，但是处理回调需在总组件传 -->
    <Dialog ref="addForm" :width="dialogWidths.add" :title="hookCrudObject.title.value + '新增'" :needSubmit="true"
        @submitFn="handleSubmit" @handleCloseBefore="closeBeforeFn" @handleOpenBefore="$emit('openBefore')">
        <slot name="addForm" :formInfo="formInfo"></slot>
    </Dialog>

    <!-- 编辑：直接写表单项，但是处理回调需在总组件传 -->
    <Dialog ref="editorForm" :width="dialogWidths.editor" :title="hookCrudObject.title.value + '编辑'" :needSubmit="true"
        @submitFn="handleSubmit" @handleCloseBefore="closeBeforeFn" @handleOpenBefore="$emit('openBefore')">
        <slot name="editorForm" :formInfo="formInfo"></slot>
    </Dialog>
</template>


 
<script setup lang='ts'>
import hookCrud from '@/hook/crud/index'
import { ref } from 'vue';
import Popover from './Popover.vue'
import Pagination from './Pagination.vue'
import ToolGroup from './ToolGroup.vue'
import Search from './Search.vue'
import Dialog from './Dialog.vue'


let $prop = defineProps({
    size: {
        type: String,
        default: 'default'
    },
    isHighlightRow: {
        type: Boolean,
        default: false
    },
    'pageLayout': {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    },
    needBatch: {
        type: Boolean,
        default: false
    },
    needOperate: {
        type: Boolean,
        default: false
    },
    closeViewDetail: {
        type: Boolean,
        default: false
    },
    //弹出框的大小，默认新增、修改适配一列表单项的，而详细框两列
    dialogWidths: {
        type: Object,
        default: {
            add: '20%',
            editor: '20%',
            detail: '34%'
        }
    },
    operateWidth: {
        type: Number,
        default: 220
    },
    operateButtonType: { //操作图标的表现形式
        type: String,
        default: 'iconType'
    },
    addCheckForm: {
        type: Object,
        default: {}
    },
    editorCheckForm: {
        type: Object,
        default: {}
    }

})


let $emit = defineEmits(['openBefore']);


let hookCrudObject = hookCrud();


//查询的开关
let searchStatus = ref(true)

let rowInfo = ref({});//点击单行的信息存储
let formInfo = ref({} as any);//弹框填写表单

//ref获取实例
let detailForm = ref();
let addForm = ref();
let editorForm = ref();


//可能出现弹出框表单校验
let nowFormType = ref(''); //表示当前是弹出框的类型，新增还是编辑框。
// let addCheckForm = ref();
// let editorCheckForm = ref();

//行的多选处理
const handleSelectionChange = (val: any) => {
    hookCrudObject.crudInfo.option.selectedItems = val
}

//点击详细按钮
const handleViewDetail = ((row: any) => {
    rowInfo.value = { ...row };
    detailForm.value.dialogVisible = true;
})

//点击新增
const handleAdd = () => {
    addForm.value.dialogVisible = true;
    formInfo.value = {};
    nowFormType.value = 'add';
}

//点击编辑
const handleEditor = (row: any) => {
    editorForm.value.dialogVisible = true;
    formInfo.value = { ...row };
    nowFormType.value = 'editor';
}


const beforeSubmit = () => {

    let type = nowFormType.value;
    let refGoal: string = type == 'add' ? 'addCheckForm' : 'editorCheckForm';

    //判断是否有弹出框校验表单
    if ((type == 'add' && $prop.addCheckForm) || (type == 'editor' && $prop.editorCheckForm)) {
        // console.log("有校验");
        // @ts-ignore
        return $prop[refGoal].validate((valid: any) => {
            // console.log("校验结果", valid);
            if (!valid) {
                throw 'error'
            }
        })

    } else {
        // console.log("无校验");
        return Promise.resolve("Success")
    }

}

const handleSubmit = (callback: any) => {

    //校验表单
    beforeSubmit().then(async () => {
        // console.log("beforeSubmit通过 / 没有校验");
        //调接口
        try {
            let resultMsg = await hookCrudObject.addOrUpdate((formInfo.value.id ? 1 : 0), formInfo.value);
            callback(true)
        } catch (error) {
            callback(false)
        }
    }).catch(() => {
        // console.log("beforeSubmit不通过");
        callback(false)
    })

}

const closeBeforeFn = () => {
    let type = nowFormType.value;
    let refGoal: string = type == 'add' ? 'addCheckForm' : 'editorCheckForm';
    //判断是否有弹出框校验表单
    if ((type == 'add' && $prop.addCheckForm) || (type == 'editor' && $prop.editorCheckForm)) {
        // @ts-ignore
        $prop[refGoal].resetFields()
    }
}


defineExpose({
    hookCrudObject,
    nowFormType
})



</script>


<style scoped lang='scss'>
div[class$="Section"],
.tableSection {
    margin-bottom: 23px;
}

.searchSection {
    margin-bottom: 6px !important;
}

.toolSection {
    display: flex;

    .middleBox {
        flex-grow: 1;
    }
}

.checkboxGroup {
    display: flex;
    flex-direction: column;
}
</style>
