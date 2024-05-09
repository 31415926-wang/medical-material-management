import 'vue-router';

declare module 'vue-router' {
    //拓展路由元信息
    interface RouteMeta{
        title?:string,
        icon?:string,
        hidden?:boolean
    } 
}