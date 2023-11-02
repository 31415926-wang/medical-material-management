<template>
    <!-- 查询
    需要参数：查询字段，查询的标签、输入框类型
    -->
    <div class="searchSection" v-show="arrSearch.length > 0 && searchStatus">
        <el-form :inline="true" :model="hookCrudObject.searchParam" class="demo-form-inline">
            <el-form-item v-for="(item, index) in arrSearch" :key="index" :label="item.formLabel">
                <el-input v-model="hookCrudObject.searchParam.value[item.formProp]" :placeholder="'请输入' + item.formLabel"
                    :type="item.inputType" @keyup.enter.native="hookCrudObject.getData" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="hookCrudObject.getData">查询</el-button>
                <el-button icon="CircleClose" @click="resetObj(hookCrudObject.searchParam.value)">清空</el-button>
            </el-form-item>

        </el-form>


    </div>

    <!-- 批量、导出、新增 -->
    <div class="toolSection">
        <div class="batchBox">
            <el-button type="primary" icon="Plus">新增</el-button>
            <el-button type="success" icon="Download" @click="hookCrudObject.handleExportTable">导出</el-button>
        </div>

        <div class="middleBox"></div>

        <!-- 小工具 -->
        <div class="toolBox">
            <el-button-group>
                <el-button plain type="info" icon="Search" @click="searchStatus = !searchStatus" />
                <el-button plain icon="Refresh" @click="hookCrudObject.getData" />

                <el-popover placement="bottom" title="" :width="100" trigger="click">
                    <template #reference>
                        <el-button plain icon="Grid" />
                    </template>
                    <template #default>
                        <el-checkbox v-model="checkAllCol" :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group class="checkboxGroup" v-model="checkedCol"
                            @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in colList" :key="city" :label="city">{{
                                city
                            }}</el-checkbox>
                        </el-checkbox-group>
                    </template>

                </el-popover>

            </el-button-group>
        </div>
    </div>

    <el-table class="tableSection" :data="hookCrudObject.tableData.value" border style="width: 100%;" :size="size"
        :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center', 'color': '#000' }"
        :highlight-current-row="isHighlightRow">
        <slot>默认插槽，自定义插入的列</slot>
    </el-table>

    <!-- 对应官网，如果传入page-size、total，要有对应的处理回调，尤其是page-size，且布局有sizes -->
    <el-pagination background class="pageSection" :layout="pageLayout" :current-page="hookCrudObject.page.value"
        :page-size="hookCrudObject.size.value" :total="hookCrudObject.total.value" :page-sizes="[10, 20, 30, 40, 50, 100]"
        @size-change="(val: number) => hanleChange(val, 'size')"
        @current-change="(val: number) => hanleChange(val, 'current')" />
</template>


<script setup lang='ts'>
import hookCrud from '@/hook/crud/index'
import { reactive, nextTick, onMounted, ref, useSlots, useAttrs } from 'vue';
import { arrSearchBuilds } from '@/types/common/Crud/searchSection'
import { resetObj } from '@/utils'
let hookCrudObject = hookCrud();

//获取默认插槽
const slots: any = useSlots()
const defaultSlot = slots.default()

//自定义查询表单项的循环数组
let arrSearch = reactive([] as arrSearchBuilds[]);

//查询的开关
let searchStatus = ref(true)


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
    }

})

defineExpose({
    hookCrudObject
})



const hanleChange = (val: number, type: string) => {
    if (type == 'current') {
        hookCrudObject.page.value = val;
    } else {
        hookCrudObject.size.value = val;
        hookCrudObject.page.value = 1;

        hookCrudObject.searchParam.value.name = val;

    }
    //请求接口
    hookCrudObject.getData();
}

const getSearchItem = () => {
    defaultSlot.forEach((item: any, index: number) => {
        //默认插槽需要是表格列，且有开启查询
        if (item.type.name != 'ElTableColumn' || !item.props.hasSearch) {
            return
        }
        let { prop, label, searchType } = item.props
        let objItem: arrSearchBuilds = {
            formProp: prop,   //仅用于表示属性名
            formLabel: label,
            inputType: searchType || 'text'
        }
        //存一份给crudInfo的查询参数，默认值' 
        hookCrudObject.searchParam.value[prop] = '';
        arrSearch.push(objItem)
    });
}


//全选功能
const checkAllCol = ref(false)
const isIndeterminate = ref(true)
const checkedCol = ref([] as string[])
const colList = reactive([] as string[])
const handleCheckAllChange = (val: boolean) => {
    checkedCol.value = val ? colList : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAllCol.value = checkedCount === colList.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < colList.length
}

const initControlCol=()=>{
    defaultSlot.forEach((item: any, index: number) => {
        if (item.type.name != 'ElTableColumn' || !item.props.label) {
            return
        }
        checkedCol.value.push(item.props.label); //默认全选
        colList.push(item.props.label);
    });

}


nextTick(() => {
    console.log("1实验",slots);
    console.log("2实验",defaultSlot);
    console.log("3实验",document.querySelector('.tableSection'));
    
    
    getSearchItem();
    initControlCol();
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

.checkboxGroup{
    display: flex;
    flex-direction: column;
}
</style>
@/utils