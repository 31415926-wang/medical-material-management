import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//引入vite的mock工具提供的方法
import { viteMockServe } from 'vite-plugin-mock'

//原自动生成的
// export default defineConfig({
//   plugins: [vue()],
// })


//defineConfig接收一个对象
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());  //加载环境变量，在配置文件不能使用import.meta.env.xx

  return {
    base: mode === 'production' ? env.VITE_APP_PUBLIC : '',
    build: {
      outDir: '../docs/goods-manage-vue3' // 生产构建的输出目录
    },
    server: {
      port: 5173,
    },
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve'
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: { //使调用全局变量时，能找到该变量。（因为单个文件内是没问题的）
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "@/style/globalVariable.scss";',  //后面的;不要忘记，不然会报错
        },
      },
    },
    // server:{  
    //   proxy:{
    //     [env.VITE_APP_BASE_API]:{
    //       target:env.VITE_SERVE,
    //       //需要代理跨域
    //       changeOrigin:true,
    //       rewrite:(path)=> path.replace(env.VITE_APP_BASE_API,''),
    //     }
    //   }
    // }
  }
})