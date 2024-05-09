import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/  
export default defineConfig({
  plugins: [
    vue(),
    qiankun('son-app',{
      useDevMode:true  //因为开发环境作为子应用时与热更新插件（可能与其他修改html的插件也会存在冲突）有冲突，所以需要额外的调试配置.
      // useDevMode = true 则不使用热更新插件，useDevMode = false 则能使用热更新，但无法作为子应用加载。
    })
  ],
  // server: {
  //   // 微前端vite插件,防止开发阶段的assets 静态资源加载问题
  //   origin: '//localhost:5173'
  // },
  
  // 微前端vite插件，生产环境需要指定运行域名作为base
  // base: import.meta.env.VITE_SON_WEB_BASE_API,
  
  resolve:{
    alias:{
      "@":path.resolve('./src')
    }
  }
})