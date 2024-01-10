<template>
  <CrudTable ref="CrudTableRef" :treeProps="{ children: 'children' }" :needIndex="false" :hiddenToolSection="true">
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

      
  </CrudTable>
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
import apiMethod from '@/api/goods/category'
import { tableCol } from "@/types/common/Crud";
import initCrud from "@/hook/crud/initCrud";


let CrudTableRef = ref();
let tableCols = reactive([

  {
    prop: 'name',
    label: '分类名称',
    width: 3,
    rebuild: true
  },
  {
    prop: 'sort',
    label: '排序',
    width: 1,
    sortable: true
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 3,
  },
  {
    prop: 'modifiedTime',
    label: '修改时间',
    width: 3,
  },
  {
    prop: 'remark',
    label: '备注',
    width: 3,
  },
  {
    prop: 'lev',
    label: '层级',
    width: 2,
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
  let result = ''
  switch (status) {
    case 1:
      result = '';
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










