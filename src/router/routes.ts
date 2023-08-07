// import Login from '@/pa'

export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/page/login/index.vue'),
        meta: {
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        meta: {
        },
        children: [
            {
                path: '/home',
                component: () => import('@/page/home'),
                meta: {
                }
            }
        ]

    },
    {
        path: '/404',
        component: () => import('@/page/404'),
        meta: {
        }
    }


]


export const asnycRoute = [

]

