import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist';
//对外暴露：入口文件需要安装仓库
const pinia=createPinia();

//使用持久化插件
pinia.use(piniaPersist)
export default pinia;  