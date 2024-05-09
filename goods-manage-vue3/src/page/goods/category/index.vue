<template>
  <CrudTable ref="CrudTableRef" 
  :treeProps="{ children: 'children' }" 
  :needIndex="false" 
  :hiddenToolSection="true"
  :defaultToolBtList="[]"
  :needOperate="true"
  :closeViewDetail="true"
  :operateColWidth="170"
  :editorCheckForm="editorCheckForm"
  > 
    <!--自定义列-->
    <template v-slot:levCol="{ scope }">
      <el-tag :type="statusHanlde(scope.row?.lev)">{{ switchText(scope.row?.lev) }}</el-tag>
    </template>
    <template v-slot:nameCol="{ scope }">
      <el-icon style="margin-right: 5px;">
        <component :is="scope.row.children ?'DocumentAdd' :'Tickets'" />
      </el-icon>
      <span>{{ scope.row?.name }}</span>
    </template>

    
     <!--编辑框-->
     <template v-slot:editorForm="{ formInfo }">
            <el-form ref="editorCheckForm" :model="formInfo" label-width="80px" :rules="rules">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="formInfo.name" placeholder="请填写分类名称" />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="formInfo.remark" placeholder="请填写备注" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="formInfo.sort" :min="1" />
                </el-form-item>
            </el-form>
        </template>

      
  </CrudTable>
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
import apiMethod from '@/api/goods/category'
import { tableCol } from "@/types/common/Crud";
import initCrud from "@/hook/crud/initCrud";


//@ts-ignore
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请填写分类名称', trigger: 'blur' },
    ],
    remark: [
        { required: true, message: '请填写备注', trigger: 'blur' },
    ],
    sort: [
        { required: true, message: '请填写序号', trigger: 'blur' },
    ]
   
})

let editorCheckForm = ref();

let CrudTableRef = ref();
let tableCols = reactive([

  {
    prop: 'name',
    label: '分类名称',
    rebuild: true
  },
  {
    prop: 'sort',
    label: '排序',
    sortable: true,
    width:150
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
  {
    prop: 'modifiedTime',
    label: '修改时间',
  },
  {
    prop: 'remark',
    label: '备注',
  },
  {
    prop: 'lev',
    label: '层级',
    rebuild: true
  },
] as tableCol[]);

initCrud(CrudTableRef, {
  title: '物资类别',
  apiMethod: apiMethod
},
  tableCols
);

const switchText = (n: number) => {
  let str = ''
  switch (n) {
    case 1:
      str = '一'
      break;
    case 2:
      str = '二'
      break;
    case 3:
      str = '三'
      break;
  }
  return str + '级分类'
}
const statusHanlde = (status: any) => {
  let result = 'primary'
  switch (status) {
    case 1:
      result = 'primary';
      break;
    case 2:
      result = 'success';
      break;
    case 3:
      result = 'danger';
      break;
  }
  return result;
}

</script>

<style scoped lang='scss'>

</style>










