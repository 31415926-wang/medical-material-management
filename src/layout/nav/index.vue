<template>
  <div class="nav_box">


    <ul class="menuList" v-show="showContextmenu" @click.stop="hanleCloseMore($event)">
              <li :data-type="1">关闭左侧</li>
              <li :data-type="2">关闭右侧</li>
              <li :data-type="3">关闭其它</li>
            </ul> 

    <!-- 溢出处理：el-tabs自带，注意父级宽度100%是否有减去侧边栏 -->
    <el-tabs  v-model="activedTabsValue" type="card" @tab-remove="removeTab" @tab-change="changeTab">


      <!-- name属性是其选中的标识 -->
      <el-tab-pane  class="tab-pane" v-for="(item, index) in tabList" :key="item.path" :name="item.path"
        :closable="!item.meta.affix">
        <template #label>


          <!-- 嵌套一层下来列表 -->
          <span class="custom-tabs-label" @contextmenu.prevent="rightClick($event,index)">

            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span style="margin-left: 5px;">{{ item.meta.title }}</span>
          
          </span>


        </template>
        <!-- 切换的内容，不设置，点击切换路由跳转既是切换内容 -->
      </el-tab-pane>


    </el-tabs>

  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref, watch, computed, nextTick } from 'vue'
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import useTabNavStore from "@/store/modules/tabNav";
let tabNavStore = useTabNavStore();
let $route = useRoute();
let $router = useRouter();

const activedTabsValue = ref('');

let showContextmenu = ref(false);
let rightSelectIndex=ref<number>(0)

const rightClick = function (e: any,index:number) {

   //若是只有一个tab，便是home，禁止右键
   if (tabList.value.length == 1) {
    return;
  }
  //保存右键点击的索引
  rightSelectIndex.value=index;

  //观察层级，找出每一个tab的位置
  // console.log("实验1",e.currentTarget.offsetParent.offsetLeft);
  let distance=e.currentTarget.offsetParent.offsetLeft +(e.currentTarget.offsetParent.offsetWidth)/2
  document.querySelector('.menuList').style.left=distance+'px'
  showContextmenu.value = true;
}


const hanleCloseMore = (e: any) => {
  let type = e.target.getAttribute('data-type');
  tabNavStore.hanleCloseMore(type, rightSelectIndex.value, activedTabsValue.value);

}


let fn = () => {
  showContextmenu.value = false;
  console.log("点击任意位置关闭菜单");
}

watch(showContextmenu, (newValue) => { //直接拿到值，不需要再.value

  if (newValue) {//若弹出菜单，则页面父元素添加点击事件,点击关闭弹出的菜单（使用捕获阶段触发，父元素一定会触发事件）
    document.body.addEventListener('click', fn, true)
  } else {
    document.body.removeEventListener('click', fn, true)
  }

})


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
  border-top: 1px solid var(--custom-border-color);
  border-bottom: 2px solid  var(--custom-border-color);
  padding-top: 13px;
  position: relative;

  .menuList {
    position: absolute;
    // display: none;
    z-index: 100;
    top: 50%;

    background-color: bisque;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, .2);
    background-color: white;

    li {
      padding: 9px 13px;
      color: black;
      cursor: pointer;
      font-size: 0.8rem;
    }

    // &.active {
    //   display: block;
    // }
  }
}

.custom-tabs-label {
  display: flex;
  justify-content: center;
  align-items: center;


  // 解决下来菜单覆盖选中tab的字体颜色问题
  // .el-dropdown {
  //   color: inherit;
  // }

}


//去掉tab的线框
::v-deep .el-tabs--card>.el-tabs__header {
  border: none;

  .el-tabs__nav {
    border: none;
  }

  .el-tabs__item {
    border: none;
    margin-left:7px ;
    margin-right:7px ;
  }
}

 @mixin mask-img{
  -webkit-mask: url('@/assets/images/tabbar-bg.png');
  -webkit-mask-size: 100% 100%;
 }

::v-deep .el-tabs__item.is-active {
  background-color: #e8f4ff;
  @include mask-img
}

::v-deep .el-tabs__item:not(.is-active):hover{
  background-color: #f6f8f9;
  @include mask-img
}


//解决视口包含块被改变的问题
// ::v-deep .el-tabs__nav{
//   transform: none !important;
// }

</style>