
import Layout from '@/layout/index.vue'
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/page/login/index.vue'),
        meta: {
            title: '登录',
            hidden: true  //不是所有路由都需要渲染成菜单
        }
    },
    {
        path: '/404',
        component: () => import('@/page/404/index.vue'),
        meta: {
            title: '404',
            hidden: true  //不是所有路由都需要渲染成菜单
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',//当只访问一级路由时，默认选个二级路由
        meta: {
            title: 'Layout',
        },
        children: [
            {
                path: 'home',
                component: () => import('@/page/home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'HomeFilled'
                }
            }
        ]

    },



    // //测试菜单路由
    // //三级测试
    // {
    //     path: '/test3',
    //     component: () => import('@/page/404/index.vue'),
    //     meta: {
    //         title: 'test3',
    //     },
    //     children: [
    //         {
    //             path: 'test3-1',
    //             component: () => import('@/page/home/index.vue'),
    //             meta: {
    //                 title: 'test3-1',
    //             },
    //             children: [
    //                 {
    //                     path: 'test3-1-1',
    //                     component: () => import('@/page/home/index.vue'),
    //                     meta: {
    //                         title: 'test3-1-1',
    //                     }
    //                 },
    //                 {
    //                     path: 'test3-1-2',
    //                     component: () => import('@/page/home/index.vue'),
    //                     meta: {
    //                         title: 'test3-1-2',
    //                     }
    //                 },
    //             ]
    //         }
    //     ]
    // },



]


export const asnycRoute = [

]

