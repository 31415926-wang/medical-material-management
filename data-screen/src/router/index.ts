
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHashHistory(),
    // 临时
    // history: createWebHistory(), 
    routes: [
        {
            path: '/screen',
            component: () => import('@/pages/screen/index.vue'),
            meta: {
                title: '数据大屏',
            }
        },
    ],
})


export default router;


