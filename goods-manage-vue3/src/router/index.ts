import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { constantRoute, asnycRoute } from './routes'


// console.log("执行");  //意味着每次刷新都重置路由列表。所有每次F5都需重新添加权限路由。

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes: constantRoute.concat(asnycRoute),
    //滚动行为：路由切换时滚动条置顶，水平东西到最左
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    },
})

export default router;


