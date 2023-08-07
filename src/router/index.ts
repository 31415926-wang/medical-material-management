import { createRouter,createWebHashHistory } from 'vue-router'
import {constantRoute} from './routes' 

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute,
    //滚动行为：路由切换时滚动条置顶，水平东西到最左
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    },
})

export default router;