<template>
  <div class="nav_box">
    <!-- 溢出处理：el-tabs自带，注意父级宽度100%是否有减去侧边栏 -->
    <el-tabs v-model="activedTabsValue" type="card" @tab-remove="removeTab" @tab-change="changeTab">


      <!-- name属性是其选中的标识 -->
      <el-tab-pane v-for="item in tabList" :key="item.path" :name="item.path" :closable="!item.meta.affix">
        <template #label>


          <!-- 嵌套一层下来列表 -->
          <span class="custom-tabs-label">



            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>


            <el-dropdown trigger="contextmenu">
              <span class="el-dropdown-link1">


                <span style="margin-left: 5px;">{{ item.meta.title }}</span>


              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item icon="Plus">Action 1</el-dropdown-item>
                  <el-dropdown-item icon="CirclePlusFilled">Action 2</el-dropdown-item>
                  <el-dropdown-item icon="CirclePlus">Action 3</el-dropdown-item>
                  <el-dropdown-item icon="Check">Action 4</el-dropdown-item>
                  <el-dropdown-item icon="CircleCheck">Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </span>


        </template>
        <!-- 切换的内容，不设置，点击切换路由跳转既是切换内容 -->
      </el-tab-pane>


    </el-tabs>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import useTabNavStore from "@/store/modules/tabNav";
let tabNavStore = useTabNavStore();
let $route = useRoute();
let $router = useRouter();

const activedTabsValue = ref('');


//因为点击其它页面时组件会销毁，不会执行监测；如果没有销毁，则是在菜单路由里跳转。写在这里比菜单事件去过滤路由方便，$route.matched会提供。
watch($route, () => {  //监测proxy对象，默认深度检测
  //@ts-ignore
  tabNavStore.addClickedRoute($route.matched[$route.matched.length - 1])
  activedTabsValue.value = $route.fullPath;  //选中项  
}, {
  immediate: true
})

let tabList = computed(() => {
  return tabNavStore.clickedRoute;
})


//移除tab
const removeTab = (targetName: string) => {

  //移除该项
  let deIndex = Number(tabNavStore.removeClickedRoute(targetName))

  //若删除的项不是当前选中的，无需重新选中
  if (targetName == activedTabsValue.value) {
    let list = tabList.value;
    activedTabsValue.value = list[deIndex]?.path || list[deIndex - 1].path;
  }

}

//点击跳转tab
const changeTab = (name: any) => {
  // console.log("点击tab",name);
  $router.push(name);
}


</script>

<style scoped lang='scss'>
.nav_box {
  height: $base_nav_height;
  // border: 1px solid red;
  border-top: 1px solid #f6f6f6;
  // border-bottom: 1px solid #f6f6f6;
  padding: 10px;
}

.custom-tabs-label {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 解决下来菜单覆盖选中tab的字体颜色问题
.el-dropdown{
  color: inherit;
}
</style>