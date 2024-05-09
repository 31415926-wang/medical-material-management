
import { createRouter, createWebHashHistory,createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHashHistory(),
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


