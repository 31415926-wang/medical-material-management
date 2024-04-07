
//改变窗口尺寸监听，addEventListener可以添加多个事件
import { throttle } from "lodash";
import { onBeforeUnmount, onMounted, ref } from "vue";

export default function windowSizeChange(callback: any,) { 

    //在初始化时也执行一次
    onMounted(() => {
        Fn();
    })

    const Fn = throttle(() => {
        // console.log("全局尺寸变化");
        callback();
    }, 500)
    // 监听窗口大小变化，折叠侧边栏
    window.addEventListener('resize', Fn)

    //销毁组件时将监听销毁
    onBeforeUnmount(() => {
        window.removeEventListener('resize', Fn);
    })

    return {  //有意返回一个对象，好让页面可以判断是否执行了hook函数
        Fn
    }
}