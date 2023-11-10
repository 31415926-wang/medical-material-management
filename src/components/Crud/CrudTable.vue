<template>
    <!-- 查询
    需要参数：查询字段，查询的标签、输入框类型
    -->
    <div class="searchSection" v-show="Object.keys(hookCrudObject.searchParam).length > 0 && searchStatus">
        <Search :hookCrudObjectParam="hookCrudObject"></Search>
    </div>

    <!-- 批量、导出、新增 -->
    <div class="toolSection">
        <div class="batchBox">
            <el-button type="primary" icon="Plus" @click="handleAdd">新增</el-button>
            <!-- 自定义添加批量操作的功能 -->
            <slot name="batchSlot">
            </slot>
            <el-button type="danger" icon="Delete" v-show="needBatch"
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
        <el-table-column type="index" label="序号" />

        <template v-for="(item, index) in hookCrudObject.tableCols.value" :key="index">
            <el-table-column :label="item.label" :prop="item.prop" :min-width="item.width ? item.width : 0"
                :sortable="item.sortable" v-if="item.show">
                <!-- 在需要自定义列内容时，传入插槽即可；对应字段需设置rebuild -->
                <template #default="scope" v-if="item.rebuild">
                    <slot :name="item.prop + 'Col'" :scope="scope"></slot>
                </template>

            </el-table-column>
        </template>

        <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
                <div style="padding: 10px 0;">
                    <el-button v-if="!closeViewDetail" type="info" class="mini" icon="View"
                        @click="handleViewDetail(scope.row)"></el-button>
                    <el-button type="warning" class="mini" icon="EditPen" @click="handleEditor(scope.row)"></el-button>

                    <Popover type="danger" class="mini" icon="Delete" title="删除"
                        @handle="hookCrudObject.deleteRow(scope.row.id)">
                    </Popover>
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
    <Dialog  ref="detailForm" title="详细" v-if="!closeViewDetail" :rowInfo="rowInfo" :tableCols="hookCrudObject.tableCols">
        <slot name="detailForm" :rowInfo="rowInfo">
        </slot>
    </Dialog>

    <!-- 新增：直接写表单项，但是处理回调需在总组件传 -->
    <Dialog ref="addForm" title="新增" :needSubmit="true" >
        <slot name="addForm" :formInfo="formInfo"></slot>
    </Dialog>

    <!-- 编辑：直接写表单项，但是处理回调需在总组件传 -->
    <Dialog ref="editorForm" title="编辑" :needSubmit="true">
        <slot name="editorForm" :formInfo="formInfo"></slot>
    </Dialog>

</template>


 
<script setup lang='ts'>
import hookCrud from '@/hook/crud/index'
import { ref, onMounted, nextTick } from 'vue';
import Popover from './Popover.vue'
import Pagination from './Pagination.vue'
import ToolGroup from './ToolGroup.vue'
import Search from './Search.vue'
import Dialog from './Dialog.vue'


defineProps({
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
    closeViewDetail: {
        type: Boolean,
        default: false
    },

})


let hookCrudObject = hookCrud();


//查询的开关
let searchStatus = ref(true)

let rowInfo = ref({});//点击单行的信息存储
let formInfo = ref({});//弹框填写表单

//ref获取实例
let detailForm = ref();
let addForm = ref();
let editorForm = ref();

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
    
}

//点击编辑
const handleEditor = (row: any) => {
    editorForm.value.dialogVisible = true;
    formInfo.value= { ...row }
}



defineExpose({
    hookCrudObject
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
