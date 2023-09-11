
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
    //其它路径重定向到404
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
        meta:{
            hidden:true
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',//当只访问一级路由路径时，默认选个二级路由
        meta: {
            title: 'Layout',
        },
        children: [
            {
                path: 'home',
                component: () => import('@/page/home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'HomeFilled',
                    affix:true   //开启粘滞tab切片
                }
            }
        ]
    },

    {
        path:'/screen',
        component:()=> import('@/page/screen/index.vue'),
        meta: {
            title: '数据大屏',
            icon: 'DataAnalysis',
        }
    },  




    // //测试菜单路由
    // //三级测试
    // {
    //     path: '/test1',
    //     component: () => import('@/page/test/index.vue'),
    //     meta: {
    //         title: 'test1',
    //         icon: 'Connection'
    //     }
    // },
    {
        path: '/test2',
        component: Layout,
        redirect: '/test2/test22',
        meta: {
            title: 'test2',
            icon: 'Connection'
        },
        children: [{
            path: 'test22',
            component: () => import('@/page/test/index.vue'),
            meta: {
                title: 'test22',
                icon: 'Discount'
            }
        }]
    },
    // {
    //     path: '/test3',
    //     component: Layout,
    //     meta: {
    //         title: 'test3',
    //         icon: 'Setting'
    //     },
    //     redirect: '/test3/test3-1/test3-1-1',
    //     children: [
    //         {
    //             path: 'test3-1',
    //             component: () => import('@/page/home/index.vue'),
    //             meta: {
    //                 title: 'test3-1',
    //                 icon: 'ChatDotRound'
    //             },
    //             redirect: '/test3/test3-1/test3-1-1',
    //             children: [
    //                 {
    //                     path: 'test3-1-1',
    //                     component: () => import('@/page/test/index.vue'),
    //                     meta: {
    //                         title: 'test3-1-1',
    //                         icon: 'Position'
    //                     }
    //                 },
    //                 {
    //                     path: 'test3-1-2',
    //                     component: () => import('@/page/home/index.vue'),
    //                     meta: {
    //                         title: 'test3-1-2',
    //                         icon: 'Discount'
    //                     }
    //                 },
    //                 {
    //                     path: 'test3-1-3',
    //                     component: () => import('@/page/home/index.vue'),
    //                     meta: {
    //                         title: 'test3-1-3',
    //                         icon: 'Discount'
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // },



]


export const asnycRoute = [

]

