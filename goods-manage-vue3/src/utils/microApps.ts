import {registerMicroApps,start} from 'qiankun'


registerMicroApps([ //注册子应用
    {
        name:'son-app',
        entry: import.meta.env.VITE_SON_WEB_BASE_API,
        container:'#microAppsContainer',
        activeRule: '#/screen'  //路由使用哈希模式需要添加#
    }
])

start();

