
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
        meta: {
            hidden: true
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
                    affix: true   //开启粘滞tab切片
                }
            }
        ]
    },

    {
        path: '/screen',
        component: () => import('@/page/screen/index.vue'),
        meta: {
            title: '数据大屏',
            icon: 'DataAnalysis',
        }
    },


    //系统管理
    {
        path: '/authority',
        component: Layout,
        meta: {
            title: '权限管理',
            icon: 'Setting'
        },
        children: [
            {
                path: 'menu',
                component: () => import('@/page/authority/menu/index.vue'),
                meta: {
                    title: '菜单权限',
                    icon: 'Grid'
                },
            }, 
        
            {
                path: 'user',
                component: () => import('@/page/authority/user/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'UserFilled'
                },
            },
            {
                path: 'department',
                component: () => import('@/page/authority/department/index.vue'),
                meta: {
                    title: '部门管理',
                    icon: 'Refrigerator'
                },
            },
            {
                path: 'role',
                component: () => import('@/page/authority/role/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'Stamp'
                },
            }
        ]
    },

    {
        path:'/goods',
        component:Layout,
        meta:{
            title:'物资管理',
            icon:'Collection'
        },
        children:[
            {
                path:'info',
                component:()=>import('@/page/goods/info/index.vue'),
                meta:{
                    title:'物资资料',
                    icon:'CreditCard'
                }
            },
            {
                path:'source',
                component:()=>import('@/page/goods/source/index.vue'),
                meta:{
                    title:'物资来源',
                    icon:'Box'
                }
            },
            {
                path:'destination',
                component:()=>import('@/page/goods/destination/index.vue'),
                meta:{
                    title:'物资去处',
                    icon:'Money'
                }
            },
            {
                path:'category',
                component:()=>import('@/page/goods/category/index.vue'),
                meta:{
                    title:'物资类别',
                    icon:'Refrigerator'
                }
            },
            {
                path: 'test',
                component: () => import('@/page/test/index.vue'),
                meta: {
                    title: '测试页面',
                    icon: 'Refrigerator'
                },
            }
        ]
    }

    
    
    


]


export const asnycRoute = [

]

