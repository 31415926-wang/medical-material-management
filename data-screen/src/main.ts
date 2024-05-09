import { createApp  } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import  "@/permission";
import '@/style/globalStyle.scss'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';


// const app=createApp(App);
// app.use(router);
// app.mount('#app');

var app :any;

// 使用乾坤渲染
renderWithQiankun({
    // 挂载时
    mount (props) {
      console.log('Qiankun-mount')
      render(props)
    },
    bootstrap () {
    //   console.log('bootstrap')
    },
    update () {
    //   console.log('update')
    },
    unmount (props) {
      console.log('Qiankun-unmount')
      app.unmount();
    },
  })
  
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({})
  }
  
  function render (props = {}) {
    // console.log("render调用")
    const { container } = props
    app = createApp(App)
    app.use(router)
    app.mount(container ? container.querySelector("#app") : "#app")
  }



  