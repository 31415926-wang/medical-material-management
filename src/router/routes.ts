
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/page/login/index.vue'),
        
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/home',
                component: () => import('@/page/home/index.vue'),
              
            }
        ]

    },
    {
        path: '/404',
        component: () => import('@/page/404/index.vue'),
    }


]


export const asnycRoute = [

]

