import { registerMicroApps, start, addErrorHandler, addGlobalUncaughtErrorHandler } from 'qiankun'

console.log("微前端调试1");

// registerMicroApps([ //注册子应用
//     {
//         name: 'son-app',
//         entry: import.meta.env.VITE_SON_WEB_BASE_API,
//         container: '#microAppsContainer',
//         activeRule: '#/screen',  //路由使用哈希模式需要添加#
//     }
// ])
registerMicroApps([
    {
        name: 'son-app',
        entry: import.meta.env.VITE_SON_WEB_BASE_API,
        container: '#microAppsContainer',
        activeRule: '#/screen',  //路由使用哈希模式需要添加#
    }
],
    {
        afterMount: (app) => {
            console.log(`子应用 "${app.name}" 加载完毕!`);
            return Promise.resolve();
        },
        beforeMount: (app) => {
            console.log(`子应用 "${app.name}" 即将挂载...`);
            return Promise.resolve();
        },
        afterUnmount: (app) => {
            console.log(`子应用 "${app.name}" 卸载完毕!`);
            return Promise.resolve();
        }
    }
)



addErrorHandler((err) => {
    console.log("检测到错误", err);
})
addGlobalUncaughtErrorHandler((err) => {
    console.log("检测到错误", err);
})

console.log("微前端调试2");


start();


